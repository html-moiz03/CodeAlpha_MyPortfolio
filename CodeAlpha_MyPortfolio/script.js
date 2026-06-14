/* Typing Animation */
const typedEl = document.getElementById('typed');

const phrases = [
  'Malik Moiz',
  'a Frontend Developer',
  'a UI Builder',
  'a Code Crafter',
];

let phraseIdx  = 0;
let charIdx    = 0;
let isDeleting = false;
let typingTimer;

function type() {
  const current = phrases[phraseIdx];

  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
  }

  let delay = isDeleting ? 50 : 90;

  if (!isDeleting && charIdx === current.length) {
    // Finished typing — pause before deleting
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    // Finished deleting — move to next phrase
    isDeleting = false;
    phraseIdx  = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }

  typingTimer = setTimeout(type, delay);
}

// Start after a short load delay
setTimeout(type, 600);

/* Nav: scroll class + active link*/
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
}, { passive: true });

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;

    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* Mobile Menu */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* Scroll Reveal */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children reveals
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* Skill Bar Animation */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          fill.style.width = fill.dataset.width;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

/* Smooth scroll for nav links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* Contact Form */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate sending (replace with real API call e.g. Formspree)
  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;

    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  }, 1200);
});

/* Active nav link CSS */
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--accent); }`;
document.head.appendChild(style);