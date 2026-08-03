// Vanilla JS, same reasoning as dashboard.js — see docs/03-tech-stack.md
// "Kenapa htmx + Alpine, bukan SPA". Copy/cut/paste and upload/download-as-zip
// are Fase 3b (streaming job queue) and not wired up here yet.
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

  function refreshList() {
    var url = "/fragments/files/list?path=" + encodeURIComponent(currentPath());
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
    })
      .then(function (r) {
        return r.json().then(function (data) {
          if (!r.ok) throw new Error(data.error || "gagal");
          return data;
        });
      });
  }

  window.tkFileRename = function (path) {
    var name = path.split("/").pop();
    var newName = window.prompt("Nama baru untuk \"" + name + "\":", name);
    if (!newName || newName === name) return;
    var newPath = path.slice(0, path.length - name.length) + newName;
    doOp({ action: "rename", path: path, newPath: newPath })
      .then(refreshList)
      .catch(function (e) { alert("Rename gagal: " + e.message); });
  };

  window.tkFileDelete = function (path, name) {
    if (!window.confirm("Hapus \"" + name + "\"? Tindakan ini tidak bisa dibatalkan.")) return;
    doOp({ action: "delete", path: path })
      .then(refreshList)
      .catch(function (e) { alert("Hapus gagal: " + e.message); });
  };

  document.addEventListener("DOMContentLoaded", function () {
    var newFolderBtn = document.getElementById("btn-new-folder");
    var newFileBtn = document.getElementById("btn-new-file");

    if (newFolderBtn) {
      newFolderBtn.addEventListener("click", function () {
        var name = window.prompt("Nama folder baru:");
        if (!name) return;
        var base = currentPath();
        var path = (base === "/" ? "" : base) + "/" + name;
        doOp({ action: "mkdir", path: path })
          .then(refreshList)
          .catch(function (e) { alert("Gagal membuat folder: " + e.message); });
      });
    }

    if (newFileBtn) {
      newFileBtn.addEventListener("click", function () {
        var name = window.prompt("Nama file baru:");
        if (!name) return;
        var base = currentPath();
        var path = (base === "/" ? "" : base) + "/" + name;
        doOp({ action: "create", path: path })
          .then(refreshList)
          .catch(function (e) { alert("Gagal membuat file: " + e.message); });
      });
    }
  });
})();
