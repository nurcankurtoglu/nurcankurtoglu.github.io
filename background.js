// Gece teması: kuzey kutup yıldızları ve aurora
const rightPanel = document.getElementById('right-panel');
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.zIndex = 0;

const ctx = canvas.getContext('2d');

// Yıldızlar
const stars = [];
const STAR_COUNT = 150;

for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        alpha: Math.random(),
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2
    });
}

// Aurora / ışık efekti
function drawAurora() {
    const gradient = ctx.createLinearGradient(0, canvas.height*0.3, canvas.width, canvas.height*0.7);
    gradient.addColorStop(0, 'rgba(0, 255, 150, 0.05)');
    gradient.addColorStop(0.5, 'rgba(0, 128, 255, 0.05)');
    gradient.addColorStop(1, 'rgba(255, 0, 150, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Yıldız çizimi
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAurora();
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();
        star.x += star.dx;
        star.y += star.dy;

        if(star.x < 0 || star.x > canvas.width) star.dx *= -1;
        if(star.y < 0 || star.y > canvas.height) star.dy *= -1;

        star.alpha += (Math.random() - 0.5) * 0.05;
        if(star.alpha > 1) star.alpha = 1;
        if(star.alpha < 0) star.alpha = 0;
    });
    requestAnimationFrame(drawStars);
}
drawStars();

// Resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Mouse ve touch yıldız patlaması
canvas.addEventListener('mousemove', e => {
    stars.forEach(star => {
        let dx = star.x - e.clientX;
        let dy = star.y - e.clientY;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 50){
            star.alpha = 1;
            star.r = 3 + Math.random()*2;
        }
    });
});
canvas.addEventListener('touchmove', e => {
    const touch = e.touches[0];
    stars.forEach(star => {
        let dx = star.x - touch.clientX;
        let dy = star.y - touch.clientY;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 50){
            star.alpha = 1;
            star.r = 3 + Math.random()*2;
        }
    });
});
