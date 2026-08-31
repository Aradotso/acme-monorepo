const windows = Array.from(document.querySelectorAll(".window"));
const tasks = Array.from(document.querySelectorAll(".task"));
const trayButton = document.querySelector("#trayButton");
const quickPanel = document.querySelector("#quickPanel");
const brightness = document.querySelector("#brightness");
const clock = document.querySelector("#clock");
const cpuValue = document.querySelector("#cpuValue");
const memoryValue = document.querySelector("#memoryValue");
const networkValue = document.querySelector("#networkValue");
const terminalOutput = document.querySelector("#terminalOutput");
const canvas = document.querySelector("#activityChart");
const ctx = canvas.getContext("2d");

let topZ = 10;
let tick = 0;
let dragState = null;
const chartPoints = Array.from({ length: 38 }, (_, index) => 34 + Math.sin(index / 2) * 18);
const terminalLines = [
  "PS C:\\Users\\Ara> winget upgrade --all",
  "Found 4 packages with available updates.",
  "Downloading Microsoft.WindowsTerminal 1.22...",
  "Installing update... done",
  "Refreshing desktop pane telemetry...",
  "All live widgets are responding."
];

function focusWindow(id) {
  windows.forEach((windowEl) => {
    const isActive = windowEl.dataset.id === id;
    windowEl.classList.toggle("active", isActive);
    if (isActive) {
      topZ += 1;
      windowEl.style.zIndex = topZ;
    }
  });

  tasks.forEach((task) => {
    task.classList.toggle("active", task.dataset.window === id);
  });
}

function showWindow(id) {
  const windowEl = document.querySelector(`.window[data-id="${id}"]`);
  if (!windowEl) return;
  windowEl.hidden = false;
  focusWindow(id);
}

document.querySelectorAll("[data-window]").forEach((trigger) => {
  trigger.addEventListener("click", () => showWindow(trigger.dataset.window));
});

windows.forEach((windowEl) => {
  const originalFrame = {
    x: windowEl.style.getPropertyValue("--x"),
    y: windowEl.style.getPropertyValue("--y"),
    w: windowEl.style.getPropertyValue("--w"),
    h: windowEl.style.getPropertyValue("--h")
  };

  windowEl.addEventListener("pointerdown", () => focusWindow(windowEl.dataset.id));

  const titlebar = windowEl.querySelector(".titlebar");
  titlebar.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    const rect = windowEl.getBoundingClientRect();
    dragState = {
      windowEl,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };
    titlebar.setPointerCapture(event.pointerId);
  });

  titlebar.addEventListener("pointermove", (event) => {
    if (!dragState || dragState.windowEl !== windowEl) return;
    const maxLeft = window.innerWidth - Math.min(windowEl.offsetWidth, window.innerWidth - 24) - 8;
    const maxTop = window.innerHeight - windowEl.offsetHeight - 58;
    const nextLeft = Math.max(8, Math.min(maxLeft, event.clientX - dragState.offsetX));
    const nextTop = Math.max(8, Math.min(maxTop, event.clientY - dragState.offsetY));
    windowEl.style.setProperty("--x", `${nextLeft}px`);
    windowEl.style.setProperty("--y", `${nextTop}px`);
  });

  titlebar.addEventListener("pointerup", () => {
    dragState = null;
  });

  windowEl.querySelector("[aria-label='Minimize']").addEventListener("click", () => {
    windowEl.hidden = true;
    const visibleWindow = windows.find((candidate) => !candidate.hidden && candidate !== windowEl);
    if (visibleWindow) focusWindow(visibleWindow.dataset.id);
  });

  windowEl.querySelector("[aria-label='Close']").addEventListener("click", () => {
    windowEl.hidden = true;
  });

  windowEl.querySelector("[aria-label='Maximize']").addEventListener("click", () => {
    windowEl.classList.toggle("maximized");
    if (windowEl.classList.contains("maximized")) {
      windowEl.style.setProperty("--x", "14px");
      windowEl.style.setProperty("--y", "14px");
      windowEl.style.setProperty("--w", "calc(100vw - 28px)");
      windowEl.style.setProperty("--h", "calc(100vh - 82px)");
    } else {
      windowEl.style.setProperty("--x", originalFrame.x);
      windowEl.style.setProperty("--y", originalFrame.y);
      windowEl.style.setProperty("--w", originalFrame.w);
      windowEl.style.setProperty("--h", originalFrame.h);
    }
  });
});

trayButton.addEventListener("click", () => quickPanel.classList.toggle("open"));

brightness.addEventListener("input", () => {
  document.querySelector(".desktop").style.setProperty("--brightness", brightness.value / 100);
});

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function updateMetrics() {
  tick += 1;
  const cpu = Math.round(42 + Math.sin(tick / 3) * 18 + Math.random() * 6);
  const memory = Math.round(64 + Math.cos(tick / 4) * 9);
  const network = Math.round(190 + Math.sin(tick / 2) * 70 + Math.random() * 25);

  cpuValue.textContent = `${cpu}%`;
  memoryValue.textContent = `${memory}%`;
  networkValue.textContent = `${network} Mbps`;
  cpuValue.nextElementSibling.style.setProperty("--level", `${cpu}%`);
  memoryValue.nextElementSibling.style.setProperty("--level", `${memory}%`);

  chartPoints.push(Math.max(10, Math.min(110, 58 + Math.sin(tick / 2) * 26 + Math.random() * 22)));
  chartPoints.shift();
  drawChart();
}

function drawChart() {
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  ctx.beginPath();
  chartPoints.forEach((value, index) => {
    const x = (index / (chartPoints.length - 1)) * width;
    const y = height - value;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function renderTerminal() {
  const visibleCount = 2 + (tick % terminalLines.length);
  terminalOutput.textContent = terminalLines.slice(0, visibleCount).join("\n");
}

setInterval(updateClock, 1000);
setInterval(() => {
  updateMetrics();
  renderTerminal();
}, 1400);

updateClock();
updateMetrics();
renderTerminal();
