/* js/home.js - Typing animations and homepage telemetry count-up */

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    // 1. Roles typewriter animation
    const roleElement = document.getElementById('typed-role');
    const roles = [
      "Product Engineer Aspirant",
      "Campus Ambassador",
      "Problem Solver",
      "Founder of AMUX"
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeRole() {
      if (!roleElement) return;
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50; // Speed up deletion
      } else {
        roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 50; // Normal typing speed
      }
      
      if (!isDeleting && currentCharIndex === currentRole.length) {
        // Pause at full word
        isDeleting = true;
        typingSpeed = 2000; 
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next word
      }
      
      setTimeout(typeRole, typingSpeed);
    }
    // NOTE: Achievements carousel implementation was moved inline into index.html.
    // The previous logic here conflicted with the inline carousel (two systems acting on the same DOM).
    // Keeping this file focused on typing animation only.
    document.addEventListener("DOMContentLoaded", () => {
      // no-op
    });

    // Start typing loop
    setTimeout(typeRole, 1000);
  });
})();

