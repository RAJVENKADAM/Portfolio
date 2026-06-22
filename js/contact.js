/* js/contact.js - Contact form validation and submission simulation */

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const statusAlert = document.getElementById('form-status');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      // Basic Validation
      if (!name || !email || !subject || !message) {
        showStatus("Please fill in all fields before submitting.", "error");
        return;
      }

      // Email Format Check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus("Please enter a valid email address.", "error");
        return;
      }

      // Simulate sending logs
      showStatus("Dispatching message...", "info");
      
      setTimeout(() => {
        showStatus("Message sent successfully! Rajvenkadam will contact you shortly.", "success");
        form.reset();
        
        // Trigger celebratory confetti on message success
        if (typeof window.triggerConfetti === 'function') {
          window.triggerConfetti();
        }
      }, 1500);
    });
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
    function showStatus(msg, type) {
      if (!statusAlert) return;

      statusAlert.textContent = msg;
      statusAlert.className = 'form-status-alert'; // Reset

      if (type === 'success') {
        statusAlert.classList.add('success');
      } else if (type === 'error') {
        statusAlert.classList.add('error');
      } else {
        // Standard loading status
        statusAlert.style.display = 'block';
        statusAlert.style.backgroundColor = 'rgba(var(--color-primary-rgb), 0.05)';
        statusAlert.style.color = 'var(--color-primary)';
        statusAlert.style.border = '1px solid var(--color-border)';
      }
    }
  });
})();
