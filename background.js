// background.js
(function() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d', { alpha: true });

  // optional sound
  const starSound = document.getElementById('star-sound'); // may be null if not provided

  let DPR = Math.max(1, window.devicePixelRatio || 1);
  function resize() {
    DPR = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(window.innerWidth * DPR);
    canvas.height = Math.floor(window.innerHeight * DPR);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  // Star field
  const STARS = Math.round((window.innerWidth * window.innerHeight) / 15000); // density scale
  const stars = [];
  for (let i=0;i<STARS;i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.4,
      baseR: 0,
      hue: Math.random() * 360,
      alpha: Math.random() * 0.9 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      vx: (Math.random()-0.5) * 0.02,
      vy: (Math.random()*0.1)+0.02
    });
  }

  // Aurora layers (several sin waves)
  const auroras = [];
  for(let i=0;i<3;i++){
    auroras.push({
      offsetY: window.innerHeight * (0.2 + i*0.08),
      amplitude: 40 + Math.random()*80,
      frequency: 0.0008 + Math.random()*0.0005,
      phase: Math.random()*Math.PI*2,
      speed: 0.0004 + Math.random()*0.0006,
      color: i===0? 'rgba(100,255,200,0.06)' : (i===1? 'rgba(80,150,255,0.05)' : 'rgba(180,120,255,0.03)')
    });
  }

  // clouds (soft, low opacity)
  const clouds = [];
  const CLOUD_COUNT = 5;
  for(let i=0;i<CLOUD_COUNT;i++){
    clouds.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.6,
      size: 0.6 + Math.random()*1.6,
      speed: 0.2 + Math.random() * 0.6,
      alpha: 0.03 + Math.random()*0.06
    });
  }

  // Moon
  const moon = {
    x: window.innerWidth * 0.78,
    y: window.innerHeight * 0.18,
    r: Math.min(70, window.innerWidth * 0.06),
    phase: 0.0
  };

  // helper: draw radial glow
  function radialGlow(x,y,r, color, intensity) {
    const g = ctx.createRadialGradient(x,y,0,x,y,r);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fill();
  }

  // star burst pool for interactions
  const bursts = [];

  // draw loop
  let last = performance.now();
  function frame(t) {
    const dt = Math.min(60, t - last) / 1000;
    last = t;

    // clear
    ctx.clearRect(0,0,canvas.width/DPR, canvas.height/DPR);

    // sky gradient (deep polar night)
    const grad = ctx.createLinearGradient(0,0,0,window.innerHeight);
    grad.addColorStop(0, '#071427'); // very dark blue
    grad.addColorStop(0.45, '#031022');
    grad.addColorStop(1, '#000000');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,window.innerWidth, window.innerHeight);

    // subtle horizon fog (cold glow)
    const fog = ctx.createLinearGradient(0, window.innerHeight*0.55, 0, window.innerHeight);
    fog.addColorStop(0, 'rgba(10,18,30,0.18)');
    fog.addColorStop(1, 'rgba(0,0,0,0.7)');
    ctx.fillStyle = fog;
    ctx.fillRect(0, window.innerHeight*0.55, window.innerWidth, window.innerHeight*0.45);

    // draw aurora layers (sliding sin waves)
    auroras.forEach((a, idx) => {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.beginPath();
      const amplitude = a.amplitude;
      const freq = a.frequency;
      const phase = a.phase + t * a.speed;
      ctx.moveTo(0, a.offsetY);
      for (let x=0;x<=window.innerWidth;x+=8) {
        const y = a.offsetY + Math.sin((x * freq * 2*Math.PI) + phase) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(window.innerWidth, window.innerHeight);
      ctx.lineTo(0, window.innerHeight);
      ctx.closePath();

      const g = ctx.createLinearGradient(0,a.offsetY,0,a.offsetY+300);
      g.addColorStop(0, a.color);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
    });

    // draw moving faint clouds (very subtle for night)
    clouds.forEach(c=>{
      c.x += c.speed * dt * 30;
      if(c.x > window.innerWidth + 200) c.x = -300 - Math.random()*200;
      const cx = c.x, cy = c.y;
      ctx.save();
      ctx.globalAlpha = c.alpha;
      ctx.fillStyle = 'rgba(220,230,255,0.06)';
      // draw 3 overlapping ellipses to form a cloud
      ctx.beginPath();
      ctx.ellipse(cx, cy, 120*c.size, 40*c.size, 0, 0, Math.PI*2);
      ctx.ellipse(cx+60*c.size, cy-10*c.size, 90*c.size, 34*c.size, 0,0,Math.PI*2);
      ctx.ellipse(cx-60*c.size, cy-8*c.size, 90*c.size, 34*c.size, 0,0,Math.PI*2);
      ctx.fill();
      ctx.restore();
    });

    // moon & moon glow
    radialGlow(moon.x, moon.y, moon.r*5, 'rgba(220,230,255,0.06)');
    // moon disk
    ctx.beginPath();
    ctx.fillStyle = '#f1f3f8';
    ctx.arc(moon.x, moon.y, moon.r, 0, Math.PI*2);
    ctx.fill();
    // slight crescent shadow for realism
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.arc(moon.x + moon.r*0.32, moon.y - moon.r*0.06, moon.r*0.98, 0, Math.PI*2);
    ctx.fill();

    // draw stars (twinkling + slow fall)
    stars.forEach(s => {
      // twinkle
      s.alpha += Math.sin(t * s.twinkleSpeed + s.hue) * 0.002;
      s.alpha = Math.max(0.05, Math.min(1, s.alpha));
      // motion
      s.x += s.vx * dt * 60;
      s.y += s.vy * dt * 60;
      if (s.y > window.innerHeight + 10) {
        s.y = -10;
        s.x = Math.random() * window.innerWidth;
      }
      if (s.x < -10) s.x = window.innerWidth + 10;
      if (s.x > window.innerWidth + 10) s.x = -10;

      // draw star (colored hue but subtle)
      const hue = (s.hue + Math.sin(t*0.0006 + s.hue) * 20) % 360;
      ctx.beginPath();
      // small radial gradient for each star
      const rg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r*3);
      rg.addColorStop(0, `hsla(${hue}, 90%, 85%, ${s.alpha})`);
      rg.addColorStop(0.5, `rgba(255,255,255,${s.alpha*0.8})`);
      rg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = rg;
      ctx.arc(s.x, s.y, s.r*2.4, 0, Math.PI*2);
      ctx.fill();
    });

    // bursts (from interactions) draw and age
    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i];
      b.life -= dt;
      if (b.life <= 0) { bursts.splice(i,1); continue; }
      const progress = 1 - (b.life / b.maxLife);
      // expanding ring
      ctx.beginPath();
      const ringR = b.r * (1 + progress * 4);
      ctx.lineWidth = 2 * (1 - progress);
      ctx.strokeStyle = `rgba(200,240,255, ${0.6 * (1 - progress)})`;
      ctx.arc(b.x, b.y, ringR, 0, Math.PI*2);
      ctx.stroke();
      // central sparkles
      for(let k=0;k<6;k++){
        const ang = (k/6) * Math.PI*2 + progress * 4;
        const px = b.x + Math.cos(ang) * (10 + progress * 30);
        const py = b.y + Math.sin(ang) * (10 + progress * 30);
        ctx.beginPath();
        ctx.fillStyle = `rgba(180,230,255, ${0.9 * (1 - progress)})`;
        ctx.arc(px, py, 1.2 * (1 - progress) + 0.6, 0, Math.PI*2);
        ctx.fill();
      }
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);

  // Interaction handlers: mousemove (creates small bursts) & touch
  let lastMove = 0;
  function makeBurst(x,y) {
    bursts.push({
      x: x,
      y: y,
      r: 6 + Math.random()*6,
      life: 0.9,
      maxLife: 0.9
    });
    // play sound on interaction (guard for user gesture)
    try {
      if (starSound && typeof starSound.play === 'function') {
        starSound.currentTime = 0;
        starSound.volume = 0.18;
        starSound.play().catch(()=>{ /* ignore autoplay restrictions */ });
      }
    } catch(e) { /* ignore */ }
  }

  // mouse move (throttle)
  window.addEventListener('mousemove', (ev) => {
    const now = Date.now();
    if (now - lastMove < 80) return;
    lastMove = now;
    const x = ev.clientX;
    const y = ev.clientY;
    makeBurst(x,y);
    // also gently nudge nearby stars
    stars.forEach(s => {
      const dx = s.x - x, dy = s.y - y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        s.x += (dx/dist) * 6 * Math.random();
        s.y += (dy/dist) * 3 * Math.random();
      }
    });
  }, { passive: true });

  // touch support
  window.addEventListener('touchmove', (ev) => {
    ev.preventDefault();
    for (let i=0;i<ev.touches.length;i++){
      const t = ev.touches[i];
      makeBurst(t.clientX, t.clientY);
    }
  }, { passive: false });

  // keep canvas sized on resize
  window.addEventListener('resize', () => {
    // reposition moon to remain relative
    moon.x = window.innerWidth * 0.78;
    moon.y = window.innerHeight * 0.18;
  });
})();
