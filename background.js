const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth/2, height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize',()=>{
  width = window.innerWidth/2;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

const stars = [];
const starCount = 150;

for(let i=0;i<starCount;i++){
  stars.push({
    x: Math.random()*width,
    y: Math.random()*height,
    radius: Math.random()*1.5+0.5,
    opacity: Math.random(),
    opacityDir: Math.random()>0.5?0.01:-0.01
  });
}

canvas.addEventListener('mousemove', (e)=>{
  const mx = e.clientX - width; 
  const my = e.clientY;
  stars.forEach(s=>{
    s.x += (mx - s.x)*0.0005;
    s.y += (my - s.y)*0.0005;
  });
});

function draw(){
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,width,height);
  stars.forEach(s=>{
    s.opacity += s.opacityDir;
    if(s.opacity>1 || s.opacity<0.1) s.opacityDir*=-1;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.radius,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();
