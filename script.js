// ========== MOBILE MENU ==========
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// ========== SKILL BARS ANIMATION ==========
function startSkills() {
  const progressBars = document.querySelectorAll(".progress-fill");

  progressBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    if (width) {
      bar.style.width = width + "%";
    }
  });
}

const skillSection = document.getElementById("skills");
if (skillSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startSkills();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillSection);
}

// ========== DYNAMIC PORTFOLIO ==========
const portfolioItems = [
  {
    title: "GCC Workforce Portal",
    description: "End-to-end manpower deployment platform for hospitality and service-sector recruitment.",
    category: "web",
    icon: "fas fa-laptop-code"
  },
  {
    title: "Staffing CRM App",
    description: "A mobile-focused HR solution for candidate tracking, communication, and faster hiring workflows.",
    category: "app",
    icon: "fas fa-mobile-alt"
  },
  {
    title: "Analytics Dashboard",
    description: "Visual KPI and compliance dashboard for monitoring recruitment, placement, and client activity.",
    category: "ui",
    icon: "fas fa-chart-pie"
  },
  {
    title: "Partner Management System",
    description: "A platform to maintain overseas partner communication, records, and manpower demand updates.",
    category: "web",
    icon: "fas fa-globe"
  },
  {
    title: "Recruitment Workflow App",
    description: "Smart process solution for applicant screening, shortlisting, and manpower documentation.",
    category: "app",
    icon: "fas fa-users"
  },
  {
    title: "Executive Strategy Panel",
    description: "A leadership dashboard to review global partners, placement targets, and service growth.",
    category: "ui",
    icon: "fas fa-chart-line"
  }
];

const portfolioGrid = document.getElementById("portfolioGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

function getCategoryLabel(category) {
  switch (category) {
    case "web":
      return "Manpower Platform";
    case "app":
      return "HR Solution";
    case "ui":
      return "Strategy Dashboard";
    default:
      return "Project";
  }
}

function renderPortfolio(filter = "all") {
  if (!portfolioGrid) return;

  const filteredItems =
    filter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === filter);

  portfolioGrid.innerHTML = filteredItems
    .map(
      (item) => `
        <div class="portfolio-card" data-category="${item.category}">
          <div class="portfolio-img">
            <i class="${item.icon}"></i>
          </div>
          <div class="portfolio-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <span class="portfolio-tag">${getCategoryLabel(item.category)}</span>
          </div>
        </div>
      `
    )
    .join("");

  attachPortfolioEvents(filteredItems);
}

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      if (portfolioGrid) {
        portfolioGrid.style.opacity = "0";
        portfolioGrid.style.transform = "translateY(10px)";

        setTimeout(() => {
          renderPortfolio(filter);
          portfolioGrid.style.opacity = "1";
          portfolioGrid.style.transform = "translateY(0)";
        }, 250);
      }
    });
  });
}

// ========== PORTFOLIO MODAL ==========
const portfolioModal = document.getElementById("portfolioModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalCategory = document.getElementById("modalCategory");
const modalIcon = document.getElementById("modalIcon");

function attachPortfolioEvents(items) {
  const cards = document.querySelectorAll(".portfolio-card");

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const item = items[index];
      openModal(item);
    });
  });
}

function openModal(item) {
  if (!portfolioModal || !modalTitle || !modalDescription || !modalCategory || !modalIcon) return;

  modalTitle.textContent = item.title;
  modalDescription.textContent = item.description;
  modalCategory.textContent = getCategoryLabel(item.category);
  modalIcon.innerHTML = `<i class="${item.icon}"></i>`;
  portfolioModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!portfolioModal) return;
  portfolioModal.classList.remove("show");
  document.body.style.overflow = "";
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (portfolioModal) {
  portfolioModal.addEventListener("click", (e) => {
    if (e.target === portfolioModal) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// ========== WHATSAPP CONTACT FORM ==========
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const phone = document.getElementById("phone")?.value.trim() || "";
    const subject = document.getElementById("subject")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";

    const whatsappNumber = "8801827843758";

    const text = `Hello Belal Hossain,

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    contactForm.reset();
  });
}

// ========== OPTIONAL CV BUTTON ALERT ==========
const downloadCvBtn = document.getElementById("downloadCvBtn");

if (downloadCvBtn) {
  downloadCvBtn.addEventListener("click", () => {
    console.log("CV download button clicked");
  });
}

// ========== INITIAL LOAD ==========
renderPortfolio();
