(() => {
  const boardEl = document.querySelector('#chessboard');
  const statusEl = document.querySelector('#status-label');
  const evalTextEl = document.querySelector('#evaluation-text');
  const evalFillEl = document.querySelector('#eval-fill');
  const insightEl = document.querySelector('#insight-copy');
  const capturedEl = document.querySelector('#captured-pieces');
  const captureCountEl = document.querySelector('#capture-count');
  const moveCountEl = document.querySelector('#move-count');
  const moveListEl = document.querySelector('#move-list');
  const footerTurnEl = document.querySelector('#footer-turn');
  const clockEl = document.querySelector('#clock');
  const toastEl = document.querySelector('#toast');
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const symbols = { white: { k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' }, black: { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' } };
  const values = { p: 1, n: 3.2, b: 3.3, r: 5, q: 9, k: 0 };
  const labels = { p: '', n: 'N', b: 'B', r: 'R', q: 'Q', k: 'K' };
  let board, turn, selected, legalTargets, flipped, mode, history, captured, lastMove, moveRecords, rights, enPassant, gameOver, aiTimer, seconds, clockTimer, soundOn;

  const makePiece = (color, type) => ({ color, type });
  const freshBoard = () => {
    const b = Array.from({ length: 8 }, () => Array(8).fill(null));
    const back = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
    back.forEach((type, x) => { b[0][x] = makePiece('black', type); b[1][x] = makePiece('black', 'p'); b[6][x] = makePiece('white', 'p'); b[7][x] = makePiece('white', type); });
    return b;
  };
  const cloneBoard = b => b.map(row => row.map(p => p ? { ...p } : null));
  const cloneRights = () => ({ ...rights });
  const inside = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;
  const opponent = color => color === 'white' ? 'black' : 'white';
  const squareName = (x, y) => files[x] + (8 - y);

  function addRayMoves(b, moves, x, y, dx, dy, color) {
    let nx = x + dx, ny = y + dy;
    while (inside(nx, ny)) {
      if (!b[ny][nx]) moves.push({ x, y, toX: nx, toY: ny });
      else { if (b[ny][nx].color !== color) moves.push({ x, y, toX: nx, toY: ny }); break; }
      nx += dx; ny += dy;
    }
  }

  function pseudoMoves(b, x, y) {
    const p = b[y][x];
    if (!p) return [];
    const moves = [];
    const enemy = opponent(p.color);
    if (p.type === 'p') {
      const dir = p.color === 'white' ? -1 : 1;
      const start = p.color === 'white' ? 6 : 1;
      const promotion = p.color === 'white' ? 0 : 7;
      if (inside(x, y + dir) && !b[y + dir][x]) {
        moves.push({ x, y, toX: x, toY: y + dir, promotion: y + dir === promotion ? 'q' : null });
        if (y === start && !b[y + dir * 2][x]) moves.push({ x, y, toX: x, toY: y + dir * 2, doublePawn: true });
      }
      [-1, 1].forEach(dx => {
        const nx = x + dx, ny = y + dir;
        if (!inside(nx, ny)) return;
        if (b[ny][nx] && b[ny][nx].color === enemy) moves.push({ x, y, toX: nx, toY: ny, promotion: ny === promotion ? 'q' : null });
        if (enPassant && enPassant.x === nx && enPassant.y === ny) moves.push({ x, y, toX: nx, toY: ny, enPassant: true });
      });
    }
    if (p.type === 'n') [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]].forEach(([dx, dy]) => { const nx = x + dx, ny = y + dy; if (inside(nx, ny) && (!b[ny][nx] || b[ny][nx].color === enemy)) moves.push({ x, y, toX: nx, toY: ny }); });
    if (p.type === 'b' || p.type === 'q') [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([dx, dy]) => addRayMoves(b, moves, x, y, dx, dy, p.color));
    if (p.type === 'r' || p.type === 'q') [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => addRayMoves(b, moves, x, y, dx, dy, p.color));
    if (p.type === 'k') {
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) if ((dx || dy) && inside(x + dx, y + dy) && (!b[y + dy][x + dx] || b[y + dy][x + dx].color === enemy)) moves.push({ x, y, toX: x + dx, toY: y + dy });
      const home = p.color === 'white' ? 7 : 0;
      if (x === 4 && y === home && !isInCheck(b, p.color)) {
        if (rights[p.color + 'K'] && !b[home][5] && !b[home][6] && b[home][7]?.type === 'r' && b[home][7]?.color === p.color && !isSquareAttacked(b, 5, home, enemy) && !isSquareAttacked(b, 6, home, enemy)) moves.push({ x, y, toX: 6, toY: home, castle: 'K' });
        if (rights[p.color + 'Q'] && !b[home][1] && !b[home][2] && !b[home][3] && b[home][0]?.type === 'r' && b[home][0]?.color === p.color && !isSquareAttacked(b, 3, home, enemy) && !isSquareAttacked(b, 2, home, enemy)) moves.push({ x, y, toX: 2, toY: home, castle: 'Q' });
      }
    }
    return moves;
  }

  function isSquareAttacked(b, x, y, byColor) {
    const pawnY = y + (byColor === 'white' ? 1 : -1);
    for (const dx of [-1, 1]) if (inside(x + dx, pawnY) && b[pawnY][x + dx]?.color === byColor && b[pawnY][x + dx]?.type === 'p') return true;
    for (const [dx, dy] of [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]]) if (inside(x + dx, y + dy) && b[y + dy][x + dx]?.color === byColor && b[y + dy][x + dx]?.type === 'n') return true;
    for (const [dx, dy, types] of [[1, 0, ['r', 'q']], [-1, 0, ['r', 'q']], [0, 1, ['r', 'q']], [0, -1, ['r', 'q']], [1, 1, ['b', 'q']], [1, -1, ['b', 'q']], [-1, 1, ['b', 'q']], [-1, -1, ['b', 'q']]]) {
      let nx = x + dx, ny = y + dy;
      while (inside(nx, ny)) { const target = b[ny][nx]; if (target) { if (target.color === byColor && types.includes(target.type)) return true; break; } nx += dx; ny += dy; }
    }
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) if ((dx || dy) && inside(x + dx, y + dy) && b[y + dy][x + dx]?.color === byColor && b[y + dy][x + dx]?.type === 'k') return true;
    return false;
  }

  function findKing(b, color) { for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) if (b[y][x]?.color === color && b[y][x]?.type === 'k') return { x, y }; return null; }
  function isInCheck(b, color) { const king = findKing(b, color); return king ? isSquareAttacked(b, king.x, king.y, opponent(color)) : true; }
  function executeMove(b, m) {
    const moving = b[m.y][m.x];
    b[m.toY][m.toX] = moving;
    b[m.y][m.x] = null;
    if (m.enPassant) b[m.y][m.toX] = null;
    if (m.castle === 'K') { b[m.y][5] = b[m.y][7]; b[m.y][7] = null; }
    if (m.castle === 'Q') { b[m.y][3] = b[m.y][0]; b[m.y][0] = null; }
    if (m.promotion) b[m.toY][m.toX] = makePiece(moving.color, m.promotion);
  }
  function legalMovesFor(b, x, y) {
    const p = b[y][x]; if (!p) return [];
    return pseudoMoves(b, x, y).filter(m => { const test = cloneBoard(b); executeMove(test, m); return !isInCheck(test, p.color); });
  }
  function allLegalMoves(b, color) { const moves = []; for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) if (b[y][x]?.color === color) moves.push(...legalMovesFor(b, x, y)); return moves; }
  function updateRights(m, moving, taken) {
    if (moving.type === 'k') { rights[moving.color + 'K'] = false; rights[moving.color + 'Q'] = false; }
    if (moving.type === 'r') { if (m.x === 0) rights[moving.color + 'Q'] = false; if (m.x === 7) rights[moving.color + 'K'] = false; }
    if (taken?.type === 'r') { if (m.toX === 0) rights[taken.color + 'Q'] = false; if (m.toX === 7) rights[taken.color + 'K'] = false; }
  }
  function notation(m, moving, taken) { return `${labels[moving.type]}${taken || m.enPassant ? squareName(m.x, m.y) + '×' : ''}${squareName(m.toX, m.toY)}${m.promotion ? '=Q' : ''}${m.castle === 'K' ? ' O-O' : m.castle === 'Q' ? ' O-O-O' : ''}`; }
  function evaluate() { let score = 0; board.flat().forEach(p => { if (p) score += (p.color === 'white' ? 1 : -1) * values[p.type]; }); return Math.max(-4, Math.min(4, score)); }
  function showToast(message) { toastEl.textContent = message; toastEl.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toastEl.classList.remove('show'), 2400); }
  function playClick() { if (soundOn) { try { const ctx = new AudioContext(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.frequency.value = 240; gain.gain.value = .025; osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + .045); } catch (_) {} } }
  function render() {
    boardEl.innerHTML = '';
    const inCheck = isInCheck(board, turn);
    for (let row = 0; row < 8; row++) for (let col = 0; col < 8; col++) {
      const x = flipped ? 7 - col : col, y = flipped ? 7 - row : row, p = board[y][x];
      const square = document.createElement('button'); square.type = 'button'; square.className = `square ${(x + y) % 2 ? 'dark' : 'light'}`; square.dataset.x = x; square.dataset.y = y; square.setAttribute('role', 'gridcell');
      square.setAttribute('aria-label', `${squareName(x, y)}${p ? ` ${p.color} ${p.type}` : ''}`);
      if (lastMove && ((lastMove.x === x && lastMove.y === y) || (lastMove.toX === x && lastMove.toY === y))) square.classList.add('last-move');
      if (selected && selected.x === x && selected.y === y) square.classList.add('selected');
      if (legalTargets.some(m => m.toX === x && m.toY === y)) square.classList.add('target');
      if (p) square.classList.add('has-piece');
      if (p?.type === 'k' && p.color === turn && inCheck) square.classList.add('check');
      if ((flipped ? x === 7 : x === 0)) { const rank = document.createElement('span'); rank.className = 'coord rank'; rank.textContent = 8 - y; square.appendChild(rank); }
      if ((flipped ? y === 0 : y === 7)) { const file = document.createElement('span'); file.className = 'coord file'; file.textContent = files[x]; square.appendChild(file); }
      if (p) { const pieceEl = document.createElement('span'); pieceEl.className = `piece ${p.color === 'white' ? 'light-piece' : ''}`; pieceEl.textContent = symbols[p.color][p.type]; pieceEl.setAttribute('aria-hidden', 'true'); square.appendChild(pieceEl); }
      square.addEventListener('click', () => clickSquare(x, y)); boardEl.appendChild(square);
    }
    const score = evaluate(); evalTextEl.textContent = `${score >= 0 ? '+' : ''}${score.toFixed(1)}`; evalFillEl.style.width = `${50 + score * 8}%`;
    capturedEl.innerHTML = captured.length ? captured.map(p => `<span class="captured-${p.color}">${symbols[p.color][p.type]}</span>`).join('') : '—'; captureCountEl.textContent = captured.length;
    moveCountEl.textContent = moveRecords.length; moveListEl.innerHTML = moveRecords.length ? moveRecords.map(m => `<li>${m}</li>`).join('') : '<li class="empty-moves">Your first move starts the story.</li>';
    footerTurnEl.textContent = `${turn.toUpperCase()} TO MOVE`;
  }
  function updateStatus() {
    const moves = allLegalMoves(board, turn), check = isInCheck(board, turn);
    if (!moves.length) { gameOver = true; statusEl.textContent = check ? `${opponent(turn).toUpperCase()} WINS` : 'STALEMATE'; insightEl.textContent = check ? 'A clean finish. Reset the board and look for the moment the attack began.' : 'No legal moves remain, but the king is safe. A precise draw.'; showToast(check ? `${opponent(turn) === 'white' ? 'You win' : 'Caissa wins'} by checkmate.` : 'Stalemate — the position is drawn.'); return; }
    if (check) { statusEl.textContent = 'CHECK'; insightEl.textContent = 'Your king is under pressure. Find a forcing response before building your next idea.'; }
    else if (mode === 'engine' && turn === 'black') { statusEl.textContent = 'ENGINE THINKING'; insightEl.textContent = 'Caissa is scanning the position for the most principled continuation.'; }
    else { statusEl.textContent = turn === 'white' ? 'YOUR MOVE' : 'BLACK TO MOVE'; insightEl.textContent = moveRecords.length > 8 ? 'The position is taking shape. Look for loose pieces and candidate checks.' : 'The center is still open. Develop with purpose and keep your king safe.'; }
  }
  function clickSquare(x, y) {
    if (gameOver || (mode === 'engine' && turn === 'black')) return;
    const p = board[y][x];
    if (selected) {
      const move = legalTargets.find(m => m.toX === x && m.toY === y);
      if (move) { performMove(move); return; }
      if (p?.color === turn) { selected = { x, y }; legalTargets = legalMovesFor(board, x, y); render(); return; }
      selected = null; legalTargets = []; render(); return;
    }
    if (p?.color === turn) { selected = { x, y }; legalTargets = legalMovesFor(board, x, y); render(); }
  }
  function performMove(m, fromEngine = false) {
    const moving = board[m.y][m.x]; const taken = m.enPassant ? board[m.y][m.toX] : board[m.toY][m.toX];
    history.push({ board: cloneBoard(board), turn, rights: cloneRights(), enPassant: enPassant ? { ...enPassant } : null, captured: captured.slice(), lastMove, moveRecords: moveRecords.slice(), seconds });
    const moveText = notation(m, moving, taken); updateRights(m, moving, taken); executeMove(board, m);
    if (taken) captured.push({ ...taken }); enPassant = m.doublePawn ? { x: m.toX, y: (m.y + m.toY) / 2 } : null; lastMove = { ...m }; moveRecords.push(moveText); turn = opponent(turn); selected = null; legalTargets = []; playClick(); render(); updateStatus();
    if (!gameOver && mode === 'engine' && turn === 'black' && !fromEngine) { clearTimeout(aiTimer); aiTimer = setTimeout(engineMove, 600); }
  }
  function engineMove() {
    if (gameOver || mode !== 'engine' || turn !== 'black') return;
    const moves = allLegalMoves(board, 'black');
    const scored = moves.map(m => { const capturedPiece = m.enPassant ? board[m.y][m.toX] : board[m.toY][m.toX]; const test = cloneBoard(board); executeMove(test, m); let score = capturedPiece ? values[capturedPiece.type] * 3 : 0; if (isInCheck(test, 'white')) score += 1.3; if (m.toY >= 3 && m.toY <= 4) score += .15; score += Math.random() * .32; return { m, score }; }).sort((a, b) => b.score - a.score);
    performMove(scored[0].m, true);
  }
  function resetGame(notify = false) {
    clearTimeout(aiTimer); board = freshBoard(); turn = 'white'; selected = null; legalTargets = []; flipped = false; history = []; captured = []; lastMove = null; moveRecords = []; rights = { whiteK: true, whiteQ: true, blackK: true, blackQ: true }; enPassant = null; gameOver = false; seconds = 600; render(); updateStatus(); updateClock(); if (notify) showToast('New game ready. Your move.');
  }
  function undoMove() {
    clearTimeout(aiTimer); if (!history.length) { showToast('There is no move to undo yet.'); return; }
    const snapshot = history.pop(); ({ board, turn, rights, enPassant, captured, lastMove, moveRecords, seconds } = snapshot); selected = null; legalTargets = []; gameOver = false;
    if (mode === 'engine' && turn === 'black' && history.length) { const second = history.pop(); ({ board, turn, rights, enPassant, captured, lastMove, moveRecords, seconds } = second); }
    render(); updateStatus(); updateClock(); showToast('Move undone.');
  }
  function updateClock() { clockEl.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; }
  function selectMode(nextMode) { mode = nextMode; document.querySelectorAll('.mode-button').forEach(button => button.classList.toggle('active', button.dataset.mode === mode)); resetGame(); showToast(mode === 'engine' ? 'Caissa is ready. You play white.' : 'Local match ready. Take turns at the board.'); }

  document.querySelector('#reset-game').addEventListener('click', () => resetGame(true));
  document.querySelector('#flip-board').addEventListener('click', () => { flipped = !flipped; render(); showToast(flipped ? 'Board flipped.' : 'Board restored.'); });
  document.querySelector('#sound-toggle').addEventListener('click', event => { soundOn = !soundOn; event.currentTarget.setAttribute('aria-pressed', String(soundOn)); event.currentTarget.textContent = soundOn ? '♫' : '⌁'; showToast(soundOn ? 'Move sounds on.' : 'Move sounds off.'); });
  document.querySelectorAll('.mode-button').forEach(button => button.addEventListener('click', () => selectMode(button.dataset.mode)));
  document.querySelectorAll('.tab').forEach((tab, index) => tab.addEventListener('click', () => { document.querySelectorAll('.tab').forEach((other, otherIndex) => { other.classList.toggle('active', otherIndex === index); other.setAttribute('aria-selected', String(otherIndex === index)); }); document.querySelector('.position-panel').hidden = index !== 0; document.querySelector('.moves-panel').hidden = index !== 1; }));
  document.querySelector('#reset-game').insertAdjacentHTML('afterend', '<button type="button" id="undo-game" aria-label="Undo last move">↶</button>');
  document.querySelector('#undo-game').addEventListener('click', undoMove);
  soundOn = false; mode = 'engine'; clockTimer = setInterval(() => { if (!gameOver && turn === 'white' && seconds > 0) { seconds--; updateClock(); } }, 1000);
  resetGame();
})();
