document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");
  const toggleBtn = document.getElementById("theme-toggle");
  const backToTop = document.getElementById("backToTop");
  const cards = document.querySelectorAll(".card, .value-card");
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
  function handleScroll() {
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < window.innerHeight - 100) {
        card.classList.add("show");
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
});
