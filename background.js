const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function init() {
  resize();
  createStars(150);
  animate();
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', resize);

function createStars(count) {
  stars = [];
  for(let i=0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.5,
      alpha: Math.random(),
      alphaChange: (Math.random() * 0.02) + 0.005
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  for(let star of stars) {
    star.alpha += star.alphaChange;
    if(star.alpha <= 0 || star.alpha >= 1) star.alphaChange *= -1;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
    ctx.shadowBlur = 8;
    ctx.fill();
  }
  requestAnimationFrame(animate);
}

init();
