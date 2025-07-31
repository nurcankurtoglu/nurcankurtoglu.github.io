const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function init() {
  resize();
  createStars(120);
  animate();
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', () => {
  resize();
});

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x:

