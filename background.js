const canvas = document.getElementById('background-canvas');
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

// Aurora partikülleri
class AuroraParticle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 100 + 60;
        this.alpha = 0.05 + Math.random() * 0.1;
        this.dx = (Math.random() - 0.5) * 0.2;
        this.dy = (Math.random() - 0.5) * 0.2;
        this.color = `hsla(${Math.random() * 140 + 180}, 80%, 70%, ${this.alpha})`;
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < -this.radius) this.x = width + this.radius;
        else if (this.x > width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;
        else if (this.y > height + this.radius) this.y = -this.radius;
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

const particlesCount = 40;
const particles = [];

for(let i=0; i < particlesCount; i++) {
    particles.push(new AuroraParticle());
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    for(let p of particles) {
        p.update();
        p.draw();
    }
    requestAnimationFrame(animate);
}

animate();
