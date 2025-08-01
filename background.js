const canvas = document.createElement("canvas");
document.getElementById("background").appendChild(canvas);
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let hue = 240;
function draw() {
  ctx.fillStyle = `hsla(${hue}, 100%, 5%, 0.1)`;
  ctx.fillRect(0, 0, w, h);
  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.4)`);
  gradient.addColorStop(1, `hsla(${hue + 80}, 100%, 60%, 0.4)`);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, Math.random() * 400 + 200, 0, Math.PI * 2);
  ctx.fill();
  hue = (hue + 0.2) % 360;
  requestAnimationFrame(draw);
}
draw();
