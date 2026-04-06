/* MOBILE MENU */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

/* SKILL BAR ANIMATION */
const skillBars = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute("data-w");
      entry.target.style.width = width + "%";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

skillBars.forEach((bar) => skillObserver.observe(bar));

/* COUNTER ANIMATION */
const counters = document.querySelectorAll(".counter-number");

function animateCounter(counter) {
  const target = +counter.getAttribute("data-target");
  const suffix = counter.getAttribute("data-suffix") || "";
  let current = 0;
  const increment = Math.max(1, Math.floor(target / 120));

  function update() {
    current += increment;
    if (current >= target) {
      counter.textContent = target.toLocaleString() + suffix;
    } else {
      counter.textContent = current.toLocaleString() + suffix;
      requestAnimationFrame(update);
    }
  }

  update();
}

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.45 });

counters.forEach((counter) => counterObserver.observe(counter));

/* OPTIONAL NAME RE-ANIMATION */
const heroName = document.querySelector(".hero-name");

if (heroName) {
  setInterval(() => {
    const letters = heroName.querySelectorAll(".name-word > span");
    letters.forEach((letter) => {
      letter.style.animation = "none";
      void letter.offsetWidth;
      letter.style.animation = "";
    });
  }, 7000);
}

/* PORTFOLIO DATA */
const portfolioData = [
  {
    title: "GCC Workforce Portal",
    desc: "Easy-to-use manpower deployment platform for hospitality and service-sector recruitment.",
    category: "platform",
    label: "Manpower Platform",
    icon: "fas fa-laptop-code"
  },
  {
    title: "Staffing CRM App",
    desc: "A mobile-focused HR platform for candidate tracking, communication, and faster hiring workflows.",
    category: "hr",
    label: "HR Solution",
    icon: "fas fa-mobile-screen-button"
  },
  {
    title: "Analytics Dashboard",
    desc: "Visual KPI tool combining workforce flow, recruitment cost control, and client analytics.",
    category: "strategy",
    label: "Strategy Dashboard",
    icon: "fas fa-chart-pie"
  },
  {
    title: "Partner Management System",
    desc: "A platform to maintain overseas partner communication, records, and manpower demand updates.",
    category: "platform",
    label: "Manpower Platform",
    icon: "fas fa-globe"
  },
  {
    title: "Recruitment Workflow App",
    desc: "Smart process solution for applicant screening, shortlisting, and manpower documentation.",
    category: "hr",
    label: "HR Solution",
    icon: "fas fa-users"
  },
  {
    title: "Executive Strategy Panel",
    desc: "A leadership dashboard to review global partners, placement targets, and service growth.",
    category: "strategy",
    label: "Strategy Dashboard",
    icon: "fas fa-chart-line"
  }
];

const portGrid = document.getElementById("portGrid");
const filterButtons = document.querySelectorAll(".flt-btn");

function getFilteredPortfolio() {
  const activeButton = document.querySelector(".flt-btn.active");
  const activeFilter = activeButton ? activeButton.getAttribute("data-filter") : "all";
  return activeFilter === "all"
    ? portfolioData
    : portfolioData.filter(item => item.category === activeFilter);
}

function renderPortfolio(filter = "all") {
  if (!portGrid) return;

  const filtered = filter === "all"
    ? portfolioData
    : portfolioData.filter(item => item.category === filter);

  portGrid.innerHTML = filtered.map(item => `
    <div class="port-card" data-category="${item.category}">
      <div class="port-icon"><i class="${item.icon}"></i></div>
      <div class="port-body">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <span>${item.label}</span>
      </div>
    </div>
  `).join("");

  attachCardClicks();
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderPortfolio(button.getAttribute("data-filter"));
  });
});

renderPortfolio();

/* PORTFOLIO MODAL */
const modal = document.getElementById("portModal");
const modalClose = document.getElementById("modalClose");
const mIcon = document.getElementById("mIcon");
const mTitle = document.getElementById("mTitle");
const mDesc = document.getElementById("mDesc");
const mCat = document.getElementById("mCat");

function attachCardClicks() {
  const cards = document.querySelectorAll(".port-card");
  const activeItems = getFilteredPortfolio();

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const item = activeItems[index];
      if (!item) return;

      mIcon.innerHTML = `<i class="${item.icon}"></i>`;
      mTitle.textContent = item.title;
      mDesc.textContent = item.desc;
      mCat.textContent = item.label;
      modal.classList.add("show");
    });
  });
}

if (modalClose) {
  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
  });
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
}

/* WHATSAPP FORM */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fname").value.trim();
    const email = document.getElementById("femail").value.trim();
    const phone = document.getElementById("fphone").value.trim();
    const subject = document.getElementById("fsubject").value.trim();
    const message = document.getElementById("fmessage").value.trim();

    const whatsappNumber = "8801827843758";

    const whatsappText =
      `Name: ${name}%0A` +
      `Email: ${email}%0A` +
      `Phone: ${phone}%0A` +
      `Subject: ${subject}%0A` +
      `Message: ${message}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
    window.open(whatsappURL, "_blank");
  });
}