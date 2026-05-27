document.addEventListener("DOMContentLoaded", () => {
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

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Form submit handler
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
});


  // === Build Story Animation ===
  const buildSection = document.querySelector('.build-section');
  if (buildSection) {
    const layers = [1,2,3].map(i => document.getElementById('layer-'+i));
    const labels = [1,2,3].map(i => document.getElementById('label-'+i));

    function updateBuild() {
      const rect = buildSection.getBoundingClientRect();
      const total = buildSection.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / total));

      if (p < 0.33) {
        const t = p / 0.33;
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

    window.addEventListener('scroll', updateBuild, {passive: true});
    updateBuild();
  }
