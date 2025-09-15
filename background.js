// starBackground.js
(() => {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = window.innerWidth * (1 - 0.3333333); // right panel width
  let leftOffset = window.innerWidth * 0.3333333;
  let height = window.innerHeight;

  function resize() {
    leftOffset = window.innerWidth * 0.3333333;
    width = Math.max(300, window.innerWidth - leftOffset);
    height = window.innerHeight;
    canvas.style.left = leftOffset + 'px';
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  // stars
  const stars = [];
  const STAR_COUNT = Math.floor(width * height / 8000); // density adaptive
  for (let i=0;i<STAR_COUNT;i++){
    stars.push({
      x: Math.random()*width,
      y: Math.random()*height,
      r: Math.random()*1.6+0.3,
      baseA: Math.random()*0.8+0.2,
      a: 0,
      speed: Math.random()*0.02+0.005
    });
  }

  // shooting stars
  const shooting = [];
  function spawnShooting(){
    shooting.push({
      x: Math.random()*width*0.5 + width*0.1,
      y: Math.random()*height*0.3 + 10,
      len: 120 + Math.random()*120,
      speed: 6 + Math.random()*6,
      life: 0
    });
    setTimeout(spawnShooting, 3000 + Math.random()*7000);
  }
  setTimeout(spawnShooting, 2000);

  // mouse interaction
  const mouse = {x: width/2, y: height/2};
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - leftOffset;
    mouse.y = e.clientY;
  });

  function draw() {
    // background subtle gradient (dark - bluish)
    const g = ctx.createLinearGradient(0,0,width, height);
    g.addColorStop(0, '#05060a');
    g.addColorStop(0.5, '#060617');
    g.addColorStop(1, '#051022');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,width,height);

    // aurora/glow subtle (soft, low alpha)
    const aur = ctx.createLinearGradient(0, height*0.15, width, height*0.45);
    aur.addColorStop(0, 'rgba(80,40,120,0.03)');
    aur.addColorStop(0.5, 'rgba(90,60,150,0.06)');
    aur.addColorStop(1, 'rgba(80,120,150,0.02)');
    ctx.fillStyle = aur;
    ctx.fillRect(0, 0, width, height*0.6);

    // stars twinkle
    for (let s of stars){
      s.a += s.speed;
      const alpha = s.baseA * (0.6 + 0.4*Math.sin(s.a));
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();

      // slight parallax toward mouse
      const dx = (mouse.x - width/2) * 0.0005 * s.r;
      const dy = (mouse.y - height/2) * 0.0005 * s.r;
      s.x += dx; s.y += dy;
      // wrap
      if (s.x < -10) s.x = width + 10;
      if (s.x > width + 10) s.x = -10;
      if (s.y < -10) s.y = height + 10;
      if (s.y > height + 10) s.y = -10;
    }

    // shooting stars
    for (let i = shooting.length-1; i>=0; i--){
      const st = shooting[i];
      st.x += st.speed;
      st.y += st.speed*0.4;
      st.life += 1;
      ctx.beginPath();
      const grad = ctx.createLinearGradient(st.x, st.y, st.x - st.len, st.y - st.len*0.3);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.moveTo(st.x, st.y);
      ctx.lineTo(st.x - st.len, st.y - st.len*0.3);
      ctx.stroke();
      if (st.x > width + 200 || st.y > height + 200 || st.life>200) shooting.splice(i,1);
    }

    requestAnimationFrame(draw);
  }

  draw();
})();
