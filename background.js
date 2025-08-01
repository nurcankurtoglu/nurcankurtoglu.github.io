const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let W, H;
function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
}
resize();
window.addEventListener('resize', resize);

/* Aurora dalga objesi */
class Aurora {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W;
    this.y = H + Math.random() * 200;
    this.width = 150 + Math.random() * 150;
    this.height = 400 + Math.random() * 400;
    this.amplitude = 15 + Math.random() * 20;
    this.phase = Math.random() * Math.PI * 2;
    this.speed = 0.4 + Math.random() * 0.8;
    this.color = `rgba(140, 120, 255, 0.15)`;
  }
  update() {
    this.y -= this.speed;
    if (this.y + this.height < 0) this.reset();
    this.phase += 0.015;
  }
  draw() {
    const grad = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.height);
    grad.addColorStop(0, 'rgba(140, 120, 255, 0)');
    grad.addColorStop(0.3, this.color);
    grad.addColorStop(0.7, 'rgba(180, 160, 255, 0.3)');
    grad.addColorStop(1, 'rgba(140, 120, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(
      this.x + this.amplitude * Math.sin(this.phase), this.y + this.height / 3,
      this.x - this.amplitude * Math.sin(this.phase), this.y + (2 * this.height) / 3,
      this.x, this.y + this.height
    );
    ctx.closePath();
    ctx.fill();
  }
}

/* Yıldız objesi */
class Star {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.radius = Math.random() * 1.3 + 0.3;
    this.brightness = 0.6 + Math.random() * 0.4;
    this.twinkleSpeed = 0.02 + Math.random() * 0.03;
    this.phase = Math.random() * Math.PI * 2;
  }
  update() {
    this.phase += this.twinkleSpeed;
  }
  draw() {
    const alpha = this.brightness * (0.5 + 0.5 * Math.sin(this.phase));
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const auroras = [];
const stars = [];
const AURORA_COUNT = 20;
const STAR_COUNT = 120;

for (let i = 0; i < AURORA_COUNT; i++) auroras.push(new Aurora());
for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());

function animate() {
  ctx.clearRect(0, 0, W, H);

  // Gece gökyüzü degrade arka plan
  const bgGradient = ctx.createLinearGradient(0, 0, 0, H);
  bgGradient.addColorStop(0, '#0a001f');
  bgGradient.addColorStop(1, '#020006');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, W, H);

  auroras.forEach((a) => {
    a.update();
    a.draw();
  });
  stars.forEach((s) => {
    s.update();
    s.draw();
  });

  requestAnimationFrame(animate);
}
animate();
