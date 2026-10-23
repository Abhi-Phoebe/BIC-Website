document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");
  const toggleBtn = document.getElementById("theme-toggle");
  const backToTop = document.getElementById("backToTop");
  const projects = document.querySelectorAll(".project, .program-card");
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
    if (logo) logo.src = "images/logo-dark.png";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀️";
      if (logo) logo.src = "images/logo-dark.png";
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙";
      if (logo) logo.src = "images/logo-light.png";
    }
  });
}

  function handleScroll() {
    projects.forEach(project => {
      const projectTop = project.getBoundingClientRect().top;
      if (projectTop < window.innerHeight - 100) {
        project.classList.add("show");
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

  // ===== PROGRAMS: status badges, apply boxes and detail view =====
  // (settings live in programs-config.js)
  if (typeof BIC_PROGRAMS === "undefined") return;

  const STATUS_LABEL = { open: "Open", upcoming: "Opening Soon", closed: "Closed" };

  document.querySelectorAll(".status-badge").forEach(badge => {
    const s = bicStatus(badge.dataset.program);
    badge.textContent = STATUS_LABEL[s];
    badge.classList.add(s);
  });

  document.querySelectorAll(".detail-apply").forEach(box => {
    const id = box.dataset.program;
    const p = BIC_PROGRAMS[id];
    const s = bicStatus(id);
    box.innerHTML = "";

    const status = document.createElement("p");
    status.className = "program-status";
    const strong = document.createElement("strong");
    strong.textContent = STATUS_LABEL[s];
    status.append("Application status: ", strong);
    box.appendChild(status);

    if (s === "closed" && p.closedMessage) {
      const msg = document.createElement("p");
      msg.className = "program-status";
      msg.textContent = p.closedMessage;
      box.appendChild(msg);
    } else if (p.opens || p.closes || s !== "closed") {
      const dates = document.createElement("p");
      dates.className = "program-status";
      dates.textContent = "Opens: " + bicDate(p.opens) + "  |  Deadline: " + bicDate(p.closes);
      box.appendChild(dates);
    }

    if (s === "open") {
      const a = document.createElement("a");
      a.className = "donate-btn apply-link";
     a.href = p.form;
     a.target = "_blank";
     a.rel = "noopener";
      a.textContent = p.applyLabel;
      box.appendChild(a);
    } else {
      const btn = document.createElement("button");
      btn.className = "donate-btn";
      btn.disabled = true;
      btn.textContent = s === "closed" ? "Applications Closed" : "Applications Opening Soon";
      box.appendChild(btn);
    }
  });

  const modal = document.getElementById("program-modal");
  if (!modal) return;
  const modalBox = modal.querySelector(".program-modal-box");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = modal.querySelector(".modal-close");
  let lastFocus = null;

  function openProgram(id, updateHash) {
    const src = document.getElementById("detail-" + id);
    if (!src) return;
    lastFocus = document.activeElement;
    modalBody.innerHTML = "";
    const clone = src.cloneNode(true);
    clone.removeAttribute("id");
    clone.hidden = false;
    modalBody.appendChild(clone);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalBox.scrollTop = 0;
    closeBtn.focus();
    if (updateHash) history.replaceState(null, "", "#" + id);
  }

  function closeProgram() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    history.replaceState(null, "", window.location.pathname + window.location.search);
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".learn-more").forEach(btn => {
    btn.addEventListener("click", () => openProgram(btn.dataset.program, true));
  });
  closeBtn.addEventListener("click", closeProgram);
  modal.addEventListener("click", e => { if (e.target === modal) closeProgram(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeProgram(); });

    // ===== GALLERY =====
  document.querySelectorAll(".learn-more").forEach(btn => {
    const g = document.createElement("button");
    g.className = "donate-btn gallery-btn";
    g.textContent = "Gallery";
    g.addEventListener("click", () => openGallery(btn.dataset.program));
    btn.after(g);
  });

  function openGallery(id) {
    lastFocus = document.activeElement;
    const wrap = document.createElement("div");
    wrap.className = "program-detail";
    const title = document.createElement("h2");
    title.textContent = BIC_PROGRAMS[id].name + " – Gallery";
    wrap.appendChild(title);

    const items = (typeof BIC_GALLERY !== "undefined" && BIC_GALLERY[id]) || [];
    if (!items.length) {
      const p = document.createElement("p");
      p.textContent = "Photos and updates will be posted here soon. Please check back.";
      wrap.appendChild(p);
    } else {
      const grid = document.createElement("div");
      grid.className = "gallery-grid";
      items.forEach(item => {
        const fig = document.createElement("figure");
        const a = document.createElement("a");
        a.href = item.src;
        a.target = "_blank";
        a.rel = "noopener";
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.caption || "";
        img.loading = "lazy";
        a.appendChild(img);
        fig.appendChild(a);
        const text = (item.date ? item.date + " – " : "") + (item.caption || "");
        if (text) {
          const cap = document.createElement("figcaption");
          cap.textContent = text;
          fig.appendChild(cap);
        }
        grid.appendChild(fig);
      });
      wrap.appendChild(grid);
    }

    modalBody.innerHTML = "";
    modalBody.appendChild(wrap);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalBox.scrollTop = 0;
    closeBtn.focus();
  }

  // open straight away when the link ends with #program-name (e.g. from the footer)
  function openFromHash() {
    const id = window.location.hash.replace("#", "");
    if (id && document.getElementById("detail-" + id)) openProgram(id, false);
  }
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
});
