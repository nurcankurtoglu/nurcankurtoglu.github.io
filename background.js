(() => {
  const canvas = document.getElementById("background");
  const ctx = canvas.getContext("2d");
  let width, height;

  class Star {
    constructor() { this.reset(); }
    reset() { this.x = Math.random()*width; this.y = Math.random()*height; this.size=Math.random()*1.2+0.5; this.opacity=Math.random(); this.opacitySpeed=0.005+Math.random()*0.005; this.increasing=Math.random()>0.5; }
    update() { this.increasing ? (this.opacity+=this.opacitySpeed)>=1&&(this.increasing=false) : (this.opacity-=this.opacitySpeed)<=0.2&&(this.increasing=true); }
    draw() { ctx.beginPath(); ctx.fillStyle=`rgba(255,255,255,${this.opacity})`; ctx.shadowColor='rgba(255,255,255,0.8)'; ctx.shadowBlur=5; ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); }
  }

  let stars = [];
  function initStars(count=150) { stars=[]; for(let i=0;i<count;i++){stars.push(new Star());} }

  function resize() { width=window.innerWidth; height=window.innerHeight; canvas.width=width; canvas.height=height; initStars(); }
  window.addEventListener('resize',resize);
  resize();

  function animate() {
    ctx.fillStyle='rgba(10,10,20,1)';
    ctx.fillRect(0,0,width,height);
    stars.forEach(s=>{s.update();s.draw();});
    requestAnimationFrame(animate);
  }
  animate();
})();
