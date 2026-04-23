document.addEventListener("DOMContentLoaded", function () {
  // MENU TOGGLE
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");


  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll("#nav-menu a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  window.addEventListener("scroll", () => {
  if (navMenu && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
  }
});

  // DARK MODE
  const toggleBtn = document.getElementById("theme-toggle");
  const logo = document.getElementById("logo");

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

  // REVEAL ANIMATION
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

  // COUNTER ANIMATION
  const counters = document.querySelectorAll(".counter");
  let started = false;

  function startCounters() {
    const statsSection = document.querySelector(".impact-stats");
    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100 && !started) {
      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = Math.max(1, Math.ceil(target / 40));

        const updateCounter = () => {
          count += increment;

          if (count >= target) {
            counter.textContent = target + "+";
          } else {
            counter.textContent = count + "+";
            requestAnimationFrame(updateCounter);
          }
        };

        updateCounter();
      });

      started = true;
    }
  }

  window.addEventListener("scroll", startCounters);
  startCounters();
});
