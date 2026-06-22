/* js/contact.js - WhatsApp Contact Form */

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

      // Validation
      if (!name || !email || !subject || !message) {
        showStatus("Please fill in all fields before submitting.", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus("Please enter a valid email address.", "error");
        return;
      }

      showStatus("Opening WhatsApp...", "info");

      const whatsappMessage =
`New Portfolio Contact Request
Name: ${name}
Email: ${email}
Subject: ${subject}
Message:
${message}`;

      const whatsappURL =
        `https://wa.me/919629798166?text=${encodeURIComponent(whatsappMessage)}`;

      setTimeout(() => {
        window.open(whatsappURL, '_blank');

        showStatus(
          "WhatsApp opened successfully. Please click Send in WhatsApp.",
          "success"
        );

        form.reset();

        if (typeof window.triggerConfetti === 'function') {
          window.triggerConfetti();
        }
      }, 500);
    });

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    function showStatus(msg, type) {
      if (!statusAlert) return;

      statusAlert.textContent = msg;
      statusAlert.className = 'form-status-alert';

      if (type === 'success') {
        statusAlert.classList.add('success');
      } else if (type === 'error') {
        statusAlert.classList.add('error');
      } else {
        statusAlert.style.display = 'block';
        statusAlert.style.backgroundColor = 'rgba(var(--color-primary-rgb), 0.08)';
        statusAlert.style.color = 'var(--color-primary)';
        statusAlert.style.border = '1px solid var(--color-border)';
      }
    }
  });
})();
