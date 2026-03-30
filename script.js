// ========== MOBILE MENU TOGGLE ==========
const menuBtn = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const socialIcons = document.querySelector('.social-icons'); // Changed to querySelector
const navLinks = document.querySelectorAll('nav a');

// Check if elements exist before adding event listeners
if (menuBtn && navMenu && socialIcons) {
  // Toggle menu on button click
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('mobile-nav-active');
    socialIcons.classList.toggle('mobile-social-active');
    
    if (navMenu.classList.contains('mobile-nav-active')) {
      navMenu.style.display = 'flex';
      socialIcons.style.display = 'flex';
      // Add animation class
      navMenu.style.animation = 'slideIn 0.3s ease-out';
      socialIcons.style.animation = 'fadeIn 0.3s ease-out';
    } else {
      navMenu.style.display = '';
      socialIcons.style.display = '';
      navMenu.style.animation = '';
      socialIcons.style.animation = '';
    }
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-nav-active');
      socialIcons.classList.remove('mobile-social-active');
      navMenu.style.display = '';
      socialIcons.style.display = '';
    });
  });

  // Close menu if clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 850) {
      const isClickInsideMenu = navMenu.contains(e.target) || 
                                socialIcons.contains(e.target) || 
                                menuBtn.contains(e.target);
      if (!isClickInsideMenu && navMenu.classList.contains('mobile-nav-active')) {
        navMenu.classList.remove('mobile-nav-active');
        socialIcons.classList.remove('mobile-social-active');
        navMenu.style.display = '';
        socialIcons.style.display = '';
      }
    }
  });

  // Reset menu on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 850) {
      navMenu.classList.remove('mobile-nav-active');
      socialIcons.classList.remove('mobile-social-active');
      navMenu.style.display = '';
      socialIcons.style.display = '';
      // Reset to desktop layout
      navMenu.style.animation = '';
      socialIcons.style.animation = '';
    } else {
      // Ensure mobile layout is correct
      if (!navMenu.classList.contains('mobile-nav-active')) {
        navMenu.style.display = '';
        socialIcons.style.display = '';
      }
    }
  });
}

// ========== SKILL BARS ANIMATION ==========
function startSkills() {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  progressBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    if (width && !bar.style.width) {
      bar.style.width = width + '%';
    }
  });
}

const skillSection = document.getElementById('skills');
if (skillSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startSkills();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(skillSection);
}

// ========== PORTFOLIO FILTERING ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (filterBtns.length > 0 && portfolioCards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterVal = btn.getAttribute('data-filter');
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.style.display = 'block';
          // Add fade in animation
          card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

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
    alert("📄 Belal Hossain's detailed CV / portfolio will be shared. Connect on LinkedIn for direct access.");
  });
}

// Optional: Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('mobile-nav-active')) {
        navMenu.classList.remove('mobile-nav-active');
        if (socialIcons) socialIcons.classList.remove('mobile-social-active');
        if (navMenu) navMenu.style.display = '';
        if (socialIcons) socialIcons.style.display = '';
      }
      
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});