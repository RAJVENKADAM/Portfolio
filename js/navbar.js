/* js/navbar.js - Responsive navigation and interactive site search */

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const searchInput = document.getElementById('nav-search');
    
    // 1. Scroll Shrink Effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // 2. Mobile Responsive Menu
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
      });

      // Close menu when a link is clicked
      navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          menuToggle.classList.remove('open');
          navMenu.classList.remove('open');
        });
      });
    }

    // 3. Highlight Active Page Link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

// (duplicate handler removed - handled above in the same DOM-ready scope)


// Hide header on scroll down, show on scroll up
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    // Scrolling Down - Dismiss Menu
    navbar.classList.remove('nav-visible');
    navbar.classList.add('nav-hidden');
  } else {
    // Scrolling Up - Surface Menu
    navbar.classList.remove('nav-hidden');
    navbar.classList.add('nav-visible');
  }
  lastScrollY = window.scrollY;
});
    let linkMatched = false;

    navLinks.forEach(link => {
      // Clean target name
      const linkHref = link.getAttribute('href');
      
      if (currentPath.includes(linkHref) && linkHref !== 'index.html' && linkHref !== '/') {
        link.classList.add('active');
        linkMatched = true;
      } else {
        link.classList.remove('active');
      }
    });

    // Fallback to Home if nothing matches
    if (!linkMatched && navLinks.length > 0) {
      const homeLink = Array.from(navLinks).find(l => l.getAttribute('href').includes('index.html'));
      if (homeLink) homeLink.classList.add('active');
    }

    // 4. Interactive Site Search Function
    if (searchInput) {
      // Create results container
      const searchResults = document.createElement('div');
      searchResults.className = 'nav-search-results-panel';
      searchResults.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        min-width: 250px;
        background: var(--bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        box-shadow: var(--glass-shadow);
        display: none;
        flex-direction: column;
        max-height: 250px;
        overflow-y: auto;
        z-index: 1050;
        margin-top: 8px;
        font-size: 0.85rem;
      `;
      
      searchInput.parentElement.appendChild(searchResults);

      // Inject search result panel styling
      const style = document.createElement('style');
      style.textContent = `
        .search-res-item {
          padding: 10px 14px;
          border-bottom: 1px solid var(--color-border);
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .search-res-item:hover {
          background-color: rgba(var(--color-primary-rgb), 0.05);
        }
        .search-res-title {
          font-weight: 700;
          color: var(--color-primary);
        }
        .search-res-type {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          float: right;
        }
        .search-res-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `;
      document.head.appendChild(style);

      const sitePages = [
        { title: "Home Profile", url: "index.html", desc: "Rajvenkadam S homepage, career vision and quick highlights." },
        { title: "About Career Journey", url: "about.html", desc: "Details on AMUX initialization, my story, and professional beliefs." },
        { title: "Technical Skills Cloud", url: "skills.html", desc: "Expertise rankings, concepts, and development tools portfolio." },
        { title: "Projects Showcase", url: "projects.html", desc: "BTS Bus tracker, VIBE IDE, Syco productivity dashboards." },
        { title: "Professional Experience Timeline", url: "experience.html", desc: "Founder logs at AMUX and technical support engineer roles." },
        { title: "Leadership Activities", url: "leadership.html", desc: "KIT Idea Lab Ambassadorship, HCLTech ambassador credentials." },
        { title: "Achievements Wall", url: "achievements.html", desc: "Key session counters and performance milestone trackers." },
        { title: "ATS Resume Sheet", url: "resume.html", desc: "Printable and downloadable engineering resume file." },
        { title: "Contact Information", url: "contact.html", desc: "Get in touch directly via forms or social media loops." }
      ];

      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
          searchResults.style.display = 'none';
          return;
        }

        const matches = sitePages.filter(p => 
          p.title.toLowerCase().includes(query) || 
          p.desc.toLowerCase().includes(query)
        );

        searchResults.innerHTML = '';
        if (matches.length > 0) {
          matches.forEach(m => {
            const item = document.createElement('div');
            item.className = 'search-res-item';
            item.innerHTML = `
              <span class="search-res-type">Page</span>
              <div class="search-res-title">${m.title}</div>
              <div class="search-res-desc">${m.desc}</div>
            `;
            item.addEventListener('click', () => {
              window.location.href = m.url;
            });
            searchResults.appendChild(item);
          });
          searchResults.style.display = 'flex';
        } else {
          searchResults.innerHTML = `<div style="padding:14px; text-align:center; color:var(--text-muted);">No results found</div>`;
          searchResults.style.display = 'flex';
        }
      });

      // Close panel on outside click
      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
          searchResults.style.display = 'none';
        }
      });
    }
  });
})();
