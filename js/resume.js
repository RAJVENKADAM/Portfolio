/* js/resume.js - Print trigger and confetti feedback */

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const printBtn = document.getElementById('btn-print-resume');
    const downloadBtn = document.getElementById('btn-download-resume');

    function executePrint(e) {
      if (e) e.preventDefault();
      
      // Trigger canvas confetti celebration
      if (typeof window.triggerConfetti === 'function') {
        window.triggerConfetti();
      }

      // Briefly wait to let confetti trigger, then open print dialog
      setTimeout(() => {
        window.print();
      }, 500);
    }

    if (printBtn) {
      printBtn.addEventListener('click', executePrint);
    }

    if (downloadBtn) {
      downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show notification to user about Print to PDF
        if (typeof window.triggerConfetti === 'function') {
          window.triggerConfetti();
        }

        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: var(--color-success);
          color: white;
          padding: 12px 24px;
          border-radius: var(--radius-sm);
          z-index: 9999;
          font-weight: bold;
          font-size: 0.9rem;
          box-shadow: var(--glass-shadow);
          animation: slideIn 0.3s ease;
        `;
        notification.innerHTML = `💾 Tip: Select "Save as PDF" in the print prompt!`;
        document.body.appendChild(notification);

        // Inject animation
        const style = document.createElement('style');
        style.textContent = `
          @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
          notification.remove();
        }, 4000);

        setTimeout(() => {
          window.print();
        }, 700);
      });
    }
  });
})();
