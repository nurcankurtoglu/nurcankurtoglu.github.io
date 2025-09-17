// background.js (modern & professional version)
(function() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");

  let DPR = window.devicePixelRatio || 1;
  function resize() {
    DPR = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * DPR;
    canvas.height = window.innerHeight * DPR;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  // Gradient background
  function drawBackground() {
    const grad = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
    grad.addColorStop(0, "#0d1b2a"); // koyu lacivert
    grad.addColorStop(0.5, "#1b263b"); // mavi ton
    grad.addColorStop(1, "#000000"); // siyah
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }

  // Minimal particles
  const particles = [];
  const COUNT = Math.round((window.innerWidth * window.innerHeight) / 60000); // yoğunluk
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2
    });
  }

  function drawParticles() {
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = window.innerWidth;
      if (p.x > window.innerWidth) p.x = 0;
      if (p.y < 0) p.y = window.innerHeight;
      if (p.y > window.innerHeight) p.y = 0;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Animate
  function frame() {
    drawBackground();
    drawParticles();
    requestAnimationFrame(frame);
  }

  frame();
})();
