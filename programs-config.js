// =====================================================================
// BIC PROGRAM SETTINGS  (edit this file to open / close applications)
// =====================================================================
// status:
//   "auto"   -> opens and closes by itself using the dates below
//               (no "opens" date = shown as Upcoming)
//   "open"   -> applications are open now (ignores dates)
//   "closed" -> applications are closed (form hidden)
// opens / closes: write dates as YYYY-MM-DD  (example: "2026-09-01")
// =====================================================================

// Every application is emailed to brightimpactcommunity@gmail.com through the
// FormSubmit service. The first time, FormSubmit sends that inbox an activation
// email: open it and click the confirm link (see the note sent with these files).
const BIC_FORM_ENDPOINT = "https://formsubmit.co/ajax/brightimpactcommunity@gmail.com";

// Video submission settings (Youth Action Program).
// Leave cloudName and uploadPreset empty to ask applicants for a video LINK instead
// (YouTube unlisted / Google Drive). Fill both in to let them upload the video file.
const BIC_VIDEO_UPLOAD = { cloudName: "", uploadPreset: "", maxMB: 100, maxSeconds: 90 };

const BIC_PROGRAMS = {
  "youth-action": {
    name: "BIC Youth Action Program",
    status: "auto",
    opens: "2026-10-30",
    closes: "2026-11-23",
    applyLabel: "Apply Now",
    form: "apply.html?program=youth-action"
  },
  "community-outreach": {
    name: "BIC Community Outreach",
    status: "closed",
    opens: "",
    closes: "",
    applyLabel: "Apply to Volunteer",
    form: "apply.html?program=community-outreach"
  },
  "back-to-school": {
    name: "BIC Back-to-School Support",
    status: "closed",
    opens: "",
    closes: "",
    applyLabel: "Apply to Volunteer",
    form: "apply.html?program=back-to-school"
  },
  "green-communities": {
    name: "BIC Green Communities Program",
    status: "closed",
    opens: "",
    closes: "",
    applyLabel: "Apply to Volunteer",
    form: "apply.html?program=green-communities"
  },
  "special-projects": {
    name: "BIC Special Projects",
    status: "closed",
    opens: "",
    closes: "",
    applyLabel: "Apply to Volunteer",
    form: "apply.html?program=special-projects",
    closedMessage: "No special projects are currently open for volunteer applications. Please check back for future opportunities."
  }
};

// Gallery: add your photos to the images/gallery folder, then add one line per photo here.
// Put the newest photo at the top of each list.
const BIC_GALLERY = {
  "youth-action": [
//    { src: "images/Gallery/youth-action-1.jpg", caption: "Community clean-up", date: "March 2027" }
  ],
  "community-outreach": [],
  "back-to-school": [],
  "green-communities": [],
  "special-projects": []
};

function bicStatus(id) {
  const p = BIC_PROGRAMS[id];
  if (!p) return "closed";
  if (p.status !== "auto") return p.status;
  const now = new Date();
  const opens = p.opens ? new Date(p.opens + "T00:00:00") : null;
  const closes = p.closes ? new Date(p.closes + "T23:59:59") : null;
  if (!opens || now < opens) return "upcoming";
  if (closes && now > closes) return "closed";
  return "open";
}

function bicDate(iso) {
  if (!iso) return "To be announced";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
