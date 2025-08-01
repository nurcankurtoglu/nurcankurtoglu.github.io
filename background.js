const canvas = document.getElementById('auroraCanvas');
const ctx = canvas.getContext('2d');

let w, h;
function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}
resize();
window.addEventListener('resize', resize);

// Kuzey ışıkları bandı sınıfı
class AuroraBand {
  constructor(color, speed, amplitude, yBase) {
    this.color = color;
    this.speed = speed;
    this.amplitude = amplitude;
    this.yBase = yBase;
    this.offset = 0;
  }

  update() {
    this.offset += this.speed;
  }

  draw(ctx) {
    const gradient = ctx.createLinearGradient(0, this.yBase - this.amplitude, 0, this.yBase + this.amplitude);
    gradient.addColorStop(0, 'rgba(100, 200, 255, 0.3)');
    gradient.addColorStop(0.5, this.color);
    gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');

    ctx.fillStyle = gradient;

    ctx.beginPath();
    const waveCount = 5;
    const waveLength = w / waveCount;
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 10) {
      let y = this.yBase + Math.sin((x / waveLength + this.offset) * Math.PI * 2) * this.amplitude;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }
}

// Yıldız sınıfı
class Star {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h * 0.8;
    this.size = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.8 + 0.2;
    this.alphaChange = (Math.random() * 0.01) + 0.002;
  }
  update() {
    this.alpha += this.alphaChange;
    if (this.alpha > 1 || this.alpha < 0.3) this.alphaChange *= -1;
  }
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Kayan yıldız sınıfı
class ShootingStar {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h * 0.5;
    this.len = Math.random() * 100 + 50;
    this.speed = Math.random() * 10 + 8;
    this.size = Math.random() * 1.5 + 0.5;
    this.waitTime = 0;
    this.alpha = 0;
    this.active = false;
  }
  update() {
    if (this.active) {
      this.x += this.speed;
      this.y += this.speed / 3;
      this.alpha -= 0.02;
      if (this.alpha <= 0) this.reset();
    } else {
      this.waitTime++;
      if (this.waitTime > 100 + Math.random() * 300) {
        this.active = true;
        this.alpha = 1;
      }
    }
  }
  draw(ctx) {
    if (!this.active) return;
    ctx.save();
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.lineWidth = this.size;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.len, this.y - this.len / 3);
    ctx.stroke();
    ctx.restore();
  }
}

// Aurora ve yıldız objeleri oluştur
const auroraBands = [
  new AuroraBand('rgba(100, 255, 220, 0.5)', 0.002, 80, h * 0.65),
  new AuroraBand('rgba(150, 200, 255, 0.3)', 0.0015, 50, h * 0.7),
  new AuroraBand('rgba(200, 180, 255, 0.4)', 0.0018, 60, h * 0.75),
];

const stars = [];
for (let i = 0; i < 200; i++) stars.push(new Star());

const shootingStars = [];
for (let i = 0; i < 3; i++) shootingStars.push(new ShootingStar());

function animate() {
  ctx.clearRect(0, 0, w, h);

  // Yıldızları çiz
  stars.forEach(s => {
    s.update();
    s.draw(ctx);
  });

  // Kayan yıldızları çiz
  shootingStars.forEach(s => {
    s.update();
    s.draw(ctx);
  });

  // Kuzey ışıkları bantlarını çiz (en sona, önde olsun diye)
  auroraBands.forEach(band => {
    band.update();
    band.draw(ctx);
  });

  requestAnimationFrame(animate);
}

animate();
