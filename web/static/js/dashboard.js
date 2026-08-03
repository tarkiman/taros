// Vanilla JS — no framework, see docs/03-tech-stack.md "Kenapa htmx +
// Alpine, bukan SPA". This page only needs live text updates + one chart,
// not enough to justify a component framework.
(function () {
  "use strict";

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes.toFixed(0) + " B";
    const units = ["KB", "MB", "GB", "TB"];
    let v = bytes;
    for (const u of units) {
      v /= 1024;
      if (v < 1024) return v.toFixed(1) + " " + u;
    }
    return v.toFixed(1) + " TB";
  }

  function formatRate(bytesPerSec) {
    return formatBytes(bytesPerSec) + "/s";
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function renderDiskTable(disks) {
    const tbody = document.querySelector("#table-disks tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    (disks || []).forEach(function (d) {
      const tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + d.mountPoint + (d.removable ? " <span class=\"badge\">USB</span>" : "") + "</td>" +
        "<td>" + d.usedPercent.toFixed(0) + "%</td>" +
        "<td>" + formatBytes(d.usedBytes) + " / " + formatBytes(d.totalBytes) + "</td>";
      tbody.appendChild(tr);
    });
  }

  function renderNetTable(ifaces) {
    const tbody = document.querySelector("#table-net tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    (ifaces || []).forEach(function (n) {
      const tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + n.name + "</td>" +
        "<td>↓ " + formatRate(n.rxBytesPerSec) + "</td>" +
        "<td>↑ " + formatRate(n.txBytesPerSec) + "</td>";
      tbody.appendChild(tr);
    });
  }

  function renderTemps(temps) {
    const list = document.getElementById("list-temps");
    if (!list) return;
    list.innerHTML = "";
    (temps || []).forEach(function (t) {
      const li = document.createElement("li");
      li.textContent = t.label + ": " + t.celsius.toFixed(1) + "°C";
      list.appendChild(li);
    });
  }

  function maxPercent(disks) {
    let max = 0;
    (disks || []).forEach(function (d) {
      if (d.usedPercent > max) max = d.usedPercent;
    });
    return max;
  }

  function maxTemp(temps) {
    let max = 0;
    (temps || []).forEach(function (t) {
      if (t.celsius > max) max = t.celsius;
    });
    return max;
  }

  // --- Chart (CPU % + RAM % over the last 15 minutes) ---

  const MAX_POINTS = 450; // matches the server's raw ring buffer capacity

  let chart = null;
  let chartData = [[], [], []]; // [x(seconds), cpu%, mem%]

  function initChart() {
    const el = document.getElementById("chart-cpumem");
    if (!el || typeof uPlot === "undefined") return;

    chart = new uPlot(
      {
        width: el.clientWidth || 600,
        height: 220,
        scales: { y: { range: [0, 100] } },
        axes: [{}, { values: (u, vals) => vals.map((v) => v + "%") }],
        series: [
          {},
          { label: "CPU", stroke: "#4da3ff", width: 2 },
          { label: "RAM", stroke: "#ef5a5a", width: 2 },
        ],
      },
      chartData,
      el
    );

    window.addEventListener("resize", function () {
      if (chart) chart.setSize({ width: el.clientWidth || 600, height: 220 });
    });
  }

  function pushChartPoint(timeSec, cpuPct, memPct) {
    chartData[0].push(timeSec);
    chartData[1].push(cpuPct);
    chartData[2].push(memPct);
    if (chartData[0].length > MAX_POINTS) {
      chartData[0].shift();
      chartData[1].shift();
      chartData[2].shift();
    }
    if (chart) chart.setData(chartData);
  }

  function loadHistory() {
    fetch("/api/metrics/history?metric=cpu")
      .then((r) => r.json())
      .then((cpuSamples) => {
        return fetch("/api/metrics/history?metric=mem")
          .then((r) => r.json())
          .then((memSamples) => {
            const n = Math.min(cpuSamples.length, memSamples.length);
            for (let i = 0; i < n; i++) {
              chartData[0].push(Math.floor(new Date(cpuSamples[i].t).getTime() / 1000));
              chartData[1].push(cpuSamples[i].v);
              chartData[2].push(memSamples[i].v);
            }
            if (chart) chart.setData(chartData);
          });
      })
      .catch(function () {
        // History backfill is best-effort — the live SSE stream still
        // works fine without it, the chart just starts empty.
      });
  }

  // --- Live updates via SSE ---

  function setConnStatus(ok) {
    const el = document.getElementById("conn-status");
    if (el) el.style.color = ok ? "#3ecf6e" : "#ef5a5a";
  }

  function applySnapshot(snap) {
    setText("val-cpu", snap.cpu.totalPercent.toFixed(0) + "%");
    setText("val-mem", snap.mem.usedPercent.toFixed(0) + "%");
    setText("val-disk", maxPercent(snap.disks).toFixed(0) + "%");
    setText("val-temp", maxTemp(snap.temps).toFixed(1) + "°C");

    renderDiskTable(snap.disks);
    renderNetTable(snap.net);
    renderTemps(snap.temps);

    pushChartPoint(Math.floor(new Date(snap.time).getTime() / 1000), snap.cpu.totalPercent, snap.mem.usedPercent);
  }

  function connect() {
    const es = new EventSource("/api/stream/metrics");
    es.onopen = function () {
      setConnStatus(true);
    };
    es.onerror = function () {
      setConnStatus(false);
      // Browser's EventSource auto-reconnects on its own.
    };
    es.onmessage = function (ev) {
      try {
        applySnapshot(JSON.parse(ev.data));
      } catch (e) {
        // Ignore a malformed tick, next one will self-correct.
      }
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    initChart();
    loadHistory();
    connect();
  });
})();
