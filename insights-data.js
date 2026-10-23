// =====================================================================
// INSIGHTS CONTENT  (add new blog posts and spotlights here)
// =====================================================================
// HOW TO ADD A BLOG POST: copy one block { ... } inside BIC_BLOG, paste it
// at the top of the list, then change the text. Keep a comma between blocks.
//
//   id        short unique name: lowercase letters, numbers and dashes only,
//             no spaces (example: "my-youth-action-journey"). Never change it
//             after posting, because the likes, views and comments are tied to it.
//   title     the title of the post
//   author    the person's name
//   role      optional, e.g. "Youth Action Program participant, 2026"
//   date      YYYY-MM-DD (newest posts are shown first automatically)
//   tag       optional small label, e.g. "Reflection"
//   image     the person's picture, e.g. "images/insights/my-post.jpg"
//   excerpt   one or two sentences shown on the card
//   body      the full story: each line inside [ ] is one paragraph
//
// HOW TO ADD A SPOTLIGHT: copy one block inside BIC_SPOTLIGHT and change it.
//   id        same rules as above
//   name      the person being celebrated
//   title     e.g. "Outstanding Participant, Youth Action Program 2026"
//   photo     the person's picture, e.g. "images/insights/jane.jpg"
//   quote     optional, one short sentence in their own words
//   story     why we are celebrating them: each line is one paragraph
//
// BOLD TEXT: put two stars on each side of the words you want in bold,
//   for example:  "Jane led **three clean-up campaigns** in her community."
//
// Always get the person's permission (and a parent or guardian's permission
// for anyone under 18) before publishing a photo, name or story.
//
// While BIC_BLOG is empty, visitors see "Stories Coming Soon". The moment you
// add your first post, that message disappears by itself. Same for BIC_SPOTLIGHT.
// =====================================================================

const BIC_BLOG = [
  // {
  //   id: "my-youth-action-journey",
  //   title: "What the Youth Action Program Taught Me",
  //   author: "Full Name",
  //   role: "Youth Action Program participant, 2026",
  //   date: "2027-03-15",
  //   tag: "Reflection",
  //   image: "images/insights/my-youth-action-journey.jpg",
  //   excerpt: "One or two sentences that make people want to read more.",
  //   body: [
  //     "First paragraph of the story.",
  //     "Second paragraph of the story, with **some words in bold**."
  //   ]
  // }
];

const BIC_SPOTLIGHT = [
  // {
  //   id: "jane-doe",
  //   name: "Jane Doe",
  //   title: "Outstanding Participant, Youth Action Program 2026",
  //   photo: "images/insights/jane-doe.jpg",
  //   quote: "A short sentence in her own words.",
  //   story: [
  //     "Why we are celebrating her, with **her biggest achievement in bold**.",
  //     "What she did for her community."
  //   ]
  // }
];

// =====================================================================
// LIKES, VIEWS AND COMMENTS  (needs a free Firebase project)
// =====================================================================
// Paste the 4 values Firebase gives you (see the setup steps sent with these
// files). While they are empty, the page works normally but shows no likes,
// views or comments, so visitors never see numbers that are not real.
// These values are meant to be public. They are not passwords.
const BIC_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBD0VmBFzStngCAUBRpFMy-m9QBK6KUnSc",
  authDomain: "bright-impact-community.firebaseapp.com",
  projectId: "bright-impact-community",
  appId: "1:534904342627:web:38c0b64b881e8b2cd65056"
};

// ---------------------------------------------------------------------
// SAMPLE CONTENT: shown ONLY when you open  Insights.html?demo=1
// so you can preview the design (including sample likes and comments).
// Visitors never see it.
// ---------------------------------------------------------------------
const BIC_DEMO_BLOG = [
  {
    id: "sample-post-1", title: "Sample Post: My Journey With the Youth Action Program", author: "Sample Author",
    role: "Youth Action Program participant", date: "2027-03-15", tag: "Reflection",
    excerpt: "This is a sample excerpt. It shows how a short preview of a story looks on the card.",
    body: ["This is a sample paragraph. Real stories from our participants will appear here, with **important moments in bold**.", "This is a second sample paragraph, to show how longer stories are laid out in the reading view."]
  },
  {
    id: "sample-post-2", title: "Sample Post: Why Clean Water Matters in My Community", author: "Sample Author",
    role: "Alumni", date: "2027-02-02", tag: "Community Impact",
    excerpt: "Another sample excerpt, so you can see how several posts sit side by side.",
    body: ["Sample paragraph one.", "Sample paragraph two."]
  },
  {
    id: "sample-post-3", title: "Sample Post: Lessons From My First Clean-Up Campaign", author: "Sample Author",
    role: "Alumni", date: "2027-01-10", tag: "Lessons Learned",
    excerpt: "A third sample excerpt to complete the row.",
    body: ["Sample paragraph one.", "Sample paragraph two."]
  }
];

const BIC_DEMO_SPOTLIGHT = [
  {
    id: "sample-spotlight-1", name: "Sample Person One", title: "Outstanding Participant, Youth Action Program",
    quote: "This is a sample quote in the person's own words.",
    story: ["This is a sample story explaining why this person is being celebrated, with **their biggest achievement in bold**.", "A second sample paragraph about what they did for their community."]
  },
  {
    id: "sample-spotlight-2", name: "Sample Person Two", title: "Volunteer of the Season",
    quote: "This is a sample quote from a volunteer.",
    story: ["This is a sample story celebrating a volunteer.", "A second sample paragraph."]
  },
  {
    id: "sample-spotlight-3", name: "Sample Person Three", title: "Core Team Member",
    quote: "This is a sample quote from a team member.",
    story: ["This is a sample story celebrating a team member.", "A second sample paragraph."]
  }
];