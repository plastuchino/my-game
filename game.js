const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

const player = { x: 180, y: 450, w: 40, h: 20, speed: 50};
let blocks = [];
let score = 0;
const keys = {};

addEventListener("keydown", (e) => (keys[e.key] = true));
addEventListener("keyup", (e) => (keys[e.key] = false));

function spawnBlock() {
  blocks.push({ x: Math.random() * (canvas.width - 30), y: -30, size: 30, speed: 2 + Math.random() * 3 });
}

function hits(a, b) {
  return a.x < b.x + b.size && a.x + a.w > b.x && a.y < b.y + b.size && a.y + a.h > b.y;
}

function loop() {
  if (keys.ArrowLeft) player.x -= player.speed;
  if (keys.ArrowRight) player.x += player.speed;
  player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));

  if (Math.random() < 0.03) spawnBlock();
  for (const b of blocks) b.y += b.speed;

  if (blocks.some((b) => hits(player, b))) {
    // Game over! Try adding lives or a high score.
    blocks = [];
    score = 0;
  }
  blocks = blocks.filter((b) => b.y < canvas.height);
  score++;
  scoreEl.textContent = Math.floor(score / 10);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffc42e";
  ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.fillStyle = "#ff5a5a";
  for (const b of blocks) ctx.fillRect(b.x, b.y, b.size, b.size);

  requestAnimationFrame(loop);
}

loop();
