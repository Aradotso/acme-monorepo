const desktop = document.querySelector("#desktop");
const windows = [...document.querySelectorAll("[data-window]")];
const clock = document.querySelector("#clock");
const taskbarClock = document.querySelector("#taskbarClock");
const throughput = document.querySelector("#throughput");
const sparkline = document.querySelector("#sparkline");
const incidentList = document.querySelector("#incidentList");
const consoleLog = document.querySelector("#consoleLog");
const previewGrid = document.querySelector("#previewGrid");
const paneStatus = document.querySelector("#paneStatus");
const resolveBtn = document.querySelector("#resolveBtn");

let topZ = 10;
let throughputValue = 1284;
let paneCount = 24;
let logIndex = 0;

const incidents = [
  ["Payments queue", "High retry pressure", "P1"],
  ["Forecast pane", "Cache warming", "P2"],
  ["Identity shard", "Latency watch", "P2"],
  ["Audit stream", "Backfill running", "P3"]
];

const logMessages = [
  "pane://ops attached live cursor stream",
  "metrics://east merged 118 window updates",
  "preview://grid promoted tile 07 to active",
  "desktop://taskbar refreshed pinned sessions",
  "stream://audit compacted viewport diff"
];

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function tickClock() {
  const now = formatTime(new Date());
  clock.textContent = now;
  taskbarClock.textContent = now;
}

function renderIncidents() {
  incidentList.innerHTML = incidents
    .map(([name, detail, severity]) => `<li><span><strong>${name}</strong><br><small>${detail}</small></span><small>${severity}</small></li>`)
    .join("");
}

function renderSparkline() {
  const bars = Array.from({ length: 24 }, (_, index) => {
    const height = 24 + Math.round(Math.abs(Math.sin((Date.now() / 700 + index) / 1.9)) * 68);
    return `<span style="height:${height}%"></span>`;
  });
  sparkline.innerHTML = bars.join("");
}

function renderPreviewGrid() {
  previewGrid.innerHTML = Array.from({ length: 24 }, (_, index) => {
    const hot = (index + logIndex) % 7 === 0 || (index + logIndex) % 11 === 0;
    return `<span class="${hot ? "hot" : ""}"></span>`;
  }).join("");
}

function pushLog() {
  const message = logMessages[logIndex % logMessages.length];
  const stamp = new Date().toLocaleTimeString([], { hour12: false });
  const nextLine = `[${stamp}] ${message}`;
  const lines = `${nextLine}\n${consoleLog.textContent}`.trim().split("\n").slice(0, 7);
  consoleLog.textContent = lines.join("\n");
  logIndex += 1;
}

function updateLiveData() {
  throughputValue += Math.round(Math.random() * 46 - 16);
  throughput.textContent = throughputValue.toLocaleString();
  paneStatus.textContent = `Syncing ${paneCount} panes`;
  paneCount = paneCount === 29 ? 21 : paneCount + 1;
  renderSparkline();
  renderPreviewGrid();
  pushLog();
}

function activateWindow(windowEl) {
  windows.forEach((item) => item.classList.remove("active"));
  windowEl.classList.add("active");
  windowEl.style.zIndex = String(++topZ);
}

function makeDraggable(windowEl) {
  const titlebar = windowEl.querySelector(".titlebar");
  let drag = null;

  titlebar.addEventListener("pointerdown", (event) => {
    if (window.matchMedia("(max-width: 760px)").matches) return;
    activateWindow(windowEl);
    const rect = windowEl.getBoundingClientRect();
    const desktopRect = desktop.getBoundingClientRect();
    drag = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      desktopRect
    };
    titlebar.setPointerCapture(event.pointerId);
  });

  titlebar.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const maxX = drag.desktopRect.width - windowEl.offsetWidth - 12;
    const maxY = drag.desktopRect.height - windowEl.offsetHeight - 78;
    const nextX = Math.max(12, Math.min(maxX, event.clientX - drag.desktopRect.left - drag.offsetX));
    const nextY = Math.max(86, Math.min(maxY, event.clientY - drag.desktopRect.top - drag.offsetY));
    windowEl.style.left = `${nextX}px`;
    windowEl.style.top = `${nextY}px`;
  });

  titlebar.addEventListener("pointerup", () => {
    drag = null;
  });
}

function makeResizable(windowEl) {
  const handle = windowEl.querySelector(".resize-handle");
  let resize = null;

  handle.addEventListener("pointerdown", (event) => {
    if (window.matchMedia("(max-width: 760px)").matches) return;
    activateWindow(windowEl);
    resize = {
      startX: event.clientX,
      startWidth: windowEl.offsetWidth,
      pointerId: event.pointerId
    };
    handle.setPointerCapture(event.pointerId);
  });

  handle.addEventListener("pointermove", (event) => {
    if (!resize) return;
    const desktopWidth = desktop.getBoundingClientRect().width;
    const width = resize.startWidth + event.clientX - resize.startX;
    windowEl.style.width = `${Math.max(280, Math.min(desktopWidth * 0.82, width))}px`;
  });

  handle.addEventListener("pointerup", () => {
    resize = null;
  });
}

windows.forEach((windowEl) => {
  windowEl.addEventListener("pointerdown", () => activateWindow(windowEl));
  makeDraggable(windowEl);
  makeResizable(windowEl);
});

document.querySelectorAll("[data-focus-window]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(`.${button.dataset.focusWindow}`);
    activateWindow(target);
  });
});

resolveBtn.addEventListener("click", () => {
  const resolved = incidents.shift();
  incidents.push([resolved[0], "Resolved and watching", "OK"]);
  renderIncidents();
  pushLog();
});

tickClock();
renderIncidents();
updateLiveData();
activateWindow(document.querySelector(".primary-window"));

setInterval(tickClock, 1000);
setInterval(updateLiveData, 1800);
