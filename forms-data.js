// =====================================================================
// APPLICATION FORM QUESTIONS (edit wording here)
// =====================================================================
const AFRICAN_COUNTRIES = ["Algeria","Angola","Benin","Botswana","Burkina Faso","Burundi","Cabo Verde","Cameroon","Central African Republic","Chad","Comoros","Democratic Republic of the Congo","Republic of the Congo","Côte d'Ivoire","Djibouti","Egypt","Equatorial Guinea","Eritrea","Eswatini","Ethiopia","Gabon","Gambia","Ghana","Guinea","Guinea-Bissau","Kenya","Lesotho","Liberia","Libya","Madagascar","Malawi","Mali","Mauritania","Mauritius","Morocco","Mozambique","Namibia","Niger","Nigeria","Rwanda","São Tomé and Príncipe","Senegal","Seychelles","Sierra Leone","Somalia","South Africa","South Sudan","Sudan","Tanzania","Togo","Tunisia","Uganda","Zambia","Zimbabwe"];
const YES_NO = ["Yes", "No"];
const ESSAY_WORDS = [150, 250];

// ---------- BIC YOUTH ACTION PROGRAM ----------
const YOUTH_FORM = {
  warning: "DO NOT APPLY IF YOU WILL NOT COMMIT; PLEASE DO NOT.",
  intro: "Please complete every required question honestly and in your own words.",
  submitLabel: "Submit Application",
  success: [
    "Thank you for applying to the BIC Youth Action Program!",
    "Your application has been submitted successfully.",
    "The Bright Impact Community team will review your application and contact you using the email address you provided. Please check your inbox regularly, including your spam or junk folder.",
    "Submitting an application does not guarantee selection. Applicants will be contacted about the outcome and any next steps.",
    "Thank you for your interest in taking action for healthier, cleaner, and more sustainable communities."
  ],
  successSign: ["Bright Impact Community (BIC)", "Turning community needs into meaningful action."],
  review: [
    "You meet the age and citizenship requirements.",
    "You can commit to the full program duration.",
    "You have answered all required questions.",
    "You have completed all three essays in your own words.",
    "You have added your video (maximum 90 seconds).",
    "Your contact details are correct.",
    "You have read and accepted the required declarations."
  ],
  sections: [
    { title: "Section 1: Personal Information", fields: [
      { id: "full_name", type: "text", label: "Full legal name", required: true, help: "Enter your full name as it appears on your official documents." },
      { id: "preferred_name", type: "text", label: "Preferred name", help: "What would you like us to call you?" },
      { id: "dob", type: "date", label: "Date of birth", required: true, ageRange: [15, 20] },
      { id: "age", type: "number", label: "Age", required: true, readonly: true, help: "Calculated from your date of birth. You must be between 15 and 20 years old at the time of application." },
      { id: "gender", type: "radio", label: "Gender", options: ["Female", "Male"] },
      { id: "citizenship", type: "select", label: "Country of citizenship", required: true, options: AFRICAN_COUNTRIES, help: "Please specify your African country of citizenship." },
      { id: "residence_country", type: "select", label: "Country of residence", required: true, options: AFRICAN_COUNTRIES.concat(["Other country"]) },
      { id: "region", type: "text", label: "Region, state, or province of residence", required: true },
      { id: "city", type: "text", label: "City, town, or community of residence", required: true },
      { id: "email", type: "email", label: "Email address", required: true, help: "Please provide an email address you check regularly." },
      { id: "email_confirm", type: "email", label: "Confirm your email address", required: true, matches: "email" },
      { id: "phone", type: "tel", label: "Phone number", required: true, help: "Include your country code." },
      { id: "whatsapp", type: "tel", label: "WhatsApp number", required: true, help: "WhatsApp is BIC's only means of communication with participants, so please give an active WhatsApp number. If it is the same as your phone number, enter it again. Include your country code." },
      { id: "internet", type: "radio", label: "Do you have reliable access to the internet?", required: true, options: ["Yes, regularly.", "Yes, but my access is limited.", "Sometimes.", "No."] },
      { id: "school", type: "text", label: "Name of your school or institution", help: "If applicable." },
      { id: "edu_level", type: "select", label: "What is your current educational level?", required: true, options: ["Primary or secondary school", "High school or equivalent", "University or college", "Vocational or technical training", "Online learning or independent study", "Not currently studying", "Other"] }
    ]},
    { title: "Section 2: Eligibility & Commitment", intro: "Please answer the following questions honestly.", fields: [
      { id: "is_african", type: "radio", label: "Are you an African citizen?", required: true, options: YES_NO, mustBe: "Yes", help: "Applicants must be African citizens to qualify.", blockMessage: "Applicants must be African citizens to qualify." },
      { id: "age_ok", type: "radio", label: "Are you between 15 and 20 years old at the time of application?", required: true, options: YES_NO, mustBe: "Yes", blockMessage: "Applicants must be between 15 and 20 years old to qualify." },
      { id: "commit_duration", type: "radio", label: "Can you commit to the full program duration, from November to July?", required: true, options: YES_NO, mustBe: "Yes", blockMessage: "Applicants must be able to commit to the full program duration." },
      { id: "commit_hours", type: "radio", label: "Can you commit to 4 hours per month for meetings, plus flexible hours to carry out your activities?", required: true, options: YES_NO, mustBe: "Yes", blockMessage: "Applicants must be able to commit to the required meeting and activity hours." },
      { id: "participate", type: "radio", label: "Are you willing to organize or participate in community activities throughout the program?", required: true, options: ["Yes", "No", "I would like to understand the expectations better."] },
      { id: "community_access", type: "radio", label: "Do you have access to a community where you could carry out activities?", required: true, options: ["Yes, I have identified a community.", "I have access to a community but have not identified a specific project.", "Not yet, but I am willing to identify one.", "No."] },
      { id: "prior_exp", type: "radio", label: "Have you participated in community service, volunteering, environmental activities, or a youth leadership program before?", required: true, options: YES_NO },
      { id: "prior_exp_desc", type: "textarea", label: "If yes, briefly describe your experience.", showIf: { field: "prior_exp", in: ["Yes"] } }
    ]},
    { title: "Section 3: Your Interest in Community Action", fields: [
      { id: "problem", type: "textarea", label: "What environmental community problem have you personally observed that you would like to help address?", required: true, help: "Briefly describe a problem in your school, neighborhood, village, town, or another community you know well.(This is not an essay)" },
      { id: "affected", type: "textarea", label: "Who is most affected by this problem?", required: true, help: "For example, children, families, students, older people, or the wider community." },
      { id: "causes", type: "textarea", label: "What do you think contributes to this problem?", required: true, help: "Briefly explain what you believe causes or worsens the situation." },
      { id: "took_action", type: "radio", label: "Have you ever taken action to address a community problem?", required: true, options: ["Yes, I have led an activity.", "Yes, I have participated in an activity.", "I have helped informally.", "Not yet, but I want to start."] },
      { id: "took_action_desc", type: "textarea", label: "If you have taken action, describe what you did and what you learned.", required: true, showIf: { field: "took_action", in: ["Yes, I have led an activity.", "Yes, I have participated in an activity.", "I have helped informally."] } }
    ]},
    { title: "Section 4: Essay Questions", intro: "Important: Applicants must answer all three essay questions. We are interested in your personal experiences, observations, ideas, and commitment. There are no perfect answers. Please use your own words and avoid giving generic or AI generated responses. Recommended length: 150–250 words per essay.", fields: [
      { id: "essay1", type: "textarea", words: ESSAY_WORDS, required: true, label: "Essay 1 – Your Motivation: Why do you want to join the BIC Youth Action Program, and what does community service mean to you?", help: "Tell us what motivates you to participate in this program. You may discuss:", bullets: ["An experience that influenced your interest in community service.", "Why clean water, hygiene, sanitation, waste management, or environmental sustainability matters to you.", "What you hope to learn or contribute during the program.", "Why this opportunity is important to you at this point in your life."] },
      { id: "essay2", type: "textarea", words: ESSAY_WORDS, required: true, label: "Essay 2 – A Problem You Want to Solve: Imagine you have the opportunity to address one important problem in your community. What problem would you choose, and what practical steps would you take to address it?", help: "We want to understand how you think about community challenges and possible solutions. In your answer, explain:", bullets: ["The problem you would address and why it matters.", "The people who are affected.", "The actions you would take.", "The people or organizations you would involve.", "How you would determine whether your efforts made a difference."], note: "You do not need a perfect project plan. We want to see how you approach a real problem and think about practical solutions." },
      { id: "essay3", type: "textarea", words: ESSAY_WORDS, required: true, label: "Essay 3 – Commitment and Leadership: The BIC Youth Action Program requires participants to take action in their communities throughout the November–July program period. How would you balance this commitment with your other responsibilities, and what would you do if you encountered challenges?", help: "Your answer should explain:", bullets: ["How you would manage your time.", "How you would remain committed throughout the program.", "How you would work with other people.", "How you would respond if an activity did not go as planned.", "What you would do if you experienced difficulties completing your responsibilities."], note: "We value honesty, perseverance, collaboration, and a willingness to learn." },
      { id: "video", type: "video", required: true, label: "Video Submission (maximum 90 seconds)", help: "Record a video of no more than 90 seconds, speaking in your own words about:", bullets: ["Your interest in joining the BIC Youth Action Program.", "An environmental challenge you want to help solve.", "and how you want to create impact in your community."], note: "A phone camera is fine. Speak clearly and film in a quiet place with good light. Please keep your video within 90 seconds." }
    ]},
    { title: "Section 5: Planning Your Community Action", fields: [
      { id: "stakeholders", type: "textarea", label: "How would you encourage community members, schools, local leaders, volunteers, or other stakeholders to participate in your activities?", required: true },
      { id: "resources", type: "checkbox", label: "What resources or support might you need?", required: true, help: "Select all that apply. Selecting a support option does not guarantee that BIC can provide it.", options: ["Guidance in planning a project", "Mentorship", "Educational materials", "Awareness posters or flyers", "Volunteer support", "Community partnerships", "Funding or supplies", "Help measuring project impact", "Other"] },
      { id: "success_measure", type: "textarea", label: "How would you measure the success of your activity?", required: true, help: "For example, you might track the number of households reached, participants engaged, waste collected, trees planted, or people who received educational information. Choose realistic measures." },
      { id: "updates", type: "radio", label: "Would you be comfortable submitting periodic progress updates about your activities?", required: true, options: ["Yes", "No", "I would like clarification about what the updates involve."] },
      { id: "together", type: "radio", label: "Would you be willing to participate in activities with other program participants?", required: true, options: ["Yes", "No", "It depends on the activity."] }
    ]},
    { title: "Section 6: Leadership, Teamwork & Personal Development", fields: [
      { id: "qualities", type: "checkbox", max: 5, label: "Which qualities best describe you?", required: true, help: "Select up to five.", options: ["Leadership", "Creativity", "Problem-solving", "Communication", "Teamwork", "Reliability", "Initiative", "Organization", "Adaptability", "Empathy", "Public speaking", "Community engagement", "Willingness to learn"] },
      { id: "skills", type: "checkbox", max: 3, label: "Which skills would you most like to develop during the program?", required: true, help: "Select up to three.", options: ["Leadership", "Project planning", "Public speaking", "Community mobilization", "Teamwork", "Communication", "Environmental education", "Problem-solving", "Project monitoring and evaluation", "Time management"] }
    ]},
    { title: "Section 7: Availability & Participation", fields: [
      { id: "available", type: "radio", label: "Are you available to participate in the program from November through July?", required: true, options: ["Yes", "No", "I have some scheduling concerns."] },
      { id: "conflicts", type: "textarea", label: "Are there any commitments that might affect your availability during this period?", help: "You may mention school examinations, family responsibilities, work, or other commitments that could affect your participation." },
      { id: "online", type: "radio", label: "Can you participate in online meetings or program check-ins when scheduled?", required: true, options: ["Yes", "Yes, depending on the time and my internet access.", "No"] }
    ]},
    { title: "Section 8: How Did You Hear About BIC?", fields: [
      { id: "heard", type: "radio", label: "How did you hear about the BIC Youth Action Program?", required: true, options: ["Instagram", "Facebook", "LinkedIn", "WhatsApp", "School or educational institution", "Friend or family member", "Community organization", "Another volunteer or youth leader", "BIC website", "Other"] },
      { id: "referral", type: "text", label: "If someone referred you, you may provide their name." },
      { id: "anything_else", type: "textarea", label: "Is there anything else you would like the selection team to know about you?", help: "Use this space to share any relevant information that has not been covered elsewhere in your application." }
    ]},
    { title: "Section 9: Declarations & Consent", intro: "Please read each statement carefully before submitting your application.", fields: [
      { id: "c_accuracy", type: "consent", required: true, html: "<strong>Accuracy of information.</strong> I confirm that the information I have provided is accurate and complete to the best of my knowledge." },
      { id: "c_commitment", type: "consent", required: true, html: "<strong>Program commitment.</strong> I understand that the BIC Youth Action Program runs from November through July and that participation requires a sustained commitment to program activities and community action." },
      { id: "c_conduct", type: "consent", required: true, html: "<strong>Code of conduct.</strong> I agree to treat community members, fellow participants, volunteers, and BIC representatives respectfully and to follow the program's code of conduct." },
      { id: "c_responsible", type: "consent", required: true, html: "<strong>Responsible participation.</strong> I understand that community activities must be conducted responsibly, with respect for community members, local requirements, personal safety, and the environment." },
      { id: "c_privacy", type: "consent", required: true, html: "<strong>Privacy notice.</strong> I have read the <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">BIC privacy notice</a> and understand how my application information will be used to assess my eligibility, contact me about the program, and administer the selection process." },
      { id: "c_comms", type: "consent", required: true, html: "<strong>Communication.</strong> I agree to receive communications from BIC about my application and the program." },
      { id: "c_guardian", type: "consent", required: true, showIf: { field: "age", lt: 18 }, html: "<strong>Parent or guardian consent.</strong> I understand that parent or legal guardian consent may be required before I participate in the program." },
      { id: "c_photo", type: "consent", html: "<strong>Photographs or stories (optional).</strong> I would like to receive information about opportunities to have my photograph, story, or project featured in BIC communications. This is optional and does not affect my application." }
    ]}
  ]
};

// ---------- VOLUNTEER FORMS ----------
function volunteerForm(o) {
  const fields = [
    { id: "full_name", type: "text", label: "Full name", required: true },
    { id: "email", type: "email", label: "Email address", required: true },
    { id: "phone", type: "tel", label: "Phone number / WhatsApp number", required: true, help: "Include your country code." },
    { id: "country", type: "select", label: "Country", required: true, options: ["Cameroon", "Other country"], mustBe: "Cameroon", help: "You must be living in Cameroon.", blockMessage: "Volunteers must be living in Cameroon." },
    { id: "city", type: "text", label: "City", required: true },
    { id: "age", type: "number", label: "Age", required: true, min: 1, max: 120 },
    { id: "applicant_type", type: "radio", label: "Are you applying as an individual or representing an organization?", required: true, options: ["Individual", "Representing an organization"] },
    { id: "org_name", type: "text", label: "Name of your organization", required: true, showIf: { field: "applicant_type", in: ["Representing an organization"] } },
    { id: "why", type: "textarea", words: [100, 150], required: true, label: o.why, help: "Short answer, 100–150 words." }
  ];
  if (o.skills) {
    fields.push({ id: "skills", type: "textarea", required: true, label: "What skills or experience would you bring to this program?" });
  } else {
    fields.push({ id: "prior_exp", type: "radio", required: true, label: o.expLabel, options: YES_NO });
    fields.push({ id: "prior_exp_desc", type: "textarea", required: true, label: o.expDescLabel, showIf: { field: "prior_exp", in: ["Yes"] } });
  }
  fields.push(
    { id: "contribute", type: "checkbox", required: true, label: "How would you prefer to contribute?", help: "Select all that apply.", options: o.contribute },
    { id: "contribute_other", type: "text", required: true, label: "Please specify how else you would like to contribute.", showIf: { field: "contribute", includes: "Other" } },
    { id: "availability", type: "textarea", required: true, label: "When are you available to volunteer?" },
    { id: "can_commit", type: "radio", required: true, label: "Can you commit to the responsibilities assigned to you?", options: YES_NO },
    { id: "anything_else", type: "textarea", label: "Anything else you would like us to know? (Optional)" }
  );
  if (o.projectField) fields.unshift({ id: "project_name", type: "text", required: true, label: "Which special project are you applying for?" });
  return {
    intro: o.purpose,
    submitLabel: "Submit Volunteer Application",
    success: [
      "Thank you for volunteering with " + o.name + "!",
      "Your volunteer application has been submitted successfully.",
      "The Bright Impact Community team will review your application and contact you using the details you provided. Please check your messages regularly, including your spam or junk folder.",
      "Submitting an application does not guarantee a volunteer place. We will contact you about the outcome and any next steps."
    ],
    successSign: ["Bright Impact Community (BIC)", "Turning community needs into meaningful action."],
    sections: [{ title: "Volunteer Application", fields: fields }]
  };
}

const BIC_FORMS = {
  "youth-action": YOUTH_FORM,
  "back-to-school": volunteerForm({
    name: "the BIC Back-to-School Support Program",
    purpose: "Purpose: Helping provide school supplies and educating children in underserved communities about clean water, hygiene, sanitation, and waste management.",
    why: "Why would you like to volunteer for the BIC Back-to-School Support Program?",
    skills: true,
    contribute: ["Helping organize school supplies", "Supporting outreach activities", "Educating children about hygiene and sanitation", "Fundraising or donations", "Communications and social media", "Other"]
  }),
  "community-outreach": volunteerForm({
    name: "BIC Community Outreach",
    purpose: "Purpose: Supporting visits to underserved families through donations and education on clean water, hygiene, sanitation, and waste management.",
    why: "Why would you like to join BIC Community Outreach?",
    expLabel: "Do you have any previous volunteering or community outreach experience?",
    expDescLabel: "If yes, briefly describe it.",
    contribute: ["Community visits and engagement", "Educating families about hygiene and sanitation", "Donation collection and distribution", "Fundraising and resource mobilization", "Photography, communications, and social media", "Planning and coordination", "Other"]
  }),
  "green-communities": volunteerForm({
    name: "the BIC Green Communities Program",
    purpose: "Purpose: Engaging volunteers in community cleanups, tree planting, waste management education, and environmental awareness campaigns.",
    why: "Why would you like to volunteer for the BIC Green Communities Program?",
    expLabel: "Have you participated in any environmental or community activities before?",
    expDescLabel: "If yes, briefly describe your experience.",
    contribute: ["Community cleanups", "Tree planting", "Waste management education", "Environmental awareness campaigns", "Designing posters and flyers", "Communications and social media", "Planning and coordination", "Other"]
  }),
  "special-projects": volunteerForm({
    name: "BIC Special Projects",
    purpose: "Purpose: Supporting grant-funded, partner-supported, or specially organized BIC projects as they are announced.",
    why: "Why would you like to volunteer for this BIC Special Project?",
    skills: true,
    projectField: true,
    contribute: ["Project planning and coordination", "Community engagement", "Education and awareness activities", "Fundraising or resource mobilization", "Photography, communications, and social media", "Logistics and field support", "Other"]
  })
};
