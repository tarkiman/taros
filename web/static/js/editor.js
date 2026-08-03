// Vanilla JS wiring around window.TkEditor (the CodeMirror bundle, see
// scripts/codemirror-build) — this file itself is NOT bundled, consistent
// with docs/03-tech-stack.md's "htmx + Alpine, bukan SPA" reasoning: only
// the editor's own dependency tree needs a real build step, the glue code
// around it doesn't.
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

  var mount = document.getElementById("editor-mount");
  if (!mount) return;
  var path = mount.getAttribute("data-path");
  var draftKey = "tk-draft:" + path;
  var wrapKey = "tk-wordwrap";

  var statusEl = document.getElementById("editor-status");
  var dirtyEl = document.getElementById("editor-dirty");
  var saveBtn = document.getElementById("btn-save");
  var wrapChk = document.getElementById("chk-wrap");

  var editor = null;
  var expectedModTime = "";
  var dirty = false;
  var draftTimer = null;

  function setDirty(v) {
    dirty = v;
    dirtyEl.style.display = v ? "inline-block" : "none";
  }

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function scheduleDraftSave() {
    if (draftTimer) clearTimeout(draftTimer);
    draftTimer = setTimeout(function () {
      if (dirty && editor) localStorage.setItem(draftKey, editor.getValue());
    }, 3000);
  }

  function doSave(force) {
    var body = { content: editor.getValue() };
    if (!force) body.expectedModTime = expectedModTime;

    fetch("/api/files/content?path=" + encodeURIComponent(path), {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken() },
      body: JSON.stringify(body),
    }).then(function (r) {
      if (r.status === 409) {
        if (window.confirm(
          "File ini sudah berubah di disk sejak dibuka (mungkin diedit dari terminal/proses lain).\n\n" +
          "OK = timpa dengan isi editor ini\nCancel = muat ulang halaman (perubahan di editor akan hilang)"
        )) {
          doSave(true);
        } else {
          window.location.reload();
        }
        return null;
      }
      return r.json().then(function (data) {
        if (!r.ok) throw new Error(data.error || "gagal simpan");
        return data;
      });
    }).then(function (data) {
      if (!data) return; // conflict path already handled above
      expectedModTime = data.modTime;
      setDirty(false);
      localStorage.removeItem(draftKey);
      setStatus("Tersimpan " + new Date().toLocaleTimeString());
    }).catch(function (e) {
      setStatus("Gagal simpan: " + e.message);
    });
  }

  fetch("/api/files/content?path=" + encodeURIComponent(path))
    .then(function (r) {
      return r.json().then(function (data) {
        if (!r.ok) throw { status: r.status, message: data.error || "gagal memuat file" };
        return data;
      });
    })
    .then(function (data) {
      expectedModTime = data.modTime;
      var initialContent = data.content;

      var draft = localStorage.getItem(draftKey);
      if (draft && draft !== initialContent) {
        if (window.confirm("Ada draft tersimpan otomatis untuk file ini (dari sesi sebelumnya yang mungkin belum sempat disimpan). Pulihkan draft itu?")) {
          initialContent = draft;
          setDirty(true);
        } else {
          localStorage.removeItem(draftKey);
        }
      }

      var wantWrap = localStorage.getItem(wrapKey) === "1";
      wrapChk.checked = wantWrap;

      var prefersDark = !window.matchMedia("(prefers-color-scheme: light)").matches;

      editor = window.TkEditor.createEditor({
        container: mount,
        doc: initialContent,
        filename: path.split("/").pop(),
        dark: prefersDark,
        wordWrap: wantWrap,
        onChange: function () {
          setDirty(true);
          scheduleDraftSave();
        },
        onSave: function () { doSave(false); },
      });
      editor.focus();
    })
    .catch(function (err) {
      if (err.status === 413) {
        mount.innerHTML = "<p class=\"panel\">File terlalu besar untuk dibuka di editor (&gt;2MB). " +
          "<a href=\"/api/files/download?path=" + encodeURIComponent(path) + "\">Unduh</a> sebagai gantinya.</p>";
      } else if (err.status === 415) {
        mount.innerHTML = "<p class=\"panel\">File ini sepertinya biner (bukan teks), tidak bisa dibuka di editor. " +
          "<a href=\"/api/files/download?path=" + encodeURIComponent(path) + "\">Unduh</a> sebagai gantinya.</p>";
      } else {
        mount.innerHTML = "<p class=\"panel alert-error\">Gagal memuat file: " + (err.message || err) + "</p>";
      }
    });

  saveBtn.addEventListener("click", function () { if (editor) doSave(false); });

  wrapChk.addEventListener("change", function () {
    localStorage.setItem(wrapKey, wrapChk.checked ? "1" : "0");
    if (editor) editor.setWordWrap(wrapChk.checked);
  });

  window.addEventListener("beforeunload", function (ev) {
    if (dirty) {
      ev.preventDefault();
      ev.returnValue = "";
    }
  });
})();
