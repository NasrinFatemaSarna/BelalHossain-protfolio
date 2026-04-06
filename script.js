const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

function setActiveMenu() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveMenu);
setActiveMenu();

const counters = document.querySelectorAll(".counter-number");

function animateCounter(counter) {
  const target = Number(counter.getAttribute("data-target"));
  const suffix = counter.getAttribute("data-suffix") || "";
  let current = 0;
  const increment = Math.max(1, Math.ceil(target / 100));

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

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

const revealCards = document.querySelectorAll(".reveal-card");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealCards.forEach((card) => {
  revealObserver.observe(card);
});

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

    const text =
      `Hello Belal Hossain,\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Subject: ${subject}\n` +
      `Message: ${message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });
}