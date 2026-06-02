document.addEventListener("DOMContentLoaded", () => {
  // Reveal on scroll
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("reveal--visible"));
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Form submit
  const form = document.querySelector(".contacts-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      btn.textContent = "Заявка отправлена!";
      btn.disabled = true;
      btn.style.opacity = "0.7";
    });
  }

  // === Hero Frame Scroll Animation ===
  const wrapper = document.querySelector('.hero-scroll-wrapper');
  if (wrapper) {
    const layers = [1,2,3].map(i => document.getElementById('hero-layer-' + i));
    const labels = [1,2,3].map(i => document.getElementById('hero-label-' + i));

    function updateHero() {
      const rect = wrapper.getBoundingClientRect();
      const total = wrapper.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / total));

      if (p < 0.33) {
        layers[0].style.opacity = 1;
        layers[1].style.opacity = 0;
        layers[2].style.opacity = 0;
        labels[0].style.opacity = 1;
        labels[1].style.opacity = 0;
        labels[2].style.opacity = 0;
      } else if (p < 0.66) {
        const t = (p - 0.33) / 0.33;
        layers[0].style.opacity = 1;
        layers[1].style.opacity = t;
        layers[2].style.opacity = 0;
        labels[0].style.opacity = 1 - t;
        labels[1].style.opacity = t;
        labels[2].style.opacity = 0;
      } else {
        const t = (p - 0.66) / 0.34;
        layers[0].style.opacity = 1;
        layers[1].style.opacity = 1;
        layers[2].style.opacity = t;
        labels[0].style.opacity = 0;
        labels[1].style.opacity = 1 - t;
        labels[2].style.opacity = t;
      }
    }

    window.addEventListener('scroll', updateHero, { passive: true });
    updateHero();
  }
});
