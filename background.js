const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}
resize();
window.addEventListener('resize', resize);

const stars = [];
const STAR_COUNT = 120;

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * 1.2 + 0.3,
    dx: (Math.random() - 0.5) * 0.2,
    dy: (Math.random() - 0.5) * 0.2,
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#cde3f3';

  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    star.x += star.dx;
    star.y += star.dy;

    if (star.x < 0 || star.x > w) star.dx *= -1;
    if (star.y < 0 || star.y > h) star.dy *= -1;
  });

  requestAnimationFrame(animate);
}
animate();
