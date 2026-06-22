/* js/visitor.js - Browser-isolated Visitor Experience analytics tracking */

(function () {
  const STORAGE_KEY_STATS = 'rajvenkadam-visitor-stats';
  const SESSION_KEY = 'rajvenkadam-session-registered';
  
  // Base model setup
  let stats = {
    visitCount: 0,
    firstVisit: null,
    lastVisit: null,
    prevLastVisit: null,
    isReturning: false
  };

  // Helper date formatter
  function formatDate(dateObj) {
    return new Date(dateObj).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Load stats from localStorage
  const localData = localStorage.getItem(STORAGE_KEY_STATS);
  if (localData) {
    try {
      stats = JSON.parse(localData);
      stats.isReturning = true;
    } catch (e) {
      console.warn("Could not read previous visitor logs, resetting database.", e);
    }
  }

  // Increment metrics if it's a new tab session
  if (!sessionStorage.getItem(SESSION_KEY)) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    stats.visitCount += 1;
    stats.prevLastVisit = stats.lastVisit;
    stats.lastVisit = new Date().toISOString();
    
    if (!stats.firstVisit) {
      stats.firstVisit = new Date().toISOString();
    }
    
    // Save state
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
  }

  // Calculate elapsed days
  const firstVisitDate = new Date(stats.firstVisit || new Date());
  const today = new Date();
  const diffTime = Math.abs(today - firstVisitDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

  // Sync metrics to DOM elements on load
  window.addEventListener('DOMContentLoaded', () => {
    // 1. Footer counter values
    const footerCount = document.getElementById('footer-visitor-val');
    const heroCount = document.getElementById('visitor-counter');
    
    // Pad count to look premium (e.g. 0004 instead of 4)
    const paddedCount = String(stats.visitCount);
    
    if (footerCount) footerCount.textContent = paddedCount;
    if (heroCount) heroCount.textContent = paddedCount;

    // 2. Interactive dashboard card rendering (if present on page)
    const dashContainer = document.getElementById('visitor-dashboard');
    function formatVisitorCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString().padStart(' 0');
}

// Bind to your existing HTML UI Visitor Counter value node
const visitorDisplayElement = document.getElementById('footer-visitor-val');
if (visitorDisplayElement) {
  // Replace standard integer text with production shortcodes
  let internalRawVisits = parseInt(visitorDisplayElement.textContent, 10) || 1248; // Fallback example
  visitorDisplayElement.textContent = formatVisitorCount(internalRawVisits);
}
    if (dashContainer) {
      // Build dashboard details dynamically
      const titleEl = document.getElementById('dash-welcome-title');
      const countEl = document.getElementById('dash-visit-count');
      const daysEl = document.getElementById('dash-days-elapsed');
      const lastEl = document.getElementById('dash-last-visit');

      if (titleEl) {
        titleEl.textContent = stats.isReturning 
          ? "Welcome Back, Rajvenkadam Portfolio Explorer!" 
          : "Welcome, Portfolio Explorer!";
      }
      if (countEl) countEl.textContent = stats.visitCount;
      if (daysEl) daysEl.textContent = diffDays === 0 ? "First day!" : `${diffDays} days ago`;
      if (lastEl) {
        lastEl.textContent = stats.prevLastVisit 
          ? formatDate(stats.prevLastVisit) 
          : "First Visit Session";
      }
    }
  });
})();
