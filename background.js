const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

let stars = [];
let w, h;

function init() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.2,
      alpha: Math.random(),
      delta: Math.random() * 0.02
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  for (let star of stars) {
    star.alpha += star.delta;
    if (star.alpha <= 0 || star.alpha >= 1) {
      star.delta = -star.delta;
    }
    star.y += star.speed;
    if (star.y > h) star.y = 0;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();
