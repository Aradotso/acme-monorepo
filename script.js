const clock = document.querySelector("#clock");
const fpsValue = document.querySelector("#fpsValue");
const latencyValue = document.querySelector("#latencyValue");
const syncValue = document.querySelector("#syncValue");
const fileRows = document.querySelectorAll(".file-row");
const desktopIcons = document.querySelectorAll(".desktop-icon");

function updateClock() {
  const now = new Date();
  const time = new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit",
  }).format(now);

  clock.textContent = time;
  clock.dateTime = now.toISOString();
}

function rotateMetrics() {
  const second = new Date().getSeconds();
  fpsValue.textContent = String(58 + (second % 3));
  latencyValue.textContent = `${16 + (second % 6)} ms`;
  syncValue.textContent = `${97 + (second % 3)}%`;
}

function selectWithin(group, selectedElement) {
  group.forEach((item) => item.classList.remove("selected", "active"));
  selectedElement.classList.add(
    selectedElement.classList.contains("desktop-icon") ? "active" : "selected",
  );
}

fileRows.forEach((row) => {
  row.addEventListener("click", () => selectWithin(fileRows, row));
});

desktopIcons.forEach((icon) => {
  icon.addEventListener("click", () => selectWithin(desktopIcons, icon));
});

updateClock();
rotateMetrics();
setInterval(updateClock, 1000);
setInterval(rotateMetrics, 1400);
