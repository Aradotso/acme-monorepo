(function () {
  const canvas = document.getElementById("game-canvas");
  const context = canvas.getContext("2d");
  const scoreNode = document.getElementById("score");
  const bestNode = document.getElementById("best-score");
  const timeNode = document.getElementById("time-left");
  const overlay = document.getElementById("game-overlay");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayCopy = document.getElementById("overlay-copy");
  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");

  const keys = new Set();
  const game = {
    running: false,
    score: 0,
    best: Number(window.localStorage.getItem("snack-cat-best") || 0),
    timeLeft: 30,
    lastTime: 0,
    nextSecond: 1000,
    cat: { x: 130, y: 300, radius: 34, speed: 280, face: 1 },
    treat: { x: 650, y: 270, radius: 18 },
    puddles: [
      { x: 390, y: 195, radius: 34, vx: 64, vy: 35 },
      { x: 760, y: 430, radius: 42, vx: -52, vy: -42 }
    ]
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function placeTreat() {
    let candidate;
    do {
      candidate = {
        x: 84 + Math.random() * (canvas.width - 168),
        y: 130 + Math.random() * (canvas.height - 200),
        radius: 18
      };
    } while (
      distance(candidate, game.cat) < 130 ||
      game.puddles.some((puddle) => distance(candidate, puddle) < 96)
    );
    game.treat = candidate;
  }

  function setOverlay(title, copy, visible) {
    overlayTitle.textContent = title;
    overlayCopy.textContent = copy;
    overlay.classList.toggle("hidden", !visible);
  }

  function updateHud() {
    scoreNode.textContent = String(game.score);
    bestNode.textContent = String(game.best);
    timeNode.textContent = String(game.timeLeft);
  }

  function resetGame() {
    game.running = false;
    game.score = 0;
    game.timeLeft = 30;
    game.lastTime = 0;
    game.nextSecond = 1000;
    game.cat.x = 130;
    game.cat.y = 300;
    game.cat.face = 1;
    game.puddles[0].x = 390;
    game.puddles[0].y = 195;
    game.puddles[1].x = 760;
    game.puddles[1].y = 430;
    placeTreat();
    updateHud();
    setOverlay("Ready?", "Use arrow keys, WASD, or the buttons to collect treats.", true);
    draw();
  }

  function startGame() {
    if (!game.running) {
      game.running = true;
      game.lastTime = 0;
      setOverlay("Go!", "Grab the treats and avoid the puddles.", false);
      window.requestAnimationFrame(tick);
    }
  }

  function finishGame(message) {
    game.running = false;
    game.best = Math.max(game.best, game.score);
    window.localStorage.setItem("snack-cat-best", String(game.best));
    updateHud();
    setOverlay("Game over", message, true);
  }

  function moveCat(delta) {
    let xDirection = 0;
    let yDirection = 0;
    if (keys.has("ArrowLeft") || keys.has("a")) xDirection -= 1;
    if (keys.has("ArrowRight") || keys.has("d")) xDirection += 1;
    if (keys.has("ArrowUp") || keys.has("w")) yDirection -= 1;
    if (keys.has("ArrowDown") || keys.has("s")) yDirection += 1;

    if (xDirection !== 0 || yDirection !== 0) {
      const length = Math.hypot(xDirection, yDirection);
      game.cat.x += (xDirection / length) * game.cat.speed * delta;
      game.cat.y += (yDirection / length) * game.cat.speed * delta;
      game.cat.face = xDirection < 0 ? -1 : xDirection > 0 ? 1 : game.cat.face;
    }

    game.cat.x = clamp(game.cat.x, game.cat.radius, canvas.width - game.cat.radius);
    game.cat.y = clamp(game.cat.y, 96, canvas.height - game.cat.radius);
  }

  function movePuddles(delta) {
    game.puddles.forEach((puddle) => {
      puddle.x += puddle.vx * delta;
      puddle.y += puddle.vy * delta;
      if (puddle.x < puddle.radius || puddle.x > canvas.width - puddle.radius) puddle.vx *= -1;
      if (puddle.y < 120 || puddle.y > canvas.height - puddle.radius) puddle.vy *= -1;
    });
  }

  function update(delta) {
    moveCat(delta);
    movePuddles(delta);

    if (distance(game.cat, game.treat) < game.cat.radius + game.treat.radius) {
      game.score += 1;
      placeTreat();
      updateHud();
    }

    if (game.puddles.some((puddle) => distance(game.cat, puddle) < game.cat.radius + puddle.radius - 10)) {
      finishGame("A puddle slowed the snack mission. Press Start to try again.");
    }
  }

  function drawBackground() {
    context.fillStyle = "#a5d8ff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#81b86f";
    context.fillRect(0, 105, canvas.width, canvas.height - 105);
    context.fillStyle = "#5a944d";
    for (let x = 24; x < canvas.width; x += 64) {
      context.fillRect(x, 115, 28, 5);
      context.fillRect(x + 24, 160, 34, 5);
      context.fillRect(x - 10, 500, 40, 5);
    }
    context.fillStyle = "#ffd166";
    context.beginPath();
    context.arc(84, 76, 34, 0, Math.PI * 2);
    context.fill();
  }

  function drawTreat() {
    const treat = game.treat;
    context.fillStyle = "#f7efe1";
    context.beginPath();
    context.arc(treat.x, treat.y, treat.radius, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = "#9d6b3c";
    context.lineWidth = 5;
    context.stroke();
    context.fillStyle = "#6b3f24";
    context.beginPath();
    context.arc(treat.x - 5, treat.y - 3, 3, 0, Math.PI * 2);
    context.arc(treat.x + 6, treat.y + 5, 3, 0, Math.PI * 2);
    context.fill();
  }

  function drawPuddle(puddle) {
    context.fillStyle = "#4a90c2";
    context.beginPath();
    context.ellipse(puddle.x, puddle.y, puddle.radius * 1.22, puddle.radius * .68, -.18, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "rgba(255,255,255,.45)";
    context.beginPath();
    context.ellipse(puddle.x - 10, puddle.y - 7, puddle.radius * .36, puddle.radius * .12, -.25, 0, Math.PI * 2);
    context.fill();
  }

  function drawCat() {
    const cat = game.cat;
    context.save();
    context.translate(cat.x, cat.y);
    context.scale(cat.face, 1);
    context.fillStyle = "#f28f38";
    context.beginPath();
    context.arc(0, 0, cat.radius, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.moveTo(-22, -25);
    context.lineTo(-8, -55);
    context.lineTo(5, -26);
    context.moveTo(14, -26);
    context.lineTo(31, -53);
    context.lineTo(32, -18);
    context.fill();
    context.fillStyle = "#fff0d8";
    context.beginPath();
    context.ellipse(7, 13, 18, 14, 0, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#2b2118";
    context.beginPath();
    context.arc(-10, -6, 4, 0, Math.PI * 2);
    context.arc(17, -6, 4, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = "#2b2118";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(4, 4);
    context.lineTo(9, 9);
    context.moveTo(-24, 6);
    context.lineTo(-48, -1);
    context.moveTo(-23, 14);
    context.lineTo(-48, 19);
    context.moveTo(26, 6);
    context.lineTo(51, 0);
    context.moveTo(25, 14);
    context.lineTo(50, 20);
    context.stroke();
    context.restore();
  }

  function draw() {
    drawBackground();
    game.puddles.forEach(drawPuddle);
    drawTreat();
    drawCat();
  }

  function tick(time) {
    if (!game.running) return;
    if (!game.lastTime) game.lastTime = time;
    const elapsed = time - game.lastTime;
    game.lastTime = time;
    game.nextSecond -= elapsed;
    if (game.nextSecond <= 0) {
      game.timeLeft -= 1;
      game.nextSecond += 1000;
      updateHud();
      if (game.timeLeft <= 0) {
        finishGame("Time is up. Press Start to chase snacks again.");
        draw();
        return;
      }
    }
    update(Math.min(elapsed / 1000, .032));
    draw();
    window.requestAnimationFrame(tick);
  }

  window.addEventListener("keydown", (event) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "w", "a", "s", "d"].includes(event.key)) {
      event.preventDefault();
    }
    if (event.key === " ") startGame();
    keys.add(event.key);
  });

  window.addEventListener("keyup", (event) => {
    keys.delete(event.key);
  });

  document.querySelectorAll("[data-move]").forEach((button) => {
    const move = button.getAttribute("data-move");
    const keyByMove = { up: "ArrowUp", left: "ArrowLeft", down: "ArrowDown", right: "ArrowRight" };
    button.addEventListener("pointerdown", () => keys.add(keyByMove[move]));
    button.addEventListener("pointerup", () => keys.delete(keyByMove[move]));
    button.addEventListener("pointerleave", () => keys.delete(keyByMove[move]));
  });

  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", resetGame);

  resetGame();
})();
