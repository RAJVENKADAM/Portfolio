/* js/achievements.js - Smooth count-up animations and milestones wall hydrator */
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
(function () {
  window.addEventListener('DOMContentLoaded', () => {
    // 1. Numeric Count-Up Animation
    const counters = document.querySelectorAll('.achieve-counter-number');
    const duration = 2000; // Total duration in ms

    function easeOutQuad(t) {
      return t * (2 - t);
    }

    function animateCounters() {
      counters.forEach(counter => {
        const targetValue = parseFloat(counter.getAttribute('data-target'));
        const startValue = 0;
        let startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const easedProgress = easeOutQuad(progress);
          const currentValue = startValue + easedProgress * (targetValue - startValue);

          // Handle decimal numbers (like CGPA) differently from whole integers
          if (targetValue % 1 !== 0) {
            counter.textContent = currentValue.toFixed(1);
          } else {
            counter.textContent = Math.floor(currentValue);
          }

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            // Guarantee final value matches target exactly
            counter.textContent = targetValue;
            
            // Add '+' indicator if applicable
            if (targetValue === 100 || targetValue === 6 || targetValue === 4) {
              counter.textContent = targetValue + '+';
            }
          }
        }

        requestAnimationFrame(step);
      });
    }

    // Start counters animation
    animateCounters();

    // 2. Hydrate Achievements Wall dynamically from achievements.json
    const wallContainer = document.getElementById('milestones-wall-container');
    if (!wallContainer) return;

    const fallbackMilestones = [
      {
        "year": "2024",
        "title": "Founded AMUX",
        "description": "Launched the practical technology learning platform to provide hands-on experience, collaborative projects, and industry networking for engineering peers."
      },
      {
        "year": "2025",
        "title": "Technical Support Internship",
        "description": "Completed internship at Thulir Home Care Products, initiating hardware improvements and digitizing inventory logging processes."
      },
      {
        "year": "2025",
        "title": "Campus Ambassadorships",
        "description": "Selected as the official HCLTech Campus Ambassador and KIT Idea Lab Ambassador to champion collaborative coding events."
      },
      {
        "year": "2026",
        "title": "100+ Technology Sessions Milestone",
        "description": "Successfully completed 100 mentoring cycles, helping dozens of engineering students build operational full-stack programs."
      }
    ];

    function renderWall(data) {
      wallContainer.innerHTML = '';
      data.forEach(m => {
        const card = document.createElement('div');
        card.className = 'glass-card milestone-wall-card reveal active';
        card.innerHTML = `
          <div class="milestone-wall-year">${m.year}</div>
          <h3 class="milestone-wall-title">${m.title}</h3>
          <p class="milestone-wall-desc">${m.description}</p>
        `;
        wallContainer.appendChild(card);
      });

      window.dispatchEvent(new Event('scroll'));
    }

    fetch('data/achievements.json')
      .then(response => {
        if (!response.ok) throw new Error("JSON milestones fetch failed");
        return response.json();
      })
      .then(data => {
        renderWall(data);
      })
      .catch(err => {
        console.warn("Could not query dynamic achievements, using local data.", err);
        renderWall(fallbackMilestones);
      });
  });
})();
