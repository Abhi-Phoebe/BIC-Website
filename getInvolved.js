document.addEventListener("DOMContentLoaded", function () {
  // MENU TOGGLE
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");
  const logo = document.getElementById("logo");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

     window.addEventListener("scroll", () => {
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
  }
});

  // DARK MODE TOGGLE
  const toggleBtn = document.getElementById("theme-toggle");

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

  // SCROLL REVEAL ANIMATION
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach((element) => {
      const top = element.getBoundingClientRect().top;
      const visiblePoint = 100;

      if (top < windowHeight - visiblePoint) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // BACK TO TOP
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
