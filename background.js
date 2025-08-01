const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let width, height;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

resize();

window.addEventListener('resize', resize);

class AuroraParticle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = 70 + Math.random() * 90;
    this.color = `hsla(${160 + Math.random() * 80}, 80%, 60%, 0.12)`;
    this.speedY = 0.1 + Math.random() * 0.3;
    this.amplitude = 100 + Math.random() * 150;
    this.phase = Math.random() * 2 * Math.PI;
  }
  update() {
    this.y -= this.speedY;
    if (this.y < -this.radius) this.y = height + this.radius;
    this.phase += 0.005;
    this.x += Math.sin(this.phase) * 0.5;
  }
  draw() {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

class StarParticle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 1.5 + 0.5;
    this.brightness = 0.5 + Math.random() * 0.5;
    this.twinkleSpeed = 0.02 + Math.random() * 0.02;
    this.twinklePhase = Math.random() * 2 * Math.PI;
  }
  update() {
    this.twinklePhase += this.twinkleSpeed;
  }
  draw() {
    const alpha = 0.5 + Math.sin(this.twinklePhase) * 0.5;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * this.brightness})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const auroraParticles = [];
const starParticles = [];
const AURORA_COUNT = 30;
const STAR_COUNT = 100;

for (let i = 0; i < AURORA_COUNT; i++) {
  auroraParticles.push(new AuroraParticle());
}
for (let i = 0; i < STAR_COUNT; i++) {
  starParticles.push(new StarParticle());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  
  // Background Gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#0a0a1a');
  gradient.addColorStop(1, '#1b113a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Draw Aurora & Stars
  auroraParticles.forEach(p => {
    p.update();
    p.draw();
  });
  starParticles.forEach(s => {
    s.update();
    s.draw();
  });

  requestAnimationFrame(animate);
}

animate();
