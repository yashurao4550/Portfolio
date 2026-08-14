/* ---------- Typing effect ---------- */
const phrases = [
  'aspiring cybersecurity student...',
  'BCA fresher at Ducat...',
  'future ethical hacker...',
  'learning linux & networking...',
  'open source explorer...'
];

let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
const typeText = document.getElementById('typeText');

function type() {
  const current = phrases[phraseIdx];

  if (!deleting) {
    typeText.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typeText.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }

  setTimeout(type, deleting ? 40 : 90);
}

type();

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ---------- Skill bars animate ---------- */
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0';
        requestAnimationFrame(() => {
          entry.target.style.width = width;
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

bars.forEach((bar) => barObserver.observe(bar));

/* ---------- Navbar scroll + active link ---------- */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  backToTop.classList.toggle('show', window.scrollY > 500);

  const pos = window.scrollY + 120;
  let currentId = 'home';
  sections.forEach((sec) => {
    if (sec.offsetTop <= pos) currentId = sec.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
  });
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const navLinksBox = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinksBox.classList.toggle('open');
});

navLinksBox.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinksBox.classList.remove('open'));
});

/* ---------- Footer year ---------- */
const year = new Date().getFullYear();
document.getElementById('footerText').innerHTML =
  'Built with &lt;3 · <a href="https://github.com/yashurao4550" target="_blank" rel="noopener">yashurao4550</a> · ' +
  year;
