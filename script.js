// ========== MOBILE MENU TOGGLE ==========
const menuBtn = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const socialIcons = document.getElementById('socialIcons');
const navLinks = document.querySelectorAll('nav a');

// Toggle menu on button click
menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  navMenu.classList.toggle('mobile-nav-active');
  socialIcons.classList.toggle('mobile-nav-active');
  if (navMenu.classList.contains('mobile-nav-active')) {
    navMenu.style.display = 'flex';
    socialIcons.style.display = 'flex';
  } else {
    navMenu.style.display = '';
    socialIcons.style.display = '';
  }
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('mobile-nav-active');
    socialIcons.classList.remove('mobile-nav-active');
    navMenu.style.display = '';
    socialIcons.style.display = '';
  });
});

// Close menu if clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 850) {
    const isClickInsideMenu = navMenu.contains(e.target) || menuBtn.contains(e.target);
    if (!isClickInsideMenu && navMenu.classList.contains('mobile-nav-active')) {
      navMenu.classList.remove('mobile-nav-active');
      socialIcons.classList.remove('mobile-nav-active');
      navMenu.style.display = '';
      socialIcons.style.display = '';
    }
  }
});

// Reset menu on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 850) {
    navMenu.classList.remove('mobile-nav-active');
    socialIcons.classList.remove('mobile-nav-active');
    navMenu.style.display = '';
    socialIcons.style.display = '';
  }
});

// ========== SKILL BARS ANIMATION ==========
const progressBars = document.querySelectorAll('.progress-fill');
function startSkills() {
  progressBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    if (width && !bar.style.width) {
      bar.style.width = width + '%';
    }
  });
}

const skillSection = document.getElementById('skills');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startSkills();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
if (skillSection) observer.observe(skillSection);

// ========== PORTFOLIO FILTERING ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filterVal = btn.getAttribute('data-filter');
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    portfolioCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (filterVal === 'all' || cardCategory === filterVal) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ========== CONTACT FORM ==========
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`📧 Thank you! Belal Hossain will reply within 24 hours.\n📞 For urgent: +8801827843758`);
    form.reset();
  });
}

// ========== DOWNLOAD CV ==========
const cvBtn = document.getElementById('downloadCvBtn');
if (cvBtn) {
  cvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert("📄 Belal Hossain’s detailed CV / portfolio will be shared. Connect on LinkedIn for direct access.");
  });
}