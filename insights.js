document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");
  const toggleBtn = document.getElementById("theme-toggle");
  const backToTop = document.getElementById("backToTop");
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
    if (nav && nav.classList.contains("active")) {
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
    document.querySelectorAll(".insight-card").forEach(card => {
      if (card.getBoundingClientRect().top < window.innerHeight - 100) {
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

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===== INSIGHTS: blog + spotlight (content lives in insights-data.js) =====
  if (typeof BIC_BLOG === "undefined") return;

  const demo = new URLSearchParams(window.location.search).get("demo") === "1";
  const blogPosts = (demo ? BIC_DEMO_BLOG : BIC_BLOG).slice()
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const spotlights = demo ? BIC_DEMO_SPOTLIGHT : BIC_SPOTLIGHT;

  const blogGrid = document.getElementById("blog-grid");
  const blogEmpty = document.getElementById("blog-empty");
  const spotGrid = document.getElementById("spotlight-grid");
  const spotEmpty = document.getElementById("spotlight-empty");
  const modal = document.getElementById("insight-modal");
  const modalBox = modal.querySelector(".insight-modal-box");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = modal.querySelector(".modal-close");
  let activeTab = "blog";
  let lastFocus = null;

  if (demo) {
    const banner = document.createElement("p");
    banner.className = "demo-banner";
    banner.textContent = "Demo preview: this page is showing sample content, likes and comments only. Visitors will not see it.";
    document.querySelector(".insights-wrap").prepend(banner);
  }

  // ---------- small helpers ----------
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  // text with **bold** parts, built safely (no HTML is ever inserted)
  function richText(parent, text) {
    String(text || "").split(/\*\*(.+?)\*\*/g).forEach((part, i) => {
      if (!part) return;
      if (i % 2 === 1) parent.appendChild(el("strong", "", part));
      else parent.appendChild(document.createTextNode(part));
    });
    return parent;
  }

  function fmtDate(iso) {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return isNaN(d) ? "" : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }

  function initials(name) {
    return (name || "").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
  }

  function keyOf(kind, id) { return kind + "-" + id; }

  // picture area: the person's photo, or a coloured block with their initials
  function media(src, alt, fallbackText, iconClass) {
    const box = el("div", "insight-media");
    function fallback() {
      const f = el("span", "media-fallback");
      if (fallbackText) f.textContent = fallbackText;
      else f.appendChild(el("i", iconClass));
      box.appendChild(f);
    }
    if (src) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      img.loading = "lazy";
      img.onerror = function () { img.remove(); fallback(); };
      box.appendChild(img);
    } else {
      fallback();
    }
    return box;
  }

  // ---------- likes, views and comments ----------
  // store = null means "not set up yet": no numbers or comment boxes are shown.
  let store = null;
  let counts = {};
  const LIKED_KEY = "bic-liked";
  const VIEWED_KEY = "bic-viewed-2";

  function readSet(k) {
    try { return JSON.parse(localStorage.getItem(k) || "[]"); } catch (e) { return []; }
  }
  function writeSet(k, arr) {
    try { localStorage.setItem(k, JSON.stringify(arr)); } catch (e) {}
  }

  function makeDemoStore() {
    const posts = {
      "blog-sample-post-1": { likes: 12, views: 87 },
      "blog-sample-post-2": { likes: 5, views: 41 },
      "blog-sample-post-3": { likes: 3, views: 22 },
      "spotlight-sample-spotlight-1": { likes: 20 },
      "spotlight-sample-spotlight-2": { likes: 9 },
      "spotlight-sample-spotlight-3": { likes: 14 }
    };
    const comments = {
      "blog-sample-post-1": [{ id: "c1", name: "Sample Reader", text: "This is a sample comment. Real comments appear here as soon as they are posted.", ms: Date.now() - 86400000, uid: "someone-else" }]
    };
    return {
      demo: true,
      async getAll() { return JSON.parse(JSON.stringify(posts)); },
      async like(key, delta) { posts[key] = posts[key] || {}; posts[key].likes = Math.max(0, (posts[key].likes || 0) + delta); },
      async view(key) { posts[key] = posts[key] || {}; posts[key].views = (posts[key].views || 0) + 1; },
      async comments(key) { return (comments[key] || []).slice(); },
      async uid() { return "demo-user"; },
      async addComment(key, name, text) { (comments[key] = comments[key] || []).push({ id: "c" + Date.now(), name: name, text: text, ms: Date.now(), uid: "demo-user" }); },
      async updateComment(key, id, name, text) {
        const c = (comments[key] || []).find(x => x.id === id);
        if (c) { c.name = name; c.text = text; c.edited = true; }
      }
    };
  }

  async function makeFirebaseStore(cfg) {
    const base = "https://www.gstatic.com/firebasejs/10.12.2/";
    const appMod = await import(base + "firebase-app.js");
    const fs = await import(base + "firebase-firestore.js");
    const authMod = await import(base + "firebase-auth.js");
    const app = appMod.initializeApp(cfg);
    const db = fs.getFirestore(app);
    const auth = authMod.getAuth(app);
    let myUid = null;
    async function getUid() {
      if (myUid) return myUid;
      const cred = await authMod.signInAnonymously(auth);
      myUid = cred.user.uid;
      return myUid;
    }
    return {
      uid: getUid,
      async getAll() {
        const snap = await fs.getDocs(fs.collection(db, "posts"));
        const out = {};
        snap.forEach(d => { out[d.id] = d.data(); });
        return out;
      },
      async like(key, delta) {
        await fs.setDoc(fs.doc(db, "posts", key), { likes: fs.increment(delta) }, { merge: true });
      },
      async view(key) {
        await fs.setDoc(fs.doc(db, "posts", key), { views: fs.increment(1) }, { merge: true });
      },
      async comments(key) {
        const q = fs.query(fs.collection(db, "posts", key, "comments"), fs.where("approved", "==", true));
        const snap = await fs.getDocs(q);
        const out = [];
        snap.forEach(d => {
          const v = d.data();
          out.push({ id: d.id, name: v.name, text: v.text, uid: v.uid || "", edited: !!v.edited, ms: v.createdAt && v.createdAt.toMillis ? v.createdAt.toMillis() : 0 });
        });
        return out;
      },
      async addComment(key, name, text) {
        const uid = await getUid();
        await fs.addDoc(fs.collection(db, "posts", key, "comments"), {
          name: name, text: text, approved: true, uid: uid, createdAt: fs.serverTimestamp()
        });
      },
      async updateComment(key, id, name, text) {
        await getUid();
        await fs.updateDoc(fs.doc(db, "posts", key, "comments", id), { name: name, text: text, edited: true });
      }
    };
  }

  function likesOf(key) { return (counts[key] && counts[key].likes) || 0; }
  function viewsOf(key) { return (counts[key] && counts[key].views) || 0; }

  function statsLine(key, withViews) {
    const box = el("p", "insight-stats");
    box.dataset.key = key;
    box.hidden = !store;
    const likes = el("span", "stat-likes");
    likes.appendChild(el("i", "fa-regular fa-heart"));
    likes.append(String(likesOf(key)));
    box.appendChild(likes);
    if (withViews) {
      const views = el("span", "stat-views");
      views.appendChild(el("i", "fa-regular fa-eye"));
      views.append(String(viewsOf(key)));
      box.appendChild(views);
    }
    return box;
  }

  function refreshStats() {
    document.querySelectorAll(".insight-stats").forEach(box => {
      box.hidden = !store;
      const key = box.dataset.key;
      const l = box.querySelector(".stat-likes");
      const v = box.querySelector(".stat-views");
      if (l) { l.lastChild.textContent = String(likesOf(key)); }
      if (v) { v.lastChild.textContent = String(viewsOf(key)); }
    });
  }

  // ---------- cards ----------
  function openBtn(onClick) {
    const b = el("button", "donate-btn", "Read More");
    b.addEventListener("click", onClick);
    return b;
  }

  function blogCard(p) {
    const card = el("article", "insight-card");
    card.appendChild(media(p.image, p.title, initials(p.author), "fa-solid fa-pen-nib"));
    const body = el("div", "insight-body");
    if (p.tag) body.appendChild(el("span", "insight-tag", p.tag));
    body.appendChild(el("h3", "", p.title));
    body.appendChild(el("p", "insight-meta", [p.author, fmtDate(p.date)].filter(Boolean).join(" · ")));
    body.appendChild(el("p", "insight-excerpt", p.excerpt));
    body.appendChild(statsLine(keyOf("blog", p.id), true));
    body.appendChild(openBtn(() => openPost("blog", p.id, true)));
    card.appendChild(body);
    return card;
  }

  function spotlightCard(p) {
    const card = el("article", "insight-card spotlight-card");
    card.appendChild(media(p.photo, p.name, initials(p.name), "fa-solid fa-star"));
    const body = el("div", "insight-body");
    body.appendChild(el("h3", "", p.name));
    body.appendChild(el("p", "insight-meta", p.title));
    if (p.quote) body.appendChild(el("p", "insight-quote", "“" + p.quote + "”"));
    body.appendChild(statsLine(keyOf("spotlight", p.id), false));
    body.appendChild(openBtn(() => openPost("spotlight", p.id, true)));
    card.appendChild(body);
    return card;
  }

  function renderAll() {
    blogGrid.innerHTML = "";
    blogEmpty.hidden = blogPosts.length > 0;       // the "coming soon" box disappears with the first post
    blogPosts.forEach(p => blogGrid.appendChild(blogCard(p)));

    spotGrid.innerHTML = "";
    spotEmpty.hidden = spotlights.length > 0;      // same for spotlights
    spotlights.forEach(p => spotGrid.appendChild(spotlightCard(p)));
    handleScroll();
  }

  // ---------- tabs ----------
  function showTab(name, updateHash) {
    activeTab = name;
    document.querySelectorAll(".tab-btn").forEach(b => {
      const on = b.dataset.tab === name;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on);
    });
    document.querySelectorAll(".tab-panel").forEach(p => { p.hidden = p.id !== "tab-" + name; });
    if (updateHash) history.replaceState(null, "", window.location.search + "#" + name);
    setTimeout(handleScroll, 50);
  }

  document.querySelectorAll(".tab-btn").forEach(b => {
    b.addEventListener("click", () => showTab(b.dataset.tab, true));
  });

  // ---------- reading pop-up ----------
  function likeBar(key, withViews) {
    const bar = el("div", "engage-bar");
    const liked = () => readSet(LIKED_KEY).includes(key);
    const btn = el("button", "like-btn");
    btn.type = "button";
    const icon = el("i", "");
    const label = el("span", "like-label");
    const count = el("span", "like-count", String(likesOf(key)));
    btn.append(icon, document.createTextNode(" "), label, count);
    function paint() {
      const on = liked();
      btn.classList.toggle("liked", on);
      icon.className = on ? "fa-solid fa-heart" : "fa-regular fa-heart";
      label.textContent = on ? "Liked" : "Like";
      count.textContent = String(likesOf(key));
    }
    paint();
    btn.addEventListener("click", async () => {
      const set = readSet(LIKED_KEY);
      const was = set.includes(key);
      const delta = was ? -1 : 1;
      counts[key] = counts[key] || {};
      counts[key].likes = Math.max(0, likesOf(key) + delta);
      writeSet(LIKED_KEY, was ? set.filter(k => k !== key) : set.concat(key));
      paint(); refreshStats();
      btn.disabled = true;
      try {
        await store.like(key, delta);
      } catch (e) {
        console.error(e);
        counts[key].likes = Math.max(0, likesOf(key) - delta);
        writeSet(LIKED_KEY, was ? set.concat(key) : set.filter(k => k !== key));
        paint(); refreshStats();
      }
      btn.disabled = false;
    });
    bar.appendChild(btn);
    if (withViews) {
      const v = el("span", "view-count");
      v.appendChild(el("i", "fa-regular fa-eye"));
      v.append(" " + viewsOf(key) + " views");
      v.dataset.key = key;
      bar.appendChild(v);
    }
    return bar;
  }

  function commentsBox(key) {
    const box = el("div", "comments");
    box.appendChild(el("h3", "", "Comments"));
    const list = el("div", "comment-list");
    list.appendChild(el("p", "comment-empty", "Loading comments…"));
    box.appendChild(list);
    const formHolder = el("div", "comment-form-holder");
    box.appendChild(formHolder);
    let myUid = null;

    function shortDate(ms) {
      return new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    }

    function reload() {
      return store.comments(key).then(renderComments).catch(e => {
        console.error(e);
        list.innerHTML = "";
        list.appendChild(el("p", "comment-empty", "Comments could not be loaded right now."));
      });
    }

    function renderComments(items) {
      list.innerHTML = "";
      const mine = items.find(c => myUid && c.uid === myUid);
      formHolder.hidden = !!mine;          // once you have commented, the comment box disappears
      if (!items.length) {
        list.appendChild(el("p", "comment-empty", "No comments yet. Be the first to share your thoughts."));
        return;
      }
      items.sort((a, b) => (a.ms || 0) - (b.ms || 0)).forEach(c => list.appendChild(commentRow(c, !!(myUid && c.uid === myUid))));
    }

    function commentRow(c, isMine) {
      const row = el("div", "comment");
      function show() {
        row.innerHTML = "";
        const head = el("div", "comment-head");
        const who = el("strong", "", c.name || "Anonymous");
        head.appendChild(who);
        if (isMine) head.appendChild(el("span", "comment-you", "You"));
        const meta = [];
        if (c.ms) meta.push(shortDate(c.ms));
        if (c.edited) meta.push("edited");
        head.appendChild(el("span", "comment-date", meta.join(" · ")));
        row.appendChild(head);
        row.appendChild(el("p", "", c.text));
        if (isMine) {
          const edit = el("button", "link-btn", "Edit your comment");
          edit.type = "button";
          edit.addEventListener("click", editMode);
          row.appendChild(edit);
        }
      }
      function editMode() {
        row.innerHTML = "";
        const f = el("form", "comment-form");
        f.noValidate = true;
        const n = el("input"); n.type = "text"; n.maxLength = 60; n.placeholder = "Your name (optional)"; n.setAttribute("aria-label", "Your name (optional)");
        n.value = c.name === "Anonymous" ? "" : c.name;
        const t = el("textarea"); t.rows = 3; t.maxLength = 600; t.value = c.text; t.setAttribute("aria-label", "Your comment");
        const msg = el("p", "comment-msg"); msg.setAttribute("role", "status");
        const actions = el("div", "comment-actions");
        const save = el("button", "donate-btn", "Save"); save.type = "submit";
        const cancel = el("button", "link-btn", "Cancel"); cancel.type = "button";
        cancel.addEventListener("click", show);
        actions.append(save, cancel);
        f.append(n, t, msg, actions);
        f.addEventListener("submit", async e => {
          e.preventDefault();
          const text = t.value.trim();
          if (!text) { msg.textContent = "Please write a comment."; return; }
          save.disabled = true;
          try {
            await store.updateComment(key, c.id, n.value.trim() || "Anonymous", text);
            await reload();
          } catch (err) {
            console.error(err);
            msg.textContent = "Sorry, your change could not be saved. Please try again.";
            save.disabled = false;
          }
        });
        row.appendChild(f);
        t.focus();
      }
      show();
      return row;
    }

    // the "write a comment" form (the name is optional)
    const form = el("form", "comment-form");
    form.noValidate = true;
    const name = el("input"); name.type = "text"; name.placeholder = "Your name (optional)"; name.maxLength = 60; name.autocomplete = "name"; name.setAttribute("aria-label", "Your name (optional)");
    const text = el("textarea"); text.placeholder = "Write a comment…"; text.rows = 3; text.maxLength = 600; text.setAttribute("aria-label", "Your comment");
    const trap = el("div", "hp-field"); trap.setAttribute("aria-hidden", "true");
    const trapInput = el("input"); trapInput.type = "text"; trapInput.tabIndex = -1; trapInput.autocomplete = "off"; trap.appendChild(trapInput);
    const note = el("p", "comment-note", "Your name is optional. If you leave it empty, your comment is posted as Anonymous. Comments go live right away, so please be kind and respectful and do not share phone numbers or private details. BIC may remove comments that are unkind or inappropriate. You can edit your comment later on this device.");
    const msg = el("p", "comment-msg"); msg.setAttribute("role", "status");
    const send = el("button", "donate-btn", "Post Comment"); send.type = "submit";
    form.append(name, text, trap, note, msg, send);

    form.addEventListener("submit", async e => {
      e.preventDefault();
      msg.textContent = "";
      const t = text.value.trim();
      if (trapInput.value) return;
      if (!t) { msg.textContent = "Please write a comment."; return; }
      let last = 0;
      try { last = Number(localStorage.getItem("bic-last-comment") || 0); } catch (x) {}
      if (Date.now() - last < 30000) { msg.textContent = "Please wait a few seconds before posting again."; return; }
      send.disabled = true;
      try {
        await store.addComment(key, name.value.trim() || "Anonymous", t);
        try { localStorage.setItem("bic-last-comment", String(Date.now())); } catch (x) {}
        text.value = "";
        name.value = "";
        myUid = await store.uid().catch(() => myUid);
        await reload();
      } catch (err) {
        console.error(err);
        msg.textContent = "Sorry, your comment could not be sent. Please try again.";
      }
      send.disabled = false;
    });
    formHolder.appendChild(form);

    store.uid().catch(e => { console.error("Sign-in for editing is unavailable:", e); return null; })
      .then(u => { myUid = u; return reload(); });
    return box;
  }

  function openPost(kind, id, updateHash) {
    const list = kind === "blog" ? blogPosts : spotlights;
    const p = list.find(x => x.id === id);
    if (!p) return;
    lastFocus = document.activeElement;
    const key = keyOf(kind, id);

    const wrap = el("article", "insight-detail");
    if (kind === "blog") {
      wrap.appendChild(media(p.image, p.title, initials(p.author), "fa-solid fa-pen-nib"));
      if (p.tag) wrap.appendChild(el("span", "insight-tag", p.tag));
      wrap.appendChild(el("h2", "", p.title));
      wrap.appendChild(el("p", "insight-meta", [p.author, p.role, fmtDate(p.date)].filter(Boolean).join(" · ")));
      (p.body || []).forEach(t => wrap.appendChild(richText(el("p"), t)));
    } else {
      wrap.appendChild(media(p.photo, p.name, initials(p.name), "fa-solid fa-star"));
      wrap.appendChild(el("h2", "", p.name));
      wrap.appendChild(el("p", "insight-meta", p.title));
      if (p.quote) wrap.appendChild(el("p", "insight-quote", "“" + p.quote + "”"));
      (p.story || []).forEach(t => wrap.appendChild(richText(el("p"), t)));
    }

    if (store) {
      wrap.appendChild(likeBar(key, kind === "blog"));
      if (kind === "blog") wrap.appendChild(commentsBox(key));
      countView(kind, key, wrap);
    }

    modalBody.innerHTML = "";
    modalBody.appendChild(wrap);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalBox.scrollTop = 0;
    closeBtn.focus();
    if (updateHash) history.replaceState(null, "", window.location.search + "#" + kind + "/" + id);
  }

  // a view is counted once per device for each story, and only marked as seen once Firebase has accepted it
  const viewing = {};
  function countView(kind, key, wrap) {
    if (kind !== "blog") return;
    if (readSet(VIEWED_KEY).includes(key) || viewing[key]) return;
    viewing[key] = true;
    counts[key] = counts[key] || {};
    counts[key].views = viewsOf(key) + 1;
    const v = wrap.querySelector(".view-count");
    if (v) v.lastChild.textContent = " " + viewsOf(key) + " views";
    refreshStats();
    store.view(key).then(() => {
      writeSet(VIEWED_KEY, readSet(VIEWED_KEY).concat(key));
    }).catch(e => {
      console.error(e);
      counts[key].views = Math.max(0, viewsOf(key) - 1);
      refreshStats();
    }).then(() => { viewing[key] = false; });
  }

  function closePost() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    history.replaceState(null, "", window.location.search + "#" + activeTab);
    if (lastFocus) lastFocus.focus();
  }

  closeBtn.addEventListener("click", closePost);
  modal.addEventListener("click", e => { if (e.target === modal) closePost(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closePost(); });

  // links like Insights.html#spotlight or Insights.html#blog/my-post-id
  function applyHash() {
    const parts = window.location.hash.replace("#", "").split("/");
    if (parts[0] === "blog" || parts[0] === "spotlight") {
      showTab(parts[0], false);
      if (parts[1]) openPost(parts[0], decodeURIComponent(parts[1]), false);
    }
  }

  // ---------- start ----------
  async function connectStore() {
    try {
      if (demo) {
        store = makeDemoStore();
      } else if (typeof BIC_FIREBASE_CONFIG !== "undefined" && BIC_FIREBASE_CONFIG.projectId && BIC_FIREBASE_CONFIG.apiKey) {
        store = await makeFirebaseStore(BIC_FIREBASE_CONFIG);
      }
      if (store) {
        counts = await store.getAll();
        refreshStats();
      }
    } catch (e) {
      console.error("Likes and comments are unavailable:", e);
      store = null;
      refreshStats();
    }
  }

  renderAll();
  applyHash();
  window.addEventListener("hashchange", applyHash);
  handleScroll();
  connectStore().then(() => {
    refreshStats();
    // if a story was opened from a link before the numbers loaded, reopen it with likes and comments
    if (store && !modal.hidden) {
      const parts = window.location.hash.replace("#", "").split("/");
      if (parts[1]) openPost(parts[0], decodeURIComponent(parts[1]), false);
    }
  });
});