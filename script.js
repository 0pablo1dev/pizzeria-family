/* ═══════════════════════════════════════════
   PIZZERÍA FAMILY — script.js
═══════════════════════════════════════════ */

'use strict';

// ── LOADER ──────────────────────────────────────────
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('out');
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  }, 1500);
});

// ── CURSOR PERSONALIZADO ─────────────────────────────
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

if (cursor && follower) {
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animFollower);
  })();
}

// ── NAV SCROLL ───────────────────────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── MENÚ LATERAL ─────────────────────────────────────
const burger  = document.getElementById('navBurger');
const sideMenu = document.getElementById('sideMenu');
const overlay  = document.getElementById('sideOverlay');
const closeLinks = document.querySelectorAll('[data-close]');

function openMenu() {
  burger.classList.add('open');
  sideMenu.classList.add('open');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  burger.classList.remove('open');
  sideMenu.classList.remove('open');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
}

burger.addEventListener('click', () => {
  sideMenu.classList.contains('open') ? closeMenu() : openMenu();
});

overlay.addEventListener('click', closeMenu);
closeLinks.forEach(l => l.addEventListener('click', closeMenu));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// ── REVEAL ON SCROLL ──────────────────────────────────
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

reveals.forEach(el => revealObserver.observe(el));

// ── PARALLAX HERO CHECKER ────────────────────────────
const heroBg = document.querySelector('.hero-checker-bg');

if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.3}px)`;
  }, { passive: true });
}

// ── GALERÍA — click para ampliar (lightbox simple) ───
const galItems = document.querySelectorAll('.gal-placeholder');

galItems.forEach(item => {
  item.addEventListener('click', () => {
    const emoji = item.querySelector('.gal-emoji')?.textContent || '';
    const label = item.querySelector('p')?.textContent || '';

    const lb = document.createElement('div');
    lb.style.cssText = `
      position:fixed;inset:0;z-index:9000;
      background:rgba(0,0,0,.92);
      display:flex;align-items:center;justify-content:center;
      flex-direction:column;gap:1rem;
      cursor:none;
      animation: lbIn .3s ease forwards;
    `;

    const style = document.createElement('style');
    style.textContent = `@keyframes lbIn { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }`;
    lb.appendChild(style);

    const emojiEl = document.createElement('div');
    emojiEl.textContent = emoji;
    emojiEl.style.cssText = 'font-size:6rem;';

    const labelEl = document.createElement('div');
    labelEl.textContent = label;
    labelEl.style.cssText = `
      font-family:'Bebas Neue',sans-serif;
      font-size:1.5rem;letter-spacing:.3em;
      color:rgba(245,240,235,.7);
    `;

    const hint = document.createElement('div');
    hint.textContent = 'Haz clic para cerrar';
    hint.style.cssText = `
      font-size:.75rem;letter-spacing:.2em;
      color:rgba(245,240,235,.3);margin-top:1rem;
      font-family:'DM Sans',sans-serif;
    `;

    lb.appendChild(emojiEl);
    lb.appendChild(labelEl);
    lb.appendChild(hint);
    document.body.appendChild(lb);

    lb.addEventListener('click', () => lb.remove());
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') { lb.remove(); document.removeEventListener('keydown', handler); }
    });
  });
});

// ── HOVER en links: agrandar cursor follower ──────────
const interactives = document.querySelectorAll('a, button, .gal-placeholder, .esp-card, .trabaja-card');

interactives.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (follower) {
      follower.style.width  = '56px';
      follower.style.height = '56px';
      follower.style.borderColor = 'rgba(232,35,26,.7)';
    }
  });
  el.addEventListener('mouseleave', () => {
    if (follower) {
      follower.style.width  = '34px';
      follower.style.height = '34px';
      follower.style.borderColor = 'rgba(232,35,26,.5)';
    }
  });
});

// ── CHECKER PATTERN — velocidad alternada en marquee ─
// (ya se maneja con CSS, esto es por si se quiere pausar al hover)
const marquee = document.querySelector('.marquee-track');
const marqueeWrap = document.querySelector('.marquee-wrap');

if (marquee && marqueeWrap) {
  marqueeWrap.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
  });
  marqueeWrap.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
  });
}

// ── SMOOTH SCROLL para links del nav interno ──────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── PARALLAX SUTIL en tarjetas de especialidades ─────
const espCards = document.querySelectorAll('.esp-card');

window.addEventListener('mousemove', e => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  espCards.forEach((card, i) => {
    const factor = (i % 2 === 0 ? 1 : -1) * 4;
    card.style.transform = `
      perspective(800px)
      rotateY(${dx * factor * 0.5}deg)
      rotateX(${-dy * factor * 0.5}deg)
      translateY(${card.matches(':hover') ? '-8px' : '0'})
    `;
  });
}, { passive: true });
