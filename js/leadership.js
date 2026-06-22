/* js/leadership.js - Leadership page animations and script actions */

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    // Inject staggered visual delays for leadership cards
    const cards = document.querySelectorAll('.leadership-card');
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.08}s`;
    });
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
    // Premium hover glow follow (works with leadership.css using --mouse-x / --mouse-y)
    const setGlowVars = (el, clientX, clientY) => {
      const r = el.getBoundingClientRect();

      const x = clientX - r.left;
      const y = clientY - r.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        setGlowVars(card, e.clientX, e.clientY);
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', `0px`);
        card.style.setProperty('--mouse-y', `0px`);
      });
    });

  });
})();

