/* js/global.js - Global premium visual features and keyboard easter eggs */

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    // 1. Loader screen removal
    const loader = document.getElementById('loading-screen');
    if (loader) {
      // Fade out smoothly
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
      }, 350);
    }

    // 2. Cursor follow glow tracking
    const mouseGlow = document.createElement('div');
    mouseGlow.className = 'mouse-glow';
    document.body.appendChild(mouseGlow);

    window.addEventListener('mousemove', (e) => {
      mouseGlow.style.left = `${e.clientX}px`;
      mouseGlow.style.top = `${e.clientY}px`;
    });

    // 3. Scroll Progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = `${scrolled}%`;
    });

    // 4. Section Scroll Reveals (IntersectionObserver)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Quote / Fact Generator in footer
    const quoteBox = document.getElementById('footer-quote-box');
    const quoteList = [
      "Technology is best when it brings people together. — Matt Mullenweg",
      "Learning becomes valuable only when converted into execution. — Rajvenkadam S",
      "First, solve the problem. Then, write the code. — John Johnson",
      "Product engineering is the intersection of user empathy and technical execution. — Anonymous",
      "Simplicity is the soul of efficiency. — Austin Freeman"
    ];

    if (quoteBox) {
      const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
      quoteBox.textContent = randomQuote;
    }

    // Style elements injected
    const style = document.createElement('style');
    style.textContent = `
      #close-dev-panel {
        font-family: inherit;
        font-size: 0.9rem;
      }
    `;
    document.head.appendChild(style);

    const logBox = document.getElementById('dev-logs');
    const devInput = document.getElementById('dev-input');
    const closeBtn = document.getElementById('close-dev-panel');

    function logDev(text, type = 'info') {
      const logLine = document.createElement('div');
      logLine.style.color = type === 'error' ? '#FF5555' : type === 'success' ? '#55FF55' : '#00FF00';
      logLine.textContent = `> ${text}`;
      logBox.appendChild(logLine);
      logBox.scrollTop = logBox.scrollHeight;
    }

    window.addEventListener('keydown', (e) => {
      // Ctrl + Shift + D
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        devPanel.classList.toggle('active');
        if (devPanel.classList.contains('active')) {
          devInput.focus();
          logDev("Developer mode activated. Welcome Rajvenkadam's guest.", "success");
        }
      }
    });

    closeBtn.addEventListener('click', () => {
      devPanel.classList.remove('active');
    });

    devInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = devInput.value.toLowerCase().trim();
        devInput.value = '';
        logDev(cmd);

        if (cmd === 'help') {
          logDev("Available commands:");
          logDev("  help         Show command logs");
          logDev("  clear        Clear screen logs");
          logDev("  theme [dark/light] Change theme attributes");
          logDev("  facts        Generate a random technology fact");
          logDev("  visits       Show session visitor profile info");
        } else if (cmd === 'clear') {
          logBox.innerHTML = '';
        } else if (cmd === 'theme dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('rajvenkadam-portfolio-theme', 'dark');
          logDev("Theme set to Dark", "success");
        } else if (cmd === 'theme light') {
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('rajvenkadam-portfolio-theme', 'light');
          logDev("Theme set to Light", "success");
        } else if (cmd === 'facts') {
          const techFacts = [
            "The first computer bug was a real moth trapped in a Harvard Mark II relay in 1947.",
            "JavaScript was written by Brendan Eich in just 10 days in May 1995.",
            "Git was created by Linus Torvalds in 2005 to manage Linux kernel code.",
            "Over 90% of the world's currency exists only on computer servers."
          ];
          const randomFact = techFacts[Math.floor(Math.random() * techFacts.length)];
          logDev(randomFact, "success");
        } else if (cmd === 'visits') {
          const raw = localStorage.getItem('rajvenkadam-visitor-stats');
          if (raw) {
            logDev(`Storage record: ${raw}`, "success");
          } else {
            logDev("No visitor record found in localStorage", "error");
          }
        } else {
          logDev(`Command not recognized: '${cmd}'. Type 'help'.`, "error");
        }
      }
    });

    // 7. Dynamic Local Time clock in header or footers
    const timeBox = document.getElementById('header-local-time');
    if (timeBox) {
      setInterval(() => {
        const local = new Date();
        timeBox.textContent = local.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
      }, 1000);
    }
  });

  // Helper Confetti animation wrapper (uses SVG or canvas constructs)
  window.triggerConfetti = function () {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#0A66C2', '#378FE9', '#00A0DC', '#FFC009', '#FF5555'];

    for (let i = 0; i < 100; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 8 + 3,
        r: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.y < canvas.height) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation * Math.PI / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2);
          ctx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(draw);
      } else {
        canvas.remove();
      }
    }

    draw();
  };
})();
