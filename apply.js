// Builds, validates and submits the application forms (data comes from forms-data.js)
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const programId = params.get("program") || "youth-action";
  const preview = params.get("preview") === "1";
  const program = BIC_PROGRAMS[programId];
  const def = BIC_FORMS[programId];
  const root = document.getElementById("apply-root");
  const heroTitle = document.getElementById("apply-title");
  const heroSub = document.getElementById("apply-sub");

  if (!program || !def) {
    heroTitle.textContent = "Program not found";
    root.appendChild(h("p", { className: "form-note" }, "We could not find that program. Please go back to our programs page."));
    root.appendChild(backLink());
    return;
  }

  document.title = program.name + " – Application";
  heroTitle.textContent = program.name;
  heroSub.textContent = programId === "youth-action" ? "Application Form" : "Volunteer Application Form";

  // ---------- small helpers ----------
  function h(tag, props, ...kids) {
    const e = document.createElement(tag);
    Object.assign(e, props || {});
    kids.forEach(k => e.append(k));
    return e;
  }
  function backLink() {
    return h("a", { className: "donate-btn apply-link", href: "Projects.html#" + programId }, "Back to Program Details");
  }

  // ---------- gate: form only shows when applications are open ----------
  const status = bicStatus(programId);
  if (status !== "open" && !preview) {
    const box = h("div", { className: "closed-box" });
    box.appendChild(h("h2", {}, status === "upcoming" ? "Applications Opening Soon" : "Applications Closed"));
    const msg = program.closedMessage ||
      (status === "upcoming"
        ? "Applications for this program are not open yet. Please check back soon."
        : "Applications for this program are currently closed. Please check back for future opportunities.");
    box.appendChild(h("p", {}, msg));
    if (program.opens || program.closes) {
      box.appendChild(h("p", {}, "Opens: " + bicDate(program.opens) + "  |  Deadline: " + bicDate(program.closes)));
    }
    box.appendChild(backLink());
    root.appendChild(box);
    return;
  }

  // ---------- build the form ----------
  const fields = [];
  def.sections.forEach(s => s.fields.forEach(f => fields.push(f)));
  const fieldMap = {};
  fields.forEach(f => { fieldMap[f.id] = f; });

  if (preview) {
    root.appendChild(h("div", { className: "preview-banner" }, "Preview mode: you are viewing the form only. Nothing will be submitted."));
  }
  if (def.warning) {
    root.appendChild(h("p", { className: "commit-warning" }, h("strong", {}, def.warning)));
  }
  if (def.intro) root.appendChild(h("p", { className: "form-note" }, def.intro));

  const form = h("form", { noValidate: true, id: "apply-form" });
  root.appendChild(form);

  // honeypot (hidden from people, bots fill it)
  form.appendChild(h("div", { className: "hp-field", ariaHidden: "true" },
    h("label", {}, "Leave this empty"), h("input", { type: "text", name: "website", tabIndex: -1, autocomplete: "off" })));

  // each section is one step; only one step is visible at a time
  const steps = [];
  def.sections.forEach(section => {
    const sec = h("section", { className: "form-section" });
    sec.appendChild(h("h2", {}, section.title));
    if (section.intro) sec.appendChild(h("p", { className: "form-note" }, section.intro));
    section.fields.forEach(f => sec.appendChild(renderField(f)));
    steps.push({ el: sec, fields: section.fields });
    form.appendChild(sec);
  });

  if (def.review) {
    const sec = h("section", { className: "form-section" });
    sec.appendChild(h("h2", {}, "Final Review"));
    sec.appendChild(h("p", { className: "form-note" }, "Before submitting your application, please confirm that:"));
    const ul = h("ul", { className: "help-list" });
    def.review.forEach(r => ul.appendChild(h("li", {}, r)));
    sec.appendChild(ul);
    steps.push({ el: sec, fields: [] });
    form.appendChild(sec);
  }

  const lastStep = steps.length - 1;
  let current = 0;

  const progressText = h("p", { className: "progress-text" });
  const progressFill = h("div", { className: "progress-fill" });
  const progress = h("div", { className: "progress" }, progressText, h("div", { className: "progress-bar" }, progressFill));
  if (steps.length > 1) root.insertBefore(progress, form);

  const saveNote = h("p", { className: "help save-note" });
  if (steps.length > 1 && !preview) {
    saveNote.textContent = "Your progress is saved automatically on this device, so you can come back later and continue where you stopped.";
    form.appendChild(saveNote);
  }

  const summary = h("p", { className: "error-msg form-summary", role: "alert" });
  const backBtn = h("button", { type: "button", className: "donate-btn back-btn" }, "Back");
  const nextBtn = h("button", { type: "button", className: "donate-btn" }, "Next");
  const submitBtn = h("button", { type: "submit", className: "donate-btn submit-btn" }, def.submitLabel);
  const nav = h("div", { className: "form-nav" }, backBtn, nextBtn, submitBtn);
  form.appendChild(summary);
  form.appendChild(nav);

  function renderField(f) {
    const group = h(f.type === "radio" || f.type === "checkbox" ? "fieldset" : "div", { className: "form-group", id: "group-" + f.id });
    const labelText = f.label || "";
    const req = f.required ? h("span", { className: "req" }, " *") : "";

    if (f.type === "consent") {
      const wrap = h("label", { className: "option consent" });
      const input = h("input", { type: "checkbox", name: f.id, id: f.id });
      const span = h("span", {});
      span.innerHTML = f.html + (f.required ? ' <span class="req">*</span>' : "");
      wrap.append(input, span);
      group.appendChild(wrap);
    } else {
      const head = (f.type === "radio" || f.type === "checkbox")
        ? h("legend", {}, labelText, req)
        : h("label", { htmlFor: f.id }, labelText, req);
      group.appendChild(head);
      if (f.help) group.appendChild(h("p", { className: "help" }, f.help));
      if (f.bullets) {
        const ul = h("ul", { className: "help-list" });
        f.bullets.forEach(b => ul.appendChild(h("li", {}, b)));
        group.appendChild(ul);
      }
      if (f.words) group.appendChild(h("p", { className: "help" }, "Word limit: " + f.words[0] + "–" + f.words[1] + " words."));
      if (f.note) group.appendChild(h("p", { className: "help" }, f.note));

      if (["text", "email", "tel", "date", "number"].includes(f.type)) {
        const input = h("input", { type: f.type, id: f.id, name: f.id });
        if (f.type === "date") input.max = new Date().toISOString().split("T")[0];
        if (f.min !== undefined) input.min = f.min;
        if (f.max !== undefined && f.type === "number") input.max = f.max;
        if (f.readonly) { input.readOnly = true; input.tabIndex = -1; }
        if (f.type === "email") input.autocomplete = "email";
        group.appendChild(input);
      } else if (f.type === "select") {
        const sel = h("select", { id: f.id, name: f.id });
        sel.appendChild(h("option", { value: "" }, "Select…"));
        f.options.forEach(o => sel.appendChild(h("option", { value: o }, o)));
        group.appendChild(sel);
      } else if (f.type === "textarea") {
        group.appendChild(h("textarea", { id: f.id, name: f.id, rows: f.words ? 9 : 5 }));
        if (f.words) group.appendChild(h("p", { className: "word-count", id: "count-" + f.id }, "0 words"));
      } else if (f.type === "video") {
        const cfg = BIC_VIDEO_UPLOAD;
        if (cfg && cfg.cloudName && cfg.uploadPreset) {
          group.appendChild(h("p", { className: "help" }, "Choose a video file (MP4 is best, up to " + cfg.maxMB + " MB)."));
          const fileInput = h("input", { type: "file", id: f.id + "_file", accept: "video/*" });
          const hidden = h("input", { type: "hidden", id: f.id, name: f.id });
          const stat = h("p", { className: "help", id: "videostatus-" + f.id });
          fileInput.addEventListener("change", () => uploadVideo(f, fileInput, hidden, stat));
          group.append(fileInput, hidden, stat);
        } else {
          group.appendChild(h("p", { className: "help" }, "Upload your video to YouTube (set to Unlisted) or Google Drive (set to \u201CAnyone with the link can view\u201D), then paste the link below."));
          group.appendChild(h("input", { type: "url", id: f.id, name: f.id, placeholder: "https://" }));
        }
      } else if (f.type === "radio" || f.type === "checkbox") {
        f.options.forEach((o, i) => {
          const lab = h("label", { className: "option" });
          lab.append(h("input", { type: f.type, name: f.id, value: o }), h("span", {}, o));
          group.appendChild(lab);
        });
      }
    }
    group.appendChild(h("p", { className: "error-msg", id: "error-" + f.id, role: "alert" }));
    return group;
  }

    // ---------- video upload (only used when BIC_VIDEO_UPLOAD is filled in) ----------
  function uploadVideo(f, fileInput, hidden, stat) {
    const cfg = BIC_VIDEO_UPLOAD;
    const file = fileInput.files[0];
    hidden.value = "";
    showError(f, "");
    stat.textContent = "";
    if (!file) return;
    function reject(msg) { showError(f, msg); stat.textContent = ""; fileInput.value = ""; }
    if (!file.type.startsWith("video/")) return reject("Please choose a video file.");
    if (file.size > cfg.maxMB * 1024 * 1024) return reject("Your video is larger than " + cfg.maxMB + " MB. Please record a shorter video or compress it.");

    stat.textContent = "Checking video…";
    const probe = document.createElement("video");
    probe.preload = "metadata";
    probe.onerror = function () { reject("We could not read this video. Please try another file (MP4 is best)."); };
    probe.onloadedmetadata = function () {
      URL.revokeObjectURL(probe.src);
      if (probe.duration > cfg.maxSeconds + 1) {
        return reject("Your video is " + Math.round(probe.duration) + " seconds long. The maximum is " + cfg.maxSeconds + " seconds.");
      }
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", cfg.uploadPreset);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.cloudinary.com/v1_1/" + cfg.cloudName + "/video/upload");
      xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) stat.textContent = "Uploading… " + Math.round(e.loaded / e.total * 100) + "%";
      };
      xhr.onload = function () {
        try {
          const res = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300 && res.secure_url) {
            hidden.value = res.secure_url;
            stat.textContent = "\u2714 Video uploaded.";
            saveDraft();
            return;
          }
        } catch (err) {}
        reject("Upload failed. Please check your connection and try again.");
      };
      xhr.onerror = function () { reject("Upload failed. Please check your connection and try again."); };
      xhr.send(data);
    };
    probe.src = URL.createObjectURL(file);
  }

  // ---------- reading values ----------
  function getValue(f) {
    if (f.type === "radio") {
      const c = form.querySelector('input[name="' + f.id + '"]:checked');
      return c ? c.value : "";
    }
    if (f.type === "checkbox") {
      return Array.from(form.querySelectorAll('input[name="' + f.id + '"]:checked')).map(i => i.value);
    }
    if (f.type === "consent") return form.elements[f.id].checked;
    return form.elements[f.id].value.trim();
  }
  function isVisible(f) {
    if (!f.showIf) return true;
    const c = f.showIf;
    const v = fieldMap[c.field] ? getValue(fieldMap[c.field]) : "";
    if (c.in) return c.in.includes(v);
    if (c.includes) return Array.isArray(v) && v.includes(c.includes);
    if (c.lt !== undefined) return v !== "" && Number(v) < c.lt;
    return true;
  }
  function wordCount(s) {
    return s.trim() ? s.trim().split(/\s+/).length : 0;
  }
  function ageFrom(dobStr) {
    const d = new Date(dobStr + "T00:00:00");
    const now = new Date();
    let a = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) a--;
    return a;
  }

  // ---------- validation ----------
  function validate(f) {
    if (!isVisible(f)) return "";
    const v = getValue(f);
    const empty = f.type === "checkbox" ? v.length === 0 : f.type === "consent" ? !v : v === "";
        if (f.required && empty) return f.type === "consent" ? "Please tick this box to continue." : f.type === "video" ? "Please add your video. If you chose a file, wait for the upload to finish." : "This question is required.";
    if (empty) return "";
    if (f.type === "video" && !/^https?:\/\/\S+$/i.test(v)) return "Please enter a valid link starting with https://";
    if (f.mustBe && v !== f.mustBe) return f.blockMessage || "You do not meet this requirement.";
    if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Please enter a valid email address.";
    if (f.matches && v.toLowerCase() !== getValue(fieldMap[f.matches]).toLowerCase()) return "The email addresses do not match.";
    if (f.type === "tel" && v.replace(/\D/g, "").length < 7) return "Please enter a valid number including your country code.";
    if (f.ageRange) {
      const a = ageFrom(v);
      if (isNaN(a) || a < f.ageRange[0] || a > f.ageRange[1]) return "You must be between " + f.ageRange[0] + " and " + f.ageRange[1] + " years old to apply.";
    }
    if (f.type === "number" && f.min !== undefined && (Number(v) < f.min || Number(v) > f.max)) return "Please enter a valid number.";
    if (f.words) {
      const n = wordCount(v);
      if (n < f.words[0]) return "Please write at least " + f.words[0] + " words (you have " + n + ").";
      if (n > f.words[1]) return "Please keep this to " + f.words[1] + " words or fewer (you have " + n + ").";
    }
    if (f.max && f.type === "checkbox" && v.length > f.max) return "Please select no more than " + f.max + ".";
    return "";
  }
  function showError(f, msg) {
    const e = document.getElementById("error-" + f.id);
    if (e) e.textContent = msg;
  }
  function refreshVisibility() {
    fields.forEach(f => {
      const g = document.getElementById("group-" + f.id);
      if (g) {
        const vis = isVisible(f);
        g.hidden = !vis;
        if (!vis) showError(f, "");
      }
    });
  }

  // ---------- live behaviour ----------
  form.addEventListener("change", function (e) {
    const name = e.target.name;
    const f = fieldMap[name];
    if (!f) return;
    if (f.id === "dob" && f.type === "date") {
      const ageField = form.elements["age"];
      if (ageField && e.target.value) {
        const a = ageFrom(e.target.value);
        ageField.value = isNaN(a) ? "" : a;
      }
    }
    if (f.max && f.type === "checkbox") {
      const checked = form.querySelectorAll('input[name="' + f.id + '"]:checked');
      if (checked.length > f.max) {
        e.target.checked = false;
        showError(f, "You can select up to " + f.max + " options only.");
        return;
      }
    }
    refreshVisibility();
    if (f.id === "dob") showError(fieldMap["age"], validate(fieldMap["age"]));
    showError(f, validate(f));
    saveDraft();
  });
  form.addEventListener("focusout", function (e) {
    const f = fieldMap[e.target.name];
    if (f && ["text", "email", "tel", "date", "number", "video"].includes(f.type)) showError(f, validate(f));
  });
  form.addEventListener("input", function (e) {
    const f = fieldMap[e.target.name];
    if (f && f.words) {
      document.getElementById("count-" + f.id).textContent = wordCount(e.target.value) + " words";
    }
    saveDraft();
  });

  // ---------- steps: navigation ----------
  function stepOf(f) {
    return steps.findIndex(st => st.fields.includes(f));
  }
  function showStep(i, noScroll) {
    current = i;
    steps.forEach((st, k) => { st.el.hidden = k !== i; });
    progressText.textContent = "Step " + (i + 1) + " of " + steps.length;
    progressFill.style.width = ((i + 1) / steps.length * 100) + "%";
    backBtn.hidden = i === 0;
    nextBtn.hidden = i === lastStep;
    submitBtn.hidden = i !== lastStep;
    summary.textContent = "";
    saveDraft();
    if (!noScroll) document.querySelector(".apply-wrap").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function validateStep(i) {
    let first = null;
    steps[i].fields.forEach(f => {
      const err = validate(f);
      showError(f, err);
      if (err && !first) first = f;
    });
    return first;
  }
  nextBtn.addEventListener("click", function () {
    const bad = validateStep(current);
    if (bad) {
      summary.textContent = "Please fix the highlighted questions before continuing.";
      document.getElementById("group-" + bad.id).scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    showStep(current + 1);
  });
  backBtn.addEventListener("click", function () {
    showStep(current - 1);
  });

  // ---------- saved progress (kept on this device only) ----------
  const DRAFT_KEY = "bic-draft-" + programId;
  function saveDraft() {
    if (preview) return;
    try {
      const values = {};
      fields.forEach(f => { values[f.id] = getValue(f); });
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ step: current, values: values }));
    } catch (e) { /* storage unavailable: the form still works */ }
  }
  function clearDraft() {
    try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
  }
  function restoreDraft() {
    if (preview) return -1;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return -1;
      const d = JSON.parse(raw);
      fields.forEach(f => {
        const v = d.values[f.id];
        if (v === undefined) return;
        if (f.type === "radio" || f.type === "checkbox") {
          form.querySelectorAll('input[name="' + f.id + '"]').forEach(i => {
            i.checked = Array.isArray(v) ? v.includes(i.value) : i.value === v;
          });
        } else if (f.type === "consent") {
          form.elements[f.id].checked = !!v;
        } else {
          form.elements[f.id].value = v;
        }
        if (f.words) document.getElementById("count-" + f.id).textContent = wordCount(String(v)) + " words";
        if (f.type === "video" && v) {
          const st = document.getElementById("videostatus-" + f.id);
          if (st) st.textContent = "\u2714 Video already uploaded. Choose a file only if you want to replace it.";
        }
      });
      return Math.min(Math.max(Number(d.step) || 0, 0), lastStep);
    } catch (e) { return -1; }
  }

  const restoredStep = restoreDraft();
  refreshVisibility();
  showStep(restoredStep >= 0 ? restoredStep : 0, true);
  if (restoredStep >= 0 && steps.length > 1) {
    saveNote.textContent = "We restored your saved progress. ";
    const clear = h("button", { type: "button", className: "link-btn" }, "Start over");
    clear.addEventListener("click", function () {
      clearDraft();
      window.location.reload();
    });
    saveNote.appendChild(clear);
  }

  // ---------- submit ----------
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (current < lastStep) { nextBtn.click(); return; } // Enter key on an earlier step = Next
    summary.textContent = "";
    let first = null;
    fields.forEach(f => {
      const err = validate(f);
      showError(f, err);
      if (err && !first) first = f;
    });
    if (first) {
      const idx = stepOf(first);
      if (idx !== current) showStep(idx, true);
      summary.textContent = "Please fix the highlighted questions before submitting.";
      document.getElementById("group-" + first.id).scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (form.elements["website"].value) return; // bot
    if (preview) {
      summary.textContent = "Preview mode: your answers are valid, but nothing was submitted.";
      return;
    }
    if (!BIC_FORM_ENDPOINT) {
      console.warn("BIC_FORM_ENDPOINT is empty in programs-config.js, so applications cannot be sent.");
      summary.textContent = "We are unable to receive applications right now. Please try again later or contact us at +237 676-507-394.";
      return;
    }

    // flat key/value list, which is how the email service shows it
    const payload = {
      _subject: "New application: " + program.name,
      _template: "table",
      _captcha: "false"
    };
    if (fieldMap["email"]) payload._replyto = getValue(fieldMap["email"]);
    fields.forEach(f => {
      if (!isVisible(f)) return;
      const v = getValue(f);
      const text = Array.isArray(v) ? v.join(", ") : f.type === "consent" ? (v ? "Agreed" : "Not agreed") : v;
      payload[f.label || f.id.replace(/_/g, " ")] = text === "" ? "(not answered)" : text;
    });
    payload["Submitted at"] = new Date().toISOString();

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";
    backBtn.disabled = true;
    try {
      const res = await fetch(BIC_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      });
      let data = {};
      try { data = await res.json(); } catch (x) {}
      if (!res.ok || data.success === false || data.success === "false") throw new Error("Not accepted: " + (data.message || res.status));
      clearDraft();
      showSuccess();
    } catch (err) {
      console.error(err);
      summary.textContent = "Sorry, your application could not be submitted. Your answers are saved, so please check your connection and try again.";
      submitBtn.disabled = false;
      submitBtn.textContent = def.submitLabel;
      backBtn.disabled = false;
    }
  });

  function showSuccess() {
    root.innerHTML = "";
    const box = h("div", { className: "success-box" });
    def.success.forEach((line, i) => box.appendChild(i === 0 ? h("h2", {}, line) : h("p", {}, line)));
    const sign = h("p", { className: "success-sign" });
    sign.append(h("strong", {}, def.successSign[0]), h("br"), def.successSign[1]);
    box.appendChild(sign);
    box.appendChild(h("a", { className: "donate-btn apply-link", href: "index.html" }, "Back to Home"));
    root.appendChild(box);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});