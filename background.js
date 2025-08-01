// Kuzey Işıkları & Yıldızlar Animasyonu - Dinamik Arka Plan
// Kod basitleştirilmiş ve optimize edilmiştir.
// Canvas API ile yıldızlar, kayan yıldızlar ve hareketli aurora ışıkları oluşturulur.

(() => {
  const canvas = document.getElementById("background");
  const ctx = canvas.getContext("2d");
  let width, height;

  // Yıldız sınıfı
  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.2 + 0.5;
      this.opacity = Math.random();
      this.opacitySpeed = 0.005 + Math.random() * 0.005;
      this.isIncreasing = Math.random() > 0.5;
    }
    update() {
      if (this.isIncreasing) {
        this.opacity += this.opacitySpeed;
        if (this.opacity >= 1) this.isIncreasing = false;
      } else {
        this.opacity -= this.opacitySpeed;
        if (this.opacity <= 0.2) this.isIncreasing = true;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
      ctx.shadowColor = 'rgba(255,255,255,0.8)';
      ctx.shadowBlur = 5;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Kayan yıldız sınıfı
  class ShootingStar {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height / 2;
      this.len = 80 + Math.random() * 50;
      this.speed = 8 + Math.random() * 6;
      this.size = 1 + Math.random() * 1;
      this.waitTime = 0;
      this.active = false;
    }
    update() {
      if (!this.active) {
        this.waitTime++;
        if (this.waitTime > 100 + Math.random() * 300) {
          this.active = true;
          this.waitTime = 0;
        }
      } else {
        this.x += this.speed;
        this.y += this.speed / 3;
        if (this.x > width || this.y > height) {
          this.reset();
          this.active = false;
        }
      }
    }
    draw() {
      if (!this.active) return;
      ctx.beginPath();
      const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.len, this.y - this.len / 3);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.strokeStyle = gradient;
      ctx.lineWidth = this.size;
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.len, this.y - this.len / 3);
      ctx.stroke();
    }
  }

  // Aurora ışıkları sınıfı
  class Aurora {
    constructor() {
      this.particles = [];
      this.colors = [
        'rgba(155, 255, 200, 0.3)',
        'rgba(180, 220, 255, 0.3)',
        'rgba(200, 180, 255, 0.3)',
        'rgba(130, 190, 180, 0.3)',
        'rgba(170, 240, 210, 0.3)'
      ];
      this.initParticles();
    }
    initParticles() {
      for (let i = 0; i < 40; i++) {
        this.particles.push({
          x: Math.random() * width,
          y: Math.random() * height / 2,
          radius: 50 + Math.random() * 80,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          phase: Math.random() * Math.PI * 2,
          speed: 0.001 + Math.random() * 0.002
        });
      }
    }
    update() {
      this.particles.forEach(p => {
        p.phase += p.speed;
      });
    }
    draw() {
      this.particles.forEach(p => {
        const yOffset = Math.sin(p.phase) * 40;
        const gradient = ctx.createRadialGradient(p.x, p.y + yOffset, 10, p.x, p.y + yOffset, p.radius);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y + yOffset, p.radius * 1.3, p.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }

  let stars = [];
  let shootingStars = [];
  let aurora;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function init() {
    resize();
    stars = [];
    shootingStars = [];
    aurora = new Aurora();

    for (let i = 0; i < 200; i++) {
      stars.push(new Star());
    }
    for (let i = 0; i < 5; i++) {
      shootingStars.push(new ShootingStar());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Aurora ışıkları
    aurora.update();
    aurora.draw();

    // Yıldızlar
    stars.forEach(s => {
      s.update();
      s.draw();
    });

    // Kayan yıldızlar
    shootingStars.forEach(s => {
      s.update();
      s.draw();
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    init();
  });

  init();
  animate();
})();
