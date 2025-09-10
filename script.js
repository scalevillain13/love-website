// ====== Сердечки ======
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = ['❤️','💖','💕','💞','💘'][Math.floor(Math.random()*5)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 1000);

// ====== Сообщение + обнимашки ======
document.getElementById("surpriseBtn").addEventListener("click", (e) => {
  const message = document.getElementById("message");
  message.style.display = "block";
  setTimeout(() => message.style.display = "none", 2500);

  const hug = document.getElementById("hug");
  hug.classList.add("active");
  setTimeout(() => hug.classList.remove("active"), 3000);

  const rect = e.target.getBoundingClientRect();
  createFirework(rect.left + rect.width / 2, rect.top);
});

// ====== Салют ======
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

function random(min, max) { return Math.random() * (max - min) + min; }

class Particle {
  constructor(x, y, color) {
    this.x = x; this.y = y; this.radius = 2; this.color = color;
    this.speed = random(2,5); this.angle = random(0, Math.PI*2);
    this.friction = 0.95; this.gravity = 0.05; this.opacity = 1;
    this.decay = random(0.01, 0.02);
  }
  update() {
    this.speed *= this.friction;
    this.x += Math.cos(this.angle)*this.speed;
    this.y += Math.sin(this.angle)*this.speed + this.gravity;
    this.opacity -= this.decay;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

function createFirework(x,y) {
  const colors = ["#ffb347","#ffcc33","#ff758c","#9d50bb","#6a82fb","#fceabb"];
  for(let i=0;i<100;i++){
    particles.push(new Particle(x,y,colors[Math.floor(Math.random()*colors.length)]));
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  particles = particles.filter(p => p.opacity>0);
  particles.forEach(p=>{p.update();p.draw();});
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize",()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
