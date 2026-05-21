/* FLOATING HEARTS */
const emojis = ['💕','💖','🌸','✨','💗','🌺','💞','🌷'];
const bg = document.getElementById('heartsBg');

for (let i = 0; i < 18; i++) {
  const el = document.createElement('div');
  el.className = 'heart-float';
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (.8 + Math.random() * 1.2) + 'rem';
  el.style.animationDuration = (8 + Math.random() * 14) + 's';
  el.style.animationDelay = (Math.random() * 10) + 's';
  bg.appendChild(el);
}

/* SCROLL REVEAL */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* CONFETTI */
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animating = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticles() {
  const colors = ['#f43f6e','#fb7ba2','#f5c842','#fff','#ff9ec4','#ff5588'];
  for (let i = 0; i < 160; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 6 + Math.random() * 10,
      h: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - .5) * 3,
      vy: 2 + Math.random() * 4,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - .5) * .15,
      life: 1,
    });
  }
}

function animateConfetti() {
  if (!animating) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.angle += p.spin;
    p.life -= .007;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
    ctx.restore();
  });

  particles = particles.filter(p => p.life > 0 && p.y < canvas.height + 20);

  if (particles.length === 0) {
    animating = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }
  requestAnimationFrame(animateConfetti);
}

function launchConfetti() {
  animating = true;
  createParticles();
  animateConfetti();
}

/* BOTÃO SIM */
function handleYes() {
  launchConfetti();
  setTimeout(() => {
    document.getElementById('yesModal').classList.add('active');
  }, 400);
}

function closeModal() {
  document.getElementById('yesModal').classList.remove('active');
}

/* BOTÃO NÃO — FOGE DO CURSOR */
let noClicks = 0;
const noMessages = [
  '🏃 Ei, para!',
  '🙅 Não me acha!',
  '😤 Impossível!',
  '🤡 Tente de novo',
  '🌚 Nunca…'
];

function runAway(btn) {
  const maxX = window.innerWidth - btn.offsetWidth - 20;
  const maxY = window.innerHeight - btn.offsetHeight - 20;
  const x = Math.max(10, Math.random() * maxX);
  const y = Math.max(10, Math.random() * maxY);
  btn.style.position = 'fixed';
  btn.style.left = x + 'px';
  btn.style.top  = y + 'px';
  btn.style.zIndex = 999;
  btn.style.transition = 'left .3s, top .3s';
}

function noClick() {
  const btn = document.getElementById('btnNo');
  noClicks++;

  if (noClicks >= 3) {
    btn.textContent = '😩 Ok ok… sim!';
    btn.onclick = handleYes;
    btn.style.position = '';
    btn.style.left = '';
    btn.style.top = '';
  } else {
    btn.textContent = noMessages[noClicks] || '🫣 Socorro!';
  }
}