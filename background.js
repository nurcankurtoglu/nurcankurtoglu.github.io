// Dynamic starry background for right panel
const rightPanel = document.getElementById('right-panel');
const canvas = document.createElement('canvas');
rightPanel.appendChild(canvas);
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.width = rightPanel.clientWidth;
canvas.height = rightPanel.clientHeight;
canvas.style.zIndex = -1;

const ctx = canvas.getContext('2d');
const stars = [];
const STAR_COUNT = 100;

for (let i=0; i<STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        alpha: Math.random()
    });
}

function drawStars() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();
        star.alpha += (Math.random() - 0.5) * 0.05;
        if (star.alpha > 1) star.alpha = 1;
        if (star.alpha < 0) star.alpha = 0;
    });
    requestAnimationFrame(drawStars);
}
drawStars();

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = rightPanel.clientWidth;
    canvas.height = rightPanel.clientHeight;
});

// Mouse interaction
canvas.addEventListener('mousemove', e => {
    const dx = e.movementX;
    const dy = e.movementY;
    stars.forEach(star => {
        star.x += dx * 0.05;
        star.y += dy * 0.05;
    });
});
