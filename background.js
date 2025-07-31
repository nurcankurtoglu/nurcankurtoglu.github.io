// Çok hafif, yumuşak ve profesyonel yıldız animasyonu arka plan

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

const ctx = canvas.getContext('2
