/* js/projects.js - Dynamic project filter grids and case-study details hydrate */

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('projects-grid-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('case-study-modal');
    
    if (!gridContainer) return;

    let projectsData = [];

    function renderGrid(filterValue = 'all') {
      gridContainer.innerHTML = '';
      
      const filtered = filterValue === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === filterValue);

      filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card reveal active';
        
        let tagsHTML = '';
        p.technologies.forEach(t => {
          tagsHTML += `<span class="tech-tag-pill">${t}</span>`;
        });

        // HTML outputs structural updates to handle 1:1 image maps instead of standard icons
        card.innerHTML = `
          <div class="project-card-header">
            <div class="project-image-frame">
              <img src="${p.image || 'https://placehold.co/150x150'}" alt="${p.title}">
            </div>
            <div class="project-meta-info">
              <h3 class="project-card-title">${p.title}</h3>
              <span class="project-category-badge">${p.category}</span>
            </div>
          </div>
          <p class="project-card-description">${p.tagline}</p>
          
          <div class="project-card-actions">
            <button class="btn-card-action">View</button>
          </div>
        `;

        card.addEventListener('click', () => openCaseStudy(p));
        gridContainer.appendChild(card);
      });

      if (window.lucide) window.lucide.createIcons();
    }

    // Modal Details Deep Clean Hydration
    function openCaseStudy(project) {
      if (!modal) return;
      
      const mTitle = document.getElementById('modal-title');
      const mDesc = document.getElementById('modal-desc');
      const mChallenge = document.getElementById('modal-challenge');
      const mLearning = document.getElementById('modal-learning');
      const mFeatures = document.getElementById('modal-features-list');
      const mTech = document.getElementById('modal-tech-list');
      const mGetBtn = document.getElementById('modal-btn-get');
      const mCounter = document.getElementById('modal-download-counter');

      if (mFeatures) mFeatures.innerHTML = '';
      if (mTech) mTech.innerHTML = '';

      if (mTitle) mTitle.textContent = project.title;
      if (mDesc) mDesc.textContent = project.description;
      if (mChallenge) mChallenge.textContent = project.challenges || "No distinct hardware constraints encountered.";
      if (mLearning) mLearning.textContent = project.learning || "Enhanced design pattern structures and asynchronous handling loops.";
      
      // Resets dynamic base installations display metrics
      if (mCounter) {
        const standardBase = Math.floor(Math.random() * 200) + 150;
        mCounter.textContent = standardBase;
        mCounter.setAttribute('data-count', standardBase);
      }

      if (mFeatures) {
        const features = project.features || ["Comprehensive engineering workflow setup"];
        features.forEach(f => {
          const li = document.createElement('li');
          li.className = 'modal-section-body';
          li.style.cssText = 'display:flex; align-items:center; gap:8px; margin-bottom:6px;';
          li.innerHTML = `<i data-lucide="check" style="width:14px; height:14px; color:var(--color-brand); flex-shrink:0;"></i> <span>${f}</span>`;
          mFeatures.appendChild(li);
        });
      }

      if (mTech) {
        project.technologies.forEach(t => {
          const tag = document.createElement('span');
          tag.className = 'tech-tag-pill';
          tag.textContent = t;
          mTech.appendChild(tag);
        });
      }

      // Sets target redirection execution link
      if (mGetBtn) mGetBtn.setAttribute('href', project.github || '#');

      if (window.lucide) window.lucide.createIcons();
      
      modal.classList.add('open');
      document.body.style.overflow = 'hidden'; 
    }

    // Dynamic Download Counter Click Interceptor Tracking
    const getButton = document.getElementById('modal-btn-get');
    if (getButton) {
      getButton.addEventListener('click', () => {
        const counterNode = document.getElementById('modal-download-counter');
        if (counterNode) {
          let currentCount = parseInt(counterNode.getAttribute('data-count'), 10);
          currentCount++;
          counterNode.textContent = currentCount;
          counterNode.setAttribute('data-count', currentCount);
        }
      });
    }

    // Close Modal Controls
    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
      });
    }

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
      }
    });

    // Wire Category filters
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.getAttribute('data-filter');
        renderGrid(filterVal);
      });
    });

    // Fetch JSON database feeds
    fetch('data/projects.json')
      .then(response => {
        if (!response.ok) throw new Error("Fallback execution called");
        return response.json();
      })
      .then(data => {
        projectsData = data;
        renderGrid('all');
      })
      .catch(() => {
        projectsData = fallbackProjects;
        renderGrid('all');
      });
  });
})();