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
//   readTime      put the duration of reading the blog
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
  {
    id: "Unsafe Water In Africa",
    title: "The Water We Drink Is Killing Us.",
    author: "Mensi Abigael",
    role: "Founder at Bright Impact Community",
    date: "2026-11-05",
    readTime: "5 mins",
    image: "images/insights/unsafe-water-blog.jpg",
    excerpt: "The Water We Drink Is Killing Us. So Why Aren't We Louder About It?",
    body: [
     "Let me ask you something simple. When was the last time you thought twice before drinking a glass of water?",
"For a lot of people, the answer is never. You turn a tap, fill a cup, and drink. But for millions of families across Africa, that glass of water is a gamble. Sometimes it's fine. Sometimes it's the reason a child doesn't wake up.",
"I know that sounds dramatic. I wish it were.",
       "**The numbers are hard to look at**",
"Let's start with the big picture. The latest WHO and UNICEF report, released in 2025, says 2.1 billion people around the world still don't have safely managed drinking water. That means water at home, available when they need it, and free from contamination. And 106 million of them drink straight from rivers, ponds and streams with no treatment at all.",
"And Africa? We're at the bottom of the chart. Sub-Saharan Africa had the lowest access of any region in 2024. In the Central African Republic and Chad, 93% of people lacked safely managed drinking water. Ninety-three percent. Read that again.",
"Across the continent, more than 400 million people don't even have a basic water service. In rural areas, four out of every five people lack safely managed drinking water.",
      "**This isn't just about thirst**",
"Here's the part that keeps me up at night. Unsafe water doesn't just make life uncomfortable. It kills.",
"In 2019, unsafe water, sanitation and hygiene were linked to at least 1.4 million deaths worldwide, mostly in Africa and South-East Asia. The WHO estimates that about 510,000 deaths in its African Region could have been prevented with safe water, sanitation and hygiene, and that roughly 73% of all diarrhoeal deaths in the region are tied to these unsafe conditions.",
"Around the world, 395,000 children under five died in a single year because of unsafe water, sanitation and hygiene. Most of them died from diarrhoea. Diarrhoea! Something we already know how to prevent.",
"Then there's cholera. Between January 2024 and March 2025, countries in Eastern and Southern Africa reported more than 178,000 cholera cases and nearly 2,900 deaths. Cholera is a disease of dirty water. It should not still be killing people today.",
      "**The hidden cost women and girls pay**",
"There's another side to this crisis that never shows up in the death toll.",
"In nearly 80% of sub-Saharan African households without water at home, women and girls are the ones who go and fetch it, and a single trip often takes more than 30 minutes. The UN Development Programme estimates that women in sub-Saharan Africa spend around 40 billion hours a year collecting water.",
"Think about what that means for one girl. She wakes up early, walks to the water point, waits in line, and carries a heavy container home. Maybe she makes that trip twice before school. Maybe she doesn't make it to school at all. Every hour spent fetching water is an hour not spent learning, earning or resting. And the water she carries home might still make her little brother sick.",
      "**So what do we actually do?**",
"I'm tired of articles that list scary numbers and then end with **something must be done.** So let me be specific.",
"Governments have to fund it like they mean it. WHO and UNICEF say Africa needs to move 12 times faster on safe drinking water to reach the 2030 goal. That won't happen with small budgets and big speeches. Water needs real money and real accountability.",
"Fix what already exists. Many communities have boreholes and pumps that broke years ago and were never repaired. Maintenance isn't exciting, but a working old pump beats a shiny new one that dies in six months.",
"Make water safe at home. Boiling, chlorine tablets and simple filters are cheap and they work. Teaching families about home treatment and handwashing can save lives this week, not in 2030.",
"Put women in the room. The people who carry the water know exactly where the problems are. They should help design the solutions.",
"Invest because it pays. Every dollar spent on water and sanitation brings back about four dollars through better health and more productive time. This isn't charity. It's one of the smartest investments a country can make.",
"**What you can do today**",
"You don't need to be a minister to help. Support local organisations that build and maintain water points. Share accurate information about safe water with your family and neighbours. Ask your local leaders what the plan is for water in your community, and keep asking. Talk about it online. Silence is part of why this problem has lasted so long.",
"Clean water isn't a luxury. After air, it's the most basic thing a human being needs. The fact that hundreds of millions of Africans still don't have it is not normal, and we should stop treating it like it is.",
"We have the knowledge. We have the tools. What we need now is the will.",
"**So let's get loud about it.**"
    ]
  }
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
