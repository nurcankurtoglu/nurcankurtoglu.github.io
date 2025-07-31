// background.js

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

const ctx = canvas.getContext('2d');

let stars = [];
let width, height;

function init() {
  resize();
  stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.3 + 0.2,
      alpha: Math.random(),
      alphaSpeed: 0.005 + Math.random() * 0.01
    });
  }
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  for (let star of stars) {
    star.alpha += star.alphaSpeed;
    if (star.alpha <= 0) {
      star.alpha = 0;
      star.alphaSpeed = -star.alphaSpeed;
    } else if (star.alpha >= 1) {
      star.alpha = 1;
      star.alphaSpeed = -star.alphaSpeed;
    }
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resize();
  init();
});

init();
animate();
