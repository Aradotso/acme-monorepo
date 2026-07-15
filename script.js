const panels = {
  dashboard: {
    title: "Operations dashboard",
    stats: [
      ["Windows", "5", "Desktop Pane, Explorer, Teams, Edge, Terminal"],
      ["CPU", "28%", "Balanced power mode"],
      ["Focus", "On", "Quiet hours active"],
    ],
  },
  files: {
    title: "Project files",
    stats: [
      ["Folders", "18", "Three updated today"],
      ["Sync", "Live", "OneDrive status healthy"],
      ["Storage", "64%", "421 GB available"],
    ],
  },
  terminal: {
    title: "Windows Terminal monitor",
    stats: [
      ["Shells", "3", "PowerShell, WSL, Command Prompt"],
      ["Latency", "16ms", "Local process stream"],
      ["Checks", "Green", "Last run completed"],
    ],
  },
  settings: {
    title: "System settings",
    stats: [
      ["Theme", "Dark", "Mica material enabled"],
      ["Display", "125%", "Adaptive desktop preview"],
      ["Input", "Live", "Window controls and Start enabled"],
    ],
  },
};

const feed = [
  "explorer: indexed workspace shortcuts",
  "desktop-pane: refreshed live metrics",
  "terminal: PowerShell heartbeat ok",
  "window-manager: snap layout ready",
  "sync: project files are current",
  "start: app list updated",
];

const clock = document.querySelector("#clock");
const statsEl = document.querySelector("#stats");
const paneTitle = document.querySelector("#pane-title");
const feedLines = document.querySelector("#feed-lines");
const feedState = document.querySelector("#feed-state");
const windowEl = document.querySelector("#window");
const titlebar = document.querySelector("#titlebar");
const startButton = document.querySelector("#start-button");
const startMenu = document.querySelector("#start-menu");

let activePanel = "dashboard";
let feedIndex = 0;
let drag = null;

function renderClock() {
  const now = new Date();
  clock.dateTime = now.toISOString();
  clock.textContent = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(now);
}

function appendFeed(line) {
  const item = document.createElement("p");
  const stamp = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  item.textContent = `[${stamp}] ${line}`;
  feedLines.append(item);

  while (feedLines.children.length > 7) {
    feedLines.firstElementChild.remove();
  }
}

function renderPanel(name) {
  activePanel = name;
  const panel = panels[name];
  paneTitle.textContent = panel.title;
  statsEl.innerHTML = panel.stats
    .map(([label, value, detail]) => `
      <article class="stat">
        <span>${label}</span>
        <strong>${value}</strong>
        <span>${detail}</span>
      </article>
    `)
    .join("");

  document.querySelectorAll("[data-panel]").forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === name);
  });
}

function openPanel(name) {
  renderPanel(name);
  windowEl.classList.remove("minimized");
  startMenu.hidden = true;
  feedState.textContent = `${panels[name].title} active`;
  appendFeed(`desktop-pane: opened ${panels[name].title}`);
}

function streamFeed() {
  appendFeed(feed[feedIndex % feed.length]);
  feedIndex += 1;
}

document.querySelectorAll("[data-panel]").forEach((button) => {
  button.addEventListener("click", () => openPanel(button.dataset.panel));
});

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => openPanel(button.dataset.open));
});

startButton.addEventListener("click", () => {
  startMenu.hidden = !startMenu.hidden;
});

document.querySelector("#minimize").addEventListener("click", () => {
  windowEl.classList.toggle("minimized");
  startMenu.hidden = true;
  appendFeed("window-manager: toggled minimize");
});

document.querySelector("#maximize").addEventListener("click", () => {
  windowEl.classList.toggle("maximized");
  startMenu.hidden = true;
  appendFeed("window-manager: toggled maximize");
});

document.querySelector("#close").addEventListener("click", () => {
  windowEl.style.opacity = "0";
  feedState.textContent = "window closing";
  setTimeout(() => {
    windowEl.style.opacity = "1";
    appendFeed("window-manager: restored Desktop Pane");
  }, 800);
});

titlebar.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button") || windowEl.classList.contains("maximized")) return;
  const rect = windowEl.getBoundingClientRect();
  drag = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
  titlebar.setPointerCapture(event.pointerId);
});

titlebar.addEventListener("pointermove", (event) => {
  if (!drag || window.matchMedia("(max-width: 820px)").matches) return;
  windowEl.style.left = `${Math.max(16, event.clientX - drag.x)}px`;
  windowEl.style.top = `${Math.max(16, event.clientY - drag.y)}px`;
});

titlebar.addEventListener("pointerup", (event) => {
  drag = null;
  titlebar.releasePointerCapture(event.pointerId);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    startMenu.hidden = true;
  }
});

renderClock();
renderPanel("dashboard");
feed.slice(0, 4).forEach(appendFeed);
setInterval(renderClock, 1000);
setInterval(streamFeed, 1700);
