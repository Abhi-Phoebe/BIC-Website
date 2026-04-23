document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");
  const toggleBtn = document.getElementById("theme-toggle");
  const backToTop = document.getElementById("backToTop");
  const cards = document.querySelectorAll(".card");
  const formBox = document.querySelector(".form-box");
  const rightBox = document.querySelector(".right-box");
  const optionButtons = document.querySelectorAll(".options button");
  const form = document.getElementById("contact-form");
  const logo = document.getElementById("logo");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    document.querySelectorAll("#nav-menu a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });
  }

     window.addEventListener("scroll", () => {
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
  }
});

if (toggleBtn) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
    if (logo) logo.src = "logo-dark.png";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀️";
      if (logo) logo.src = "logo-dark.png";
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙";
      if (logo) logo.src = "logo-light.png";
    }
  });
}

  optionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      optionButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  function handleScroll() {
    cards.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("show");
      }
    });

    [formBox, rightBox].forEach(el => {
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("show");
      }
    });

    if (backToTop) {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

 if (form) {
  form.addEventListener("submit", function () {
    alert("Thank you! We’ll review your message and get back to you soon.");
  });
}
  const inquiryTypeInput = document.getElementById("inquiry-type");
optionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    optionButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    if (inquiryTypeInput) {
      inquiryTypeInput.value = btn.textContent.trim();
    }
  });
});
});
