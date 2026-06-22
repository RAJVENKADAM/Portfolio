/* js/about.js - Dynamic chronological milestones timeline parsing */

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('history-timeline-container');
    if (!timelineContainer) return;
const fallbackMilestones = [
{
year: "2024",
title: "Completed Higher Secondary Education",
description:
"Successfully completed my school education and developed a strong interest in technology, engineering, innovation, and problem solving."
},
{
year: "2024",
title: "Started B.Tech Information Technology",
description:
"Joined Knowledge Institute of Technology and began my engineering journey with a focus on learning technical fundamentals and exploring various domains of technology."
},
{
year: "Semester 1 (2024-2025)",
title: "Leadership, Writing & Academic Foundation",
description:
"During my first semester, I was selected as a Department Executive Board Member. I also published my first book, 'Agnikanavugal', inspired by Dr. A.P.J. Abdul Kalam's vision and life journey. Alongside these activities, I successfully completed the semester with a CGPA above 8.0 while strengthening my engineering fundamentals."
},
{
year: "Semester 2 (2025)",
title: "Idea Lab Ambassador & Engineering Clinic",
description:
"Started my second semester by becoming the official Idea Lab Ambassador representing my department. After receiving specialized training, I guided fellow students in developing their own PCB Circuit as part of the Engineering Clinic initiative. This experience strengthened my mentoring, communication, and collaborative problem-solving abilities. I completed the semester with a maintained CGPA above 8.0."
},
{
year: "Semester 2 (2025)",
title: "Technical Support Engineer Intern",
description:
"Leveraging my experience in technology and digital platforms, I joined Thulir Home Care Products as a Technical Support Engineer Intern. I contributed to the company's digital transformation initiatives and helped modernize operational processes through technology-driven solutions."
},
{
year: "Semester 3 (2025)",
title: "IoT Mentorship & Product Thinking",
description:
"Continuing as an Idea Lab Ambassador, I received advanced training in IoT and helped students learn the fundamentals of hardware and connected systems. During this period, I worked closely with student teams facing technical challenges and supported them throughout their development journey. Our collective goal was to ensure that every team could achieve a working prototype, creating a stronger culture of practical engineering within the department."
},
{
year: "Semester 3 (2025)",
title: "Discovering Product Development",
description:
"This semester became a major turning point in my journey. While exploring different technologies and building small projects, I discovered a strong interest in product development. I became increasingly curious about how real-world products are designed, built, improved, and scaled. I completed the semester with a maintained CGPA above 8.0."
},
{
year: "Semester 4 (2026)",
title: "AI-Assisted Development & Product Validation",
description:
"Entering my fourth semester, I gained confidence in building software products. I learned how to effectively use AI as a productivity tool while still relying on strong engineering fundamentals. Rather than using AI blindly, I focused on understanding systems, validating ideas, conducting case studies, analyzing user problems, and evaluating product feasibility before development."
},
{
year: "Semester 4 (2026)",
title: "Building Real Projects & Starting AMUX",
description:
"With a stronger understanding of product development, I designed and developed multiple projects across web development, AI, and software engineering domains. During this phase, I also started AMUX as a technology-learning initiative to share practical engineering knowledge, industry exposure, and peer-to-peer learning experiences with fellow students. Currently awaiting semester results."
},
{
year: "Semester 5 (2026 - Present)",
title: "Product Engineer Preparation",
description:
"Beginning my fifth semester, I realized that knowing tools and AI alone is not enough to build enterprise-grade products. My primary focus has shifted toward becoming a strong problem solver and software engineer. I am actively mastering Java, Data Structures & Algorithms, System Design, Databases, Operating Systems, Computer Networks, Frontend Development, Backend Engineering, and software architecture to prepare for product-based engineering roles."
}
];

    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
    function renderTimeline(data) {
      timelineContainer.innerHTML = '';
      data.forEach((m, idx) => {
        const item = document.createElement('div');
        item.className = 'journey-roadmap-item';
        item.style.setProperty('--item-index', idx);

        item.innerHTML = `
          <div class="journey-roadmap-dot" aria-hidden="true"></div>
          <div class="glass-card journey-roadmap-card">
            <div class="journey-roadmap-year">${m.year}</div>
            <div class="journey-roadmap-title">${m.title}</div>
            <div class="journey-roadmap-desc">${m.description}</div>
          </div>
        `;
        timelineContainer.appendChild(item);
      });
      
      // Trigger scroll reveals on dynamically added items
      window.dispatchEvent(new Event('scroll'));
    }
// Add this at the very end of your milestone loading logic in js/about.js
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
   // Use local milestones only
renderTimeline(fallbackMilestones);
  });
})();
