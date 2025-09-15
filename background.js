const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Temel bilgiler
let stars = [];
let clouds = [];
let STAR_COUNT = 150;
let CLOUD_COUNT = 5;

// Tema
let isDay = true;

// Ses efekti
const starSound = new Audio('star_sound.mp3');

// Star objeleri
for (let i=0;i<STAR_COUNT;i++){
    stars.push({
        x: Math.random()*width,
        y: Math.random()*height,
        r: Math.random()*2,
        alpha: Math.random(),
        color: `hsl(${Math.random()*360},100%,80%)`
    });
}

// Cloud objeleri (gündüz için)
for (let i=0;i<CLOUD_COUNT;i++){
    clouds.push({
        x: Math.random()*width,
        y: Math.random()*height/2,
        size: 50 + Math.random()*50,
        speed: 0.2 + Math.random()*0.3
    });
}

// Animate function
function animate(){
    ctx.clearRect(0,0,width,height);

    // Arka plan degrade
    let bgGradient = isDay ? 
        ctx.createLinearGradient(0,0,0,height) :
        ctx.createLinearGradient(0,0,0,height);
    if(isDay){
        bgGradient.addColorStop(0,'#87CEFA');
        bgGradient.addColorStop(1,'#ffffff');
    }else{
        bgGradient.addColorStop(0,'#0d0d2b');
        bgGradient.addColorStop(1,'#000000');
    }
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0,0,width,height);

    // Bulutlar (gündüz)
    if(isDay){
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        clouds.forEach(c=>{
            ctx.beginPath();
            ctx.ellipse(c.x,c.y,c.size, c.size*0.6, 0,0,2*Math.PI);
            ctx.fill();
            c.x += c.speed;
            if(c.x>width+100)c.x=-100;
        });
    }

    // Yıldızlar (gece)
    if(!isDay){
        stars.forEach(s=>{
            ctx.beginPath();
            ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
            ctx.fillStyle = `hsla(${Math.random()*360},100%,80%,${s.alpha})`;
            ctx.fill();
            s.alpha += (Math.random()-0.5)*0.05;
            if(s.alpha>1)s.alpha=1;
            if(s.alpha<0)s.alpha=0;
        });
    }

    requestAnimationFrame(animate);
}

animate();

// Resize
window.addEventListener('resize',()=>{
    width=canvas.width=window.innerWidth;
    height=canvas.height=window.innerHeight;
});

// Gündüz/Gece butonu
document.getElementById('toggle-theme').addEventListener('click',()=>{
    isDay=!isDay;
    document.body.className=isDay?'day':'night';
});

// Mouse interaction for star bursts
canvas.addEventListener('mousemove',e=>{
    if(!isDay){
        stars.push({
            x:e.clientX,
            y:e.clientY,
            r: Math.random()*3+1,
            alpha:1,
            color: `hsl(${Math.random()*360},100%,80%)`
        });
        starSound.play().catch(()=>{});
    }
});

// Touch support for mobile
canvas.addEventListener('touchmove',e=>{
    if(!isDay){
        for(let t of e.touches){
            stars.push({
                x:t.clientX,
                y:t.clientY,
                r: Math.random()*3+1,
                alpha:1,
                color: `hsl(${Math.random()*360},100%,80%)`
            });
            starSound.play().catch(()=>{});
        }
    }
});
