// Hafif, profesyonel ve performans dostu yıldız animasyonu arka plan

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

const ctx = canvas.getContext('2d');
let width, height;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

class Star {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 1.5 + 0.3;
    this.alpha = Math.random();
    this.alphaChange = (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1);
  }
  update() {
    this.alpha += this.alphaChange;
    if (this.alpha <= 0) {
      this.alpha = 0;
      this.alphaChange = -this.alphaChange;
    } else if (this.alpha >= 1) {
      this.alpha = 1;
      this.alphaChange = -this.alphaChange;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.shadowColor = 'rgba(255,255,255,0.8)';
    ctx.shadowBlur = 5;
    ctx.fill();
  }
}

const starsCount = 120;
const stars = [];

for(let i=0; i<starsCount; i++) {
  stars.push(new Star());
}

function animate() {
  ctx.clearRect(0,0,width,height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}

animate();
