const timeNode = document.querySelector("[data-local-time]");
const loadNode = document.querySelector("[data-load]");
const loadBar = document.querySelector("[data-load-bar]");
const latencyNode = document.querySelector("[data-latency]");
const framesNode = document.querySelector("[data-frames]");
const modeNode = document.querySelector("[data-mode]");
const terminalLog = document.querySelector("[data-terminal-log]");
const desktopPreview = document.querySelector(".desktop-preview");
const scaleInput = document.querySelector("[data-scale]");
const focusButton = document.querySelector("[data-focus-demo]");
const refreshButton = document.querySelector("[data-refresh]");
const themeButton = document.querySelector("[data-theme-toggle]");
const windows = [...document.querySelectorAll(".mini-window")];

let activeWindow = 0;

function updateClock() {
  timeNode.textContent = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date());
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function refreshSignals() {
  const load = randomBetween(54, 92);
  const latency = randomBetween(18, 41);
  const frames = randomBetween(57, 60);

  loadNode.textContent = `${load}%`;
  loadBar.style.width = `${load}%`;
  latencyNode.textContent = `${latency} ms`;
  framesNode.textContent = `${frames} fps`;
  terminalLog.textContent = `> sync panes
> latency ${latency}ms
> desktop live`;
}

function focusNextWindow() {
  windows.forEach((windowNode) => windowNode.classList.remove("focused"));
  windows[activeWindow].classList.add("focused");
  activeWindow = (activeWindow + 1) % windows.length;
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("night");
  modeNode.textContent = document.body.classList.contains("night") ? "Night" : "Day";
});

refreshButton.addEventListener("click", refreshSignals);
focusButton.addEventListener("click", focusNextWindow);

scaleInput.addEventListener("input", (event) => {
  desktopPreview.style.transform = `scale(${event.target.value / 100})`;
});

updateClock();
refreshSignals();
focusNextWindow();
setInterval(updateClock, 1000);
setInterval(refreshSignals, 4200);
setInterval(focusNextWindow, 2600);
