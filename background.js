const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 300;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Star {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = random(0, canvas.height);
    this.radius = random(0.6, 1.5);
    this.speed = random(0.15, 0.45);
    this.alpha = random(0.5, 1);
    this.alphaDirection = Math.random() > 0.5 ? 1 : -1;
  }
  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = random(0, canvas.width);
    }
    // twinkle effect
    this.alpha += 0.01 * this.alphaDirection;
    if (this.alpha >= 1) this.alphaDirection = -1;
    else if (this.alpha <= 0.5) this.alphaDirection = 1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 6;
    ctx.fill();
  }
}

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push(new Star());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    star.update();
    star.draw();
  }
  requestAnimationFrame(animate);
}
animate();

// Starfield reacts to mouse movement
document.addEventListener('mousemove', e => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  stars.forEach(star => {
    const dx = star.x - mouseX;
    const dy = star.y - mouseY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if(dist < 100){
      star.x += dx/dist * 0.5;
      star.y += dy/dist * 0.5;
    }
  });
});
