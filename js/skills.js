/* js/skills.js - Hydrate skills categorizations, progress trackers, and tags */

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('skills-categories-grid');
    const cloudContainer = document.getElementById('tech-cloud-container');
    
    if (!categoriesContainer) return;

    const categoryNames = {
      programming: { title: "Programming Languages", icon: "code-2" },
      frontend: { title: "Frontend Frameworks", icon: "layout-template" },
      backend: { title: "Backend Environments", icon: "server" },
      database: { title: "Databases & Cloud", icon: "database" },
      tools: { title: "Developer Tools", icon: "wrench" },
      concepts: { title: "Core CS Principles", icon: "brain-circuit" }
    };

    function renderSkills(data) {
      categoriesContainer.innerHTML = '';
      if (cloudContainer) cloudContainer.innerHTML = '';

      Object.keys(data).forEach(catKey => {
        const catDetails = categoryNames[catKey] || { title: catKey, icon: "terminal" };
        const skillsList = data[catKey];

        // 1. Render progress bar card
        const card = document.createElement('div');
        card.className = 'glass-card skill-category-card reveal active';
        
        let itemsHTML = '';
        skillsList.forEach(item => {
          itemsHTML += `
            <div class="skill-item">
              <div class="skill-info">
                <span>${item.name}</span>
              </div>
            </div>
          `;

          // 2. Render cloud badge (if cloudContainer exists)
          if (cloudContainer) {
            const badge = document.createElement('span');
            badge.className = 'tech-tag-badge';
            badge.innerHTML = `${item.name}`;
            cloudContainer.appendChild(badge);
          }
        });

        card.innerHTML = `
          <h6 class="skill-cat-header">
            </i> ${catDetails.title}
          </h6>
          <div class="skill-items-list">
            ${itemsHTML}
          </div>
        `;
        categoriesContainer.appendChild(card);
      });

      // Initialize icons dynamically added
      if (window.lucide) window.lucide.createIcons();

      // Trigger progress bar transitions after rendering
      setTimeout(() => {
        const bars = document.querySelectorAll('.skill-progress-bar');
        bars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth;
        });
      }, 200);
    }

    // Load data from file
    fetch('data/skills.json')
      .then(response => {
        if (!response.ok) throw new Error("Skills query failed");
        return response.json();
      })
      .then(data => {
        renderSkills(data);
      })
      .catch(err => {
        console.warn("Could not query dynamic skills, using fallback system.", err);
        renderSkills(fallbackSkills);
      });
  });
})();
