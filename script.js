
// GSAP Animations
gsap.from("#title", {duration: 1.5, y: -50, opacity: 0, ease: "bounce.out"});
gsap.from("#subtitle", {duration: 1.8, y: 50, opacity: 0, delay: 0.3, ease: "power2.out"});
gsap.from(".btn", {duration: 2, scale: 0, delay: 0.7, ease: "elastic.out(1, 0.5)"});

// Canvas Background Animation
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

const particles = [];
const colors = ['#f5c518', '#fff', '#ffd700'];

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 3 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.fill();
  }
}

for(let i=0; i<100; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();
