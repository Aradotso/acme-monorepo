import { chromium } from "playwright";

const url = process.env.CAT_GAME_URL || "http://localhost:3000/cat-game/";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

try {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector("#game-canvas");

  const initial = await page.evaluate(() => ({
    title: document.querySelector("h1").textContent,
    score: document.querySelector("#score").textContent,
    time: document.querySelector("#time-left").textContent,
    overlay: document.querySelector("#overlay-title").textContent,
    canvas: {
      width: document.querySelector("#game-canvas").clientWidth,
      height: document.querySelector("#game-canvas").clientHeight
    }
  }));

  assert(initial.title === "Snack Cat", "game title should render");
  assert(initial.score === "0", "score should start at zero");
  assert(initial.time === "30", "timer should start at 30");
  assert(initial.overlay === "Ready?", "ready overlay should render");
  assert(initial.canvas.width > 800 && initial.canvas.height > 450, "desktop canvas should be visible");

  await page.click("#start-button");
  await page.keyboard.down("ArrowRight");
  await page.waitForTimeout(280);
  await page.keyboard.up("ArrowRight");

  const movement = await page.evaluate(() => {
    const canvas = document.querySelector("#game-canvas");
    const hidden = document.querySelector("#game-overlay").classList.contains("hidden");
    return { hidden, width: canvas.clientWidth, height: canvas.clientHeight };
  });
  assert(movement.hidden, "overlay should hide after start");
  assert(movement.width > movement.height, "game canvas should keep landscape aspect");

  await page.click("#reset-button");
  const reset = await page.evaluate(() => ({
    score: document.querySelector("#score").textContent,
    time: document.querySelector("#time-left").textContent,
    overlay: document.querySelector("#overlay-title").textContent
  }));
  assert(reset.score === "0", "reset should clear score");
  assert(reset.time === "30", "reset should restore timer");
  assert(reset.overlay === "Ready?", "reset should restore ready overlay");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(100);
  const mobile = await page.evaluate(() => {
    const canvas = document.querySelector("#game-canvas");
    const controls = document.querySelector(".controls").getBoundingClientRect();
    return {
      canvasWidth: canvas.clientWidth,
      controlsWidth: controls.width,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  assert(mobile.canvasWidth <= 370, "mobile canvas should fit viewport");
  assert(mobile.controlsWidth <= 370, "mobile controls should fit viewport");
  assert(!mobile.overflow, "mobile page should not horizontally overflow");
} finally {
  await browser.close();
}

console.log("Cat game browser checks passed");
