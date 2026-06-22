/* js/experience.js - Experience page animations and scroll triggers */
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
(function () {
  window.addEventListener('DOMContentLoaded', () => {
    // Reveal animation delay cycles for timeline items
    const timelineItems = document.querySelectorAll('.experience-timeline-item');
    timelineItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  });
})();
