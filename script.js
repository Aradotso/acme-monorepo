const datasets = {
  finder: {
    title: "Projects",
    subtitle: "Live workspace",
    eyebrow: "Now viewing",
    views: {
      recents: [
        ["Design review", "Updated 4 minutes ago", "Pages"],
        ["Pane prototype", "Synced just now", "HTML"],
        ["Launch assets", "Shared by Maya", "Folder"],
        ["Status brief", "Edited today", "Keynote"],
        ["Budget model", "Viewed yesterday", "Numbers"],
        ["User flows", "Pinned item", "Figma"]
      ],
      desktop: [
        ["Demo notes", "On desktop", "Text"],
        ["Screenshot queue", "3 captures", "Folder"],
        ["Preview alias", "Quick link", "Alias"]
      ],
      documents: [
        ["Q3 plan", "12 pages", "Pages"],
        ["Research log", "Updated today", "PDF"],
        ["Content map", "Draft", "Sheet"]
      ],
      downloads: [
        ["macos-pane.zip", "Downloaded now", "Archive"],
        ["receipt.pdf", "Yesterday", "PDF"],
        ["wallpaper.heic", "Last week", "Image"]
      ]
    }
  },
  notes: {
    title: "Notes",
    subtitle: "Pinned notes",
    eyebrow: "Pinned",
    views: {
      recents: [
        ["Demo checklist", "Dock, menu bar, and live pane states", "Note"],
        ["Review prompt", "Keep controls compact and tactile", "Note"],
        ["Next polish", "Mobile layout and capture pass", "Note"]
      ],
      desktop: [
        ["Desktop idea", "Icon selections mirror the dock", "Note"],
        ["Motion", "Use small hover lifts only", "Note"]
      ],
      documents: [
        ["Product copy", "Short labels, no onboarding prose", "Note"],
        ["Release note", "Static app, no install required", "Note"]
      ],
      downloads: [
        ["Clipping", "Saved from browser", "Note"],
        ["Reference", "Imported markdown", "Note"]
      ]
    }
  },
  activity: {
    title: "Activity",
    subtitle: "System monitor",
    eyebrow: "Live metrics",
    views: {
      recents: [
        ["WindowServer", "12.4% CPU", "Process"],
        ["Safari", "8 tabs active", "App"],
        ["Ara preview", "Serving static files", "Task"]
      ],
      desktop: [
        ["GPU history", "Stable", "Graph"],
        ["Memory pressure", "Green", "Metric"]
      ],
      documents: [
        ["Indexing", "42 files scanned", "Service"],
        ["Sync agent", "Idle", "Service"]
      ],
      downloads: [
        ["Network", "1.8 MB/s", "Metric"],
        ["Disk write", "320 KB/s", "Metric"]
      ]
    }
  },
  calendar: {
    title: "Calendar",
    subtitle: "Today",
    eyebrow: "Schedule",
    views: {
      recents: [
        ["Design crit", "10:30 AM", "Event"],
        ["Prototype share", "1:00 PM", "Event"],
        ["Ship review", "4:15 PM", "Event"]
      ],
      desktop: [["Focus block", "No conflicts", "Event"]],
      documents: [["Planning", "Tomorrow", "Event"]],
      downloads: [["Archive", "Friday", "Event"]]
    }
  }
};

const appButtons = document.querySelectorAll("[data-app]");
const viewButtons = document.querySelectorAll("[data-view]");
const grid = document.querySelector("#file-grid");
const clock = document.querySelector("#clock");
const paneTitle = document.querySelector("#pane-title");
const paneSubtitle = document.querySelector("#pane-subtitle");
const paneEyebrow = document.querySelector("#pane-eyebrow");
const viewTitle = document.querySelector("#view-title");
const shuffle = document.querySelector("#shuffle");

let activeApp = "finder";
let activeView = "recents";

function renderClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  clock.dateTime = now.toISOString();
}

function renderPane() {
  const app = datasets[activeApp];
  const rows = app.views[activeView] ?? app.views.recents;

  paneTitle.textContent = app.title;
  paneSubtitle.textContent = app.subtitle;
  paneEyebrow.textContent = app.eyebrow;
  viewTitle.textContent = activeView[0].toUpperCase() + activeView.slice(1);

  grid.replaceChildren(...rows.map(([title, detail, badge]) => {
    const card = document.createElement("article");
    card.className = "file-card";
    card.innerHTML = `
      <strong>${title}</strong>
      <p>${detail}</p>
      <span class="file-badge">${badge}</span>
    `;
    return card;
  }));

  appButtons.forEach((button) => {
    button.classList.toggle("selected", button.dataset.app === activeApp && button.classList.contains("dock-icon"));
    button.classList.toggle("active", button.dataset.app === activeApp && button.classList.contains("desktop-icon"));
  });
}

appButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeApp = button.dataset.app;
    renderPane();
  });
});

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeView = button.dataset.view;
    viewButtons.forEach((item) => item.classList.toggle("selected", item === button));
    renderPane();
  });
});

shuffle.addEventListener("click", () => {
  const views = Object.keys(datasets[activeApp].views);
  const nextIndex = (views.indexOf(activeView) + 1) % views.length;
  activeView = views[nextIndex];
  viewButtons.forEach((item) => item.classList.toggle("selected", item.dataset.view === activeView));
  renderPane();
});

renderClock();
renderPane();
setInterval(renderClock, 1000);
