const panels = {
  overview: {
    title: "Desktop command center",
    metrics: [
      ["Windows", "4", "Finder, Notes, Mail, Terminal"],
      ["CPU", "31%", "Adaptive performance mode"],
      ["Focus", "Deep work", "Notifications muted"],
    ],
  },
  projects: {
    title: "Project handoff pane",
    metrics: [
      ["Open tasks", "12", "Three need review"],
      ["Design files", "8", "Synced two minutes ago"],
      ["Release", "v2.4", "Candidate build active"],
    ],
  },
  terminal: {
    title: "Live terminal monitor",
    metrics: [
      ["Shells", "3", "All healthy"],
      ["Latency", "18ms", "Local event stream"],
      ["Deploy", "Ready", "Checks are green"],
    ],
  },
  settings: {
    title: "System settings pane",
    metrics: [
      ["Theme", "Aqua", "Vibrant glass enabled"],
      ["Display", "1280px", "Responsive desktop preview"],
      ["Input", "Live", "Dock and window controls enabled"],
    ],
  },
};

const logLines = [
  "finder: mounted Desktop Pane",
  "windowserver: blur material refreshed",
  "dock: app focus changed",
  "spotlight: indexed 24 workspace files",
  "syncd: live widgets updated",
  "terminal: stream heartbeat ok",
];

const clock = document.querySelector("#clock");
const grid = document.querySelector("#metric-grid");
const paneTitle = document.querySelector("#pane-title");
const terminalLines = document.querySelector("#terminal-lines");
const terminalState = document.querySelector("#terminal-state");
const windowEl = document.querySelector("#window");
const titlebar = document.querySelector("#titlebar");
const buildPercent = document.querySelector("#build-percent");
const buildBar = document.querySelector("#build-bar");

let activePanel = "overview";
let logIndex = 0;
let drag = null;

function renderClock() {
  const now = new Date();
  clock.dateTime = now.toISOString();
  clock.textContent = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(now);
}

function renderPanel(name) {
  activePanel = name;
  const panel = panels[name];
  paneTitle.textContent = panel.title;
  grid.innerHTML = panel.metrics
    .map(([label, value, detail]) => `
      <article class="metric">
        <span>${label}</span>
        <strong>${value}</strong>
        <span>${detail}</span>
      </article>
    `)
    .join("");

  document.querySelectorAll(".sidebar button").forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === name);
  });
}

function appendLog(line) {
  const item = document.createElement("p");
  const stamp = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  item.textContent = `[${stamp}] ${line}`;
  terminalLines.append(item);

  while (terminalLines.children.length > 6) {
    terminalLines.firstElementChild.remove();
  }
}

function streamLog() {
  appendLog(logLines[logIndex % logLines.length]);
  logIndex += 1;
}

function updateBuild() {
  const value = 68 + Math.round((Math.sin(Date.now() / 900) + 1) * 12);
  buildPercent.textContent = `${value}%`;
  buildBar.style.width = `${value}%`;
}

document.querySelectorAll(".sidebar button").forEach((button) => {
  button.addEventListener("click", () => {
    renderPanel(button.dataset.panel);
    appendLog(`finder: opened ${button.textContent.trim()}`);
  });
});

document.querySelectorAll(".dock button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".dock button").forEach((dockButton) => {
      dockButton.classList.toggle("active", dockButton === button);
    });

    const matchingPanel = button.dataset.app === "terminal" ? "terminal" : activePanel;
    renderPanel(matchingPanel);
    terminalState.textContent = `${button.getAttribute("aria-label")} active`;
    appendLog(`dock: launched ${button.getAttribute("aria-label")}`);
    windowEl.classList.remove("is-minimized");
  });
});

document.querySelector(".close").addEventListener("click", () => {
  windowEl.style.opacity = "0";
  terminalState.textContent = "window closed";
  setTimeout(() => {
    windowEl.style.opacity = "1";
    appendLog("windowserver: restored Desktop Pane");
  }, 900);
});

document.querySelector(".minimize").addEventListener("click", () => {
  windowEl.classList.toggle("is-minimized");
  appendLog("windowserver: toggled minimize");
});

document.querySelector(".zoom").addEventListener("click", () => {
  windowEl.style.width = windowEl.style.width ? "" : "min(980px, calc(100vw - 64px))";
  appendLog("windowserver: toggled zoom");
});

document.querySelector("#refresh").addEventListener("click", () => {
  renderPanel(activePanel);
  appendLog("syncd: manual refresh complete");
});

titlebar.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button")) return;
  const rect = windowEl.getBoundingClientRect();
  drag = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
  titlebar.setPointerCapture(event.pointerId);
});

titlebar.addEventListener("pointermove", (event) => {
  if (!drag || window.matchMedia("(max-width: 860px)").matches) return;
  windowEl.style.left = `${Math.max(16, event.clientX - drag.x)}px`;
  windowEl.style.top = `${Math.max(42, event.clientY - drag.y)}px`;
});

titlebar.addEventListener("pointerup", (event) => {
  drag = null;
  titlebar.releasePointerCapture(event.pointerId);
});

renderClock();
renderPanel("overview");
logLines.slice(0, 4).forEach(appendLog);
setInterval(renderClock, 1000);
setInterval(streamLog, 1800);
setInterval(updateBuild, 700);
