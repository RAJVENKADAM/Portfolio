/* js/theme.js - Instant theme detection and toggling */

(function () {
  // Retrieve saved theme preference, or fall back to system preference
  const savedTheme = localStorage.getItem('rajvenkadam-portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  // Set theme attribute on root element
  document.documentElement.setAttribute('data-theme', initialTheme);
  
  // Initialize controls once DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;
    
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('rajvenkadam-portfolio-theme', newTheme);
      
      // Notify active canvas particles or page charts of theme changes
      window.dispatchEvent(new CustomEvent('themechanged', { detail: { theme: newTheme } }));
    });
  });
})();
