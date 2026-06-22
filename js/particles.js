/* js/particles.js - High performance dynamic interactive canvas background particles */

(function () {
  let canvas, ctx;
  let particles = [];
  const particleCount = 65;
  const connectionDistance = 110;
  let mouse = { x: null, y: null };
  let theme = document.documentElement.getAttribute('data-theme') || 'light';

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2.5 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap-around bounds
      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

      // Mouse interactive push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          this.x -= dx / dist * force * 0.5;
          this.y -= dy / dist * force * 0.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = theme === 'dark' ? 'rgba(55, 143, 233, 0.4)' : 'rgba(10, 102, 194, 0.25)';
      ctx.fill();
    }
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.forEach(p => p.reset());
  }

  function init() {
    canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Handle theme changes
    window.addEventListener('themechanged', (e) => {
      theme = e.detail.theme;
    });

    // Populate particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    animate();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - (dist / connectionDistance)) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          
          ctx.strokeStyle = theme === 'dark' 
            ? `rgba(55, 143, 233, ${alpha})` 
            : `rgba(10, 102, 194, ${alpha})`;
            
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('DOMContentLoaded', init);
})();
