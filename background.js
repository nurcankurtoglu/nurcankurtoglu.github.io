const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 350;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Star {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.5 + 0.5;
    this.speed = Math.random() * 0.25 + 0.05;
    this.alpha = Math.random() * 0.7 + 0.3;
    this.alphaDirection = Math.random() > 0.5 ? 1 : -1;
  }
  update() {
    this.y += this.speed;
    if(this.y > canvas.height) this.y = 0;

    // Twinkle effect
    this.alpha += 0.008 * this.alphaDirection;
    if (this.alpha >= 1) this.alphaDirection = -1;
    else if (this.alpha <= 0.3) this.alphaDirection = 1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 8;
    ctx.fill();
  }
}

// Create stars
for(let i=0; i<STAR_COUNT; i++) {
  stars.push(new Star());
}

// Animate stars
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move stars slightly horizontally based on scroll
  const scrollY = window.scrollY || window.pageYOffset;
  for(let star of stars) {
    star.x += (scrollY * 0.0003) * (star.radius * 2); // subtle parallax effect
    if(star.x > canvas.width) star.x = 0;
    star.update();
    star.draw();
  }
  requestAnimationFrame(animate);
}
animate();

// Stars react to mouse movement
document.addEventListener('mousemove', e => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  stars.forEach(star => {
    const dx = star.x - mouseX;
    const dy = star.y - mouseY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if(dist < 120) {
      star.x += (dx / dist) * 0.6;
      star.y += (dy / dist) * 0.6;
    }
  });
});
