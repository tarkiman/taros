// Vanilla JS, same reasoning as dashboard.js — see docs/03-tech-stack.md
// "Kenapa htmx + Alpine, bukan SPA".
(function () {
  "use strict";

  function csrfToken() {
    try {
      var headers = JSON.parse(document.body.getAttribute("hx-headers") || "{}");
      return headers["X-CSRF-Token"] || "";
    } catch (e) {
      return "";
    }
  }

  // Read from the URL query string (kept in sync by hx-push-url on every
  // navigation, see files_list.html) rather than a data-* attribute on
  // #files-panel — that attribute is only set once at initial page load
  // and an hx-swap="innerHTML" never touches the panel's own attributes,
  // so it would silently go stale the moment the user navigates.
  function currentPath() {
    return new URLSearchParams(window.location.search).get("path") || "/";
  }

  function joinPath(dir, name) {
    return (dir === "/" ? "" : dir) + "/" + name;
  }

  function refreshList(query) {
    var q = query !== undefined ? query : (new URLSearchParams(window.location.search).get("q") || "");
    var url = "/fragments/files/list?path=" + encodeURIComponent(currentPath());
    if (q) url += "&q=" + encodeURIComponent(q);
    if (window.htmx) {
      htmx.ajax("GET", url, { target: "#files-panel", swap: "innerHTML" });
    } else {
      window.location.reload();
    }
  }

  function doOp(body) {
    return fetch("/api/files/op", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken() },
      body: JSON.stringify(body),
    }).then(function (r) {
      return r.json().then(function (data) {
        if (!r.ok) throw new Error(data.error || "gagal");
        return data;
      });
    });
  }

  window.tkFileSearch = function (ev) {
    ev.preventDefault();
    var q = ev.target.querySelector('input[name="q"]').value;
    refreshList(q);
    return false;
  };

  window.tkFileRename = function (path) {
    var name = path.split("/").pop();
    var newName = window.prompt("Nama baru untuk \"" + name + "\":", name);
    if (!newName || newName === name) return;
    var newPath = path.slice(0, path.length - name.length) + newName;
    doOp({ action: "rename", path: path, newPath: newPath })
      .then(function () { refreshList(); })
      .catch(function (e) { alert("Rename gagal: " + e.message); });
  };

  window.tkFileDelete = function (path, name) {
    if (!window.confirm("Hapus \"" + name + "\"? Tindakan ini tidak bisa dibatalkan.")) return;
    doOp({ action: "delete", path: path })
      .then(function () { refreshList(); })
      .catch(function (e) { alert("Hapus gagal: " + e.message); });
  };

  // --- Multi-select: copy / cut / paste / bulk delete ---

  function selectedPaths() {
    var boxes = document.querySelectorAll(".tk-select:checked");
    return Array.prototype.map.call(boxes, function (b) { return b.value; });
  }

  window.tkSelectionChanged = function () {
    var n = selectedPaths().length;
    var bar = document.getElementById("selection-bar");
    if (!bar) return;
    bar.style.display = n > 0 ? "flex" : "none";
    var countEl = document.getElementById("selection-count");
    if (countEl) countEl.textContent = n + " dipilih";
  };

  window.tkSelectionCopy = function () {
    doOp({ action: "copy", paths: selectedPaths() })
      .then(function () { refreshList(); })
      .catch(function (e) { alert("Salin gagal: " + e.message); });
  };

  window.tkSelectionCut = function () {
    doOp({ action: "cut", paths: selectedPaths() })
      .then(function () { refreshList(); })
      .catch(function (e) { alert("Potong gagal: " + e.message); });
  };

  window.tkSelectionDelete = function () {
    var paths = selectedPaths();
    if (paths.length === 0) return;
    if (!window.confirm("Hapus " + paths.length + " item? Tindakan ini tidak bisa dibatalkan.")) return;
    // Sequential, not Promise.all — keeps this consistent with the
    // documented "operasi diantrekan, bukan ditembak bersamaan" principle
    // (docs/04-features.md §4.4) even though individual deletes are cheap.
    var next = function (i) {
      if (i >= paths.length) { refreshList(); return; }
      doOp({ action: "delete", path: paths[i] })
        .then(function () { next(i + 1); })
        .catch(function (e) { alert("Hapus gagal untuk " + paths[i] + ": " + e.message); next(i + 1); });
    };
    next(0);
  };

  window.tkFilePaste = function (destPath) {
    doOp({ action: "paste", path: destPath })
      .then(function (data) { watchJob(data.jobId, "Menempel file…"); })
      .catch(function (e) { alert("Tempel gagal: " + e.message); });
  };

  // --- Job progress panel (paste) ---

  function formatBytes(n) {
    if (n < 1024) return n + " B";
    var units = ["KB", "MB", "GB", "TB"];
    var v = n;
    for (var i = 0; i < units.length; i++) {
      v /= 1024;
      if (v < 1024) return v.toFixed(1) + " " + units[i];
    }
    return v.toFixed(1) + " PB";
  }

  function watchJob(jobId, title) {
    var panel = document.getElementById("progress-panel");
    var fill = document.getElementById("progress-fill");
    var detail = document.getElementById("progress-detail");
    var titleEl = document.getElementById("progress-title");
    var cancelBtn = document.getElementById("btn-progress-cancel");
    if (!panel) return;

    panel.style.display = "block";
    titleEl.textContent = title;
    cancelBtn.onclick = function () {
      fetch("/api/files/op/" + jobId + "/cancel", {
        method: "POST",
        headers: { "X-CSRF-Token": csrfToken() },
      });
    };

    var es = new EventSource("/api/files/op/" + jobId + "/stream");
    es.onmessage = function (ev) {
      var s = JSON.parse(ev.data);
      fill.style.width = s.percentDone.toFixed(1) + "%";
      detail.textContent =
        formatBytes(s.copiedBytes) + " / " + formatBytes(s.totalBytes) +
        " — " + formatBytes(s.bytesPerSec) + "/s" +
        (s.currentFile ? " — " + s.currentFile : "");

      if (s.status !== "running") {
        es.close();
        if (s.status === "failed") {
          detail.textContent = "Gagal: " + s.error;
        } else if (s.status === "cancelled") {
          detail.textContent = "Dibatalkan.";
        }
        setTimeout(function () {
          panel.style.display = "none";
          refreshList();
        }, s.status === "done" ? 800 : 2500);
      }
    };
    es.onerror = function () { es.close(); };
  }

  // --- Upload ---

  function uploadFiles(fileList) {
    if (!fileList || fileList.length === 0) return;
    var form = new FormData();
    for (var i = 0; i < fileList.length; i++) form.append("file", fileList[i]);

    var panel = document.getElementById("progress-panel");
    var fill = document.getElementById("progress-fill");
    var detail = document.getElementById("progress-detail");
    var titleEl = document.getElementById("progress-title");
    var cancelBtn = document.getElementById("btn-progress-cancel");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/files/upload?path=" + encodeURIComponent(currentPath()));
    xhr.setRequestHeader("X-CSRF-Token", csrfToken());
    if (panel) {
      panel.style.display = "block";
      titleEl.textContent = "Mengupload " + fileList.length + " file…";
      cancelBtn.onclick = function () { xhr.abort(); };
      xhr.upload.onprogress = function (ev) {
        if (!ev.lengthComputable) return;
        var pct = (ev.loaded / ev.total) * 100;
        fill.style.width = pct.toFixed(1) + "%";
        detail.textContent = formatBytes(ev.loaded) + " / " + formatBytes(ev.total);
      };
    }
    xhr.onload = function () {
      if (panel) panel.style.display = "none";
      if (xhr.status >= 200 && xhr.status < 300) {
        refreshList();
      } else {
        var msg = "Upload gagal";
        try { msg = JSON.parse(xhr.responseText).error || msg; } catch (e) {}
        alert(msg);
      }
    };
    xhr.onerror = function () {
      if (panel) panel.style.display = "none";
      alert("Upload gagal (koneksi terputus).");
    };
    xhr.send(form);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var newFolderBtn = document.getElementById("btn-new-folder");
    var newFileBtn = document.getElementById("btn-new-file");
    var uploadBtn = document.getElementById("btn-upload");
    var uploadInput = document.getElementById("upload-input");

    if (newFolderBtn) {
      newFolderBtn.addEventListener("click", function () {
        var name = window.prompt("Nama folder baru:");
        if (!name) return;
        doOp({ action: "mkdir", path: joinPath(currentPath(), name) })
          .then(function () { refreshList(); })
          .catch(function (e) { alert("Gagal membuat folder: " + e.message); });
      });
    }

    if (newFileBtn) {
      newFileBtn.addEventListener("click", function () {
        var name = window.prompt("Nama file baru:");
        if (!name) return;
        doOp({ action: "create", path: joinPath(currentPath(), name) })
          .then(function () { refreshList(); })
          .catch(function (e) { alert("Gagal membuat file: " + e.message); });
      });
    }

    if (uploadBtn && uploadInput) {
      uploadBtn.addEventListener("click", function () { uploadInput.click(); });
      uploadInput.addEventListener("change", function () {
        uploadFiles(uploadInput.files);
        uploadInput.value = "";
      });
    }
  });
})();
