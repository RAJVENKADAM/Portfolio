/* js/gallery.js - Tabbed Gallery Grid & Lightbox Handler */

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('gallery-grid-container');
    const tabButtons = document.querySelectorAll('.gallery-tab-btn');
    const lightbox = document.getElementById('gallery-lightbox');

    if (!gridContainer) return;

    // Local Array containing images from assets/gallery/certificates&achievements/
    const galleryItems = [
      {
        "title": "Workshop Facilitation Certificate",
        "description": "Received official recognition for facilitating a hands-on workshop on LLM Powered AI chatbot development, covering prompt engineering, fine-tuning techniques, and practical applications of large language models.",
        "category": "certificates",
        "image": "assets/gallery/cert/sympo.jpg"
      },
      {
        "title": "Technical Support Engineer Internship",
        "description": "Successfully completed a 1-month internship at Thulir Home Care Products, contributing to the company's digital transformation initiatives and modernizing operational processes through technology-driven solutions.",
        "category": "certificates",
        "image": "assets/gallery/cert/intern.jpg"
      },
      {
        "title": "Hackathon Competitor certificate",
        "description": "Participated in the KPR -  Hack the Horizon 2025, where I collaborated with a team to develop an innovative solution addressing real-world challenges, demonstrating creativity, technical skills, and teamwork under competitive conditions.",
        "category": "certificates",
        "image": "assets/gallery/cert/hackkpr.jpg"
      },
      {
        "title": "NPTEL Certificate",
        "description": "Completed the NPTEL course on 'Introduction To Industry 4.0 And Industrial Internet Of Things', gaining comprehensive knowledge of the principles, technologies, and applications of Industry 4.0 and IIoT in modern industrial settings.",
        "category": "certificates",
        "image": "assets/gallery/cert/nptel.jpg"
      },
      {
        "title": "Idea Presentation Certificate",
        "description": "Received recognition for presenting an innovative idea at the KIOT - Idea pitch 2025, showcasing creativity and potential for real-world innovational ideas.",
        "category": "certificates",
        "image": "assets/gallery/cert/idea1.jpg"
      },
      {
        "title": "Hackathon Competitor certificate",
        "description": "Participated in the DSCE -  Bugslayer'26, where I addressing real-world challenges, demonstrating creativity and teamwork under competitive conditions.",
        "category": "certificates",
        "image": "assets/gallery/cert/hackdsce.jpg"
      },
      {
        "title": "AR/VR course completion certificate",
        "description": "Completed the AR/VR course at KIOT, gaining hands-on experience in developing immersive virtual and augmented reality applications.",
        "category": "certificates",
        "image": "assets/gallery/cert/arvr.jpg"
      },
      {
        "title": "Trained 100+ Students",
        "description": "I trained 100+ students in the symposium's workshop that was conducted by my college. Where I conduct practical Hands-on session on developing LLM Powered AI Chat Bot.",
        "category": "achievements",
        "image": "assets/gallery/achieve/sympo.jpg"
      },
      {
        "title": "Found AMUX",
        "description": "Founded AMUX, a peer-peer learning platform to share my technical experience and to enhance collaborative networking with engineering peers.",
        "category": "achievements",
        "image": "assets/gallery/achieve/amux.jpg"
      },
      {
        "title": "Technical Webinar",
        "description": "As a Founder of AMUX, I give technical webinar to the students who are willing in product development and at the end they developed their own basic web with integrated AI assistant.",
        "category": "achievements",
        "image": "assets/gallery/achieve/webinar1.jpg"
      },
      {
        "title": "HCLTech Campus Ambassador",
        "description": "Around 8000 applications were received from students across India, and I was selected as the official HCLTech Campus Ambassador to represent the company on campus.",
        "category": "achievements",
        "image": "assets/gallery/achieve/hcl.jpg"
      },
      {
        "title": "Executive Board Member",
        "description": "I was selected as the Executive Board Member of my department, where I actively contributed to organizing events, symposiums, and initiatives that enhanced the academic and extracurricular experience for fellow students.",
        "category": "achievements",
        "image": "assets/gallery/achieve/member.jpg"
      },
      {
        "title": "Book Publication",
        "description": "Published my first book, 'Agnikanavugal', inspired by Dr. A.P.J. Abdul Kalam's vision, sharing insights and lessons through metaphorical storytelling to inspire readers with the spirit of innovation and perseverance.",
        "category": "achievements",
        "image": "assets/gallery/achieve/publication.jpg"
      },
      {
        "title": "IDEA Lab Ambassador",
        "description": "Served as the IDEA Lab Ambassador, promoting innovation and research initiatives within the laboratory.",
        "category": "achievements",
        "image": "assets/gallery/achieve/idealab.jpg"
      },
    ];

    /**
     * Renders cards inside the grid layout based on the active tab filter.
     * @param {string} filterCategory - 'all', 'certificates', or 'achievements'
     */
    function renderGallery(filterCategory = 'all') {
      gridContainer.innerHTML = '';

      // If filter is 'all', load everything; otherwise, filter by matching category keys
      const filteredItems = filterCategory === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === filterCategory);

      // Handle empty state situations safely
      if (filteredItems.length === 0) {
        gridContainer.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">
            <p>No gallery items found in this section yet.</p>
          </div>
        `;
        return;
      }

      filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'gallery-card';

        card.innerHTML = `
          <div class="gallery-img-box">
            <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='https://placehold.co/800x450/008299/ffffff?text=Image+Not+Found'">
          </div>
          <div class="gallery-info-box">
            <h3 class="gallery-card-title">${item.title}</h3>
            <p class="gallery-card-desc">${item.description}</p>
          </div>
        `;

        card.addEventListener('click', () => openLightbox(item));
        gridContainer.appendChild(card);
      });
    }

    /**
     * Opens the Lightbox modal and locks underlying body viewports.
     */
    function openLightbox(item) {
      if (!lightbox) return;
      
      const lbImg = document.getElementById('lightbox-img');
      const lbTitle = document.getElementById('lightbox-title');
      const lbDesc = document.getElementById('lightbox-desc');

      if (lbImg) lbImg.setAttribute('src', item.image);
      if (lbTitle) lbTitle.textContent = item.title;
      if (lbDesc) lbDesc.textContent = item.description;
      
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevents background body scrolling
    }

    // Close Lightbox button triggers
    const closeBtn = document.getElementById('close-lightbox');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = 'auto';
      });
    }

    // Close Lightbox when clicking outside the image card block boundary
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.classList.remove('open');
          document.body.style.overflow = 'auto';
        }
      });
    }

    // Setup Navigation Tab Click Routing
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Strict exit check: Let the browser open the resume link natively instead of filtering cards
        if (btn.classList.contains('resume-tab') || btn.tagName === 'A') return;

        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const selectedTab = btn.getAttribute('data-tab');
        renderGallery(selectedTab);
      });
    });

    // Run layout hydration mapping with 'all' selection on load initialization
    renderGallery('all');
    
    // Refresh Lucide Icons inside dynamic DOM outputs if available
    if (window.lucide) window.lucide.createIcons();
  });
})();
