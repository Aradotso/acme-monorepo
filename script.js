const windows = [...document.querySelectorAll(".window")];
const tasks = [...document.querySelectorAll(".task")];
const shortcuts = [...document.querySelectorAll(".shortcut")];
const toast = document.querySelector("#toast");
const clock = document.querySelector("#clock");
const eventList = document.querySelector("#event-list");
const healthScore = document.querySelector("#health-score");
const requestCount = document.querySelector("#request-count");
const syncPercent = document.querySelector("#sync-percent");
const syncBar = document.querySelector("#sync-bar");
const chart = document.querySelector("#chart");

let topZ = 4;
let syncValue = 72;
let healthValue = 98;
let requests = 24.8;

const events = [
  "Canary reached iad-2",
  "Queue drain completed",
  "Edge cache warmed",
  "Worker pool rotated",
  "Policy bundle signed",
  "Audit export finished"
];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("visible"), 1800);
}

function setActive(name) {
  windows.forEach((win) => win.classList.toggle("active", win.dataset.window === name));
  tasks.forEach((task) => task.classList.toggle("active", task.dataset.window === name));
  const target = document.querySelector(`[data-window="${name}"].window`);
  if (target) target.style.zIndex = String(++topZ);
}

function openWindow(name) {
  const target = document.querySelector(`[data-window="${name}"].window`);
  if (!target) return;
  target.classList.remove("hidden");
  setActive(name);
  showToast(`${target.querySelector(".title").textContent} opened`);
}

function updateClock() {
  clock.textContent = new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date());
}

function updateLiveData() {
  healthValue = Math.max(94, Math.min(100, healthValue + (Math.random() > 0.55 ? 1 : -1)));
  requests = Math.max(18, requests + (Math.random() - 0.42) * 1.4);
  syncValue = syncValue >= 99 ? 68 : syncValue + Math.random() * 2.8;

  healthScore.textContent = `${Math.round(healthValue)}%`;
  requestCount.textContent = `${requests.toFixed(1)}k`;
  syncPercent.textContent = `${Math.round(syncValue)}%`;
  syncBar.style.width = `${Math.round(syncValue)}%`;

  const nextEvent = events[Math.floor(Math.random() * events.length)];
  const item = document.createElement("li");
  item.innerHTML = `<span>${nextEvent}</span><time>${clock.textContent}</time>`;
  eventList.prepend(item);
  while (eventList.children.length > 4) eventList.lastElementChild.remove();

  [...chart.children].forEach((bar) => {
    bar.style.height = `${24 + Math.round(Math.random() * 78)}%`;
  });
}

function beginDrag(event, win) {
  if (event.target.closest(".window-controls") || win.classList.contains("maximized")) return;
  const startX = event.clientX;
  const startY = event.clientY;
  const rect = win.getBoundingClientRect();
  win.setPointerCapture(event.pointerId);
  setActive(win.dataset.window);

  function move(pointerEvent) {
    const x = Math.max(8, Math.min(window.innerWidth - 80, rect.left + pointerEvent.clientX - startX));
    const y = Math.max(8, Math.min(window.innerHeight - 94, rect.top + pointerEvent.clientY - startY));
    win.style.left = `${x}px`;
    win.style.top = `${y}px`;
  }

  function stop() {
    win.removeEventListener("pointermove", move);
    win.removeEventListener("pointerup", stop);
  }

  win.addEventListener("pointermove", move);
  win.addEventListener("pointerup", stop);
}

windows.forEach((win) => {
  win.addEventListener("pointerdown", () => setActive(win.dataset.window));
  win.querySelector(".titlebar").addEventListener("pointerdown", (event) => beginDrag(event, win));
  win.querySelector(".window-controls").addEventListener("click", (event) => {
    const action = event.target.dataset.action;
    if (!action) return;

    if (action === "close" || action === "minimize") {
      win.classList.add("hidden");
      tasks.find((task) => task.dataset.window === win.dataset.window)?.classList.remove("active");
      showToast(`${win.querySelector(".title").textContent} minimized`);
    }

    if (action === "maximize") {
      win.classList.toggle("maximized");
      setActive(win.dataset.window);
    }
  });
});

tasks.forEach((task) => task.addEventListener("click", () => openWindow(task.dataset.window)));
shortcuts.forEach((shortcut) => shortcut.addEventListener("dblclick", () => openWindow(shortcut.dataset.window)));
shortcuts.forEach((shortcut) => shortcut.addEventListener("click", () => setActive(shortcut.dataset.window)));

Array.from({ length: 18 }, () => {
  const bar = document.createElement("span");
  bar.className = "bar";
  chart.append(bar);
});

updateClock();
updateLiveData();
window.setInterval(updateClock, 1000);
window.setInterval(updateLiveData, 1800);
window.setTimeout(() => showToast("Live desktop ready"), 400);
