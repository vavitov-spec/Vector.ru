document.addEventListener("DOMContentLoaded", () => {
  // === Hero Image Scale on Scroll ===
  const heroWrapper = document.querySelector('.hero-scroll-wrapper');
  const heroFrame = document.querySelector('.hero-frame');
  if (heroWrapper && heroFrame) {
    function updateHeroScale() {
      const rect = heroWrapper.getBoundingClientRect();
      const total = heroWrapper.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      const scale = 0.85 + 0.15 * p;       // от 0.85 до 1.0
      const translateY = 40 * (1 - p);    // от 40px до 0px
      heroFrame.querySelector('img').style.transform = `scale(${scale}) translateY(${translateY}px)`;
    }
    window.addEventListener('scroll', updateHeroScale, { passive: true });
    updateHeroScale();
  }

  // === Вращающееся слово в hero (fade + blur) ===
  const rotator = document.querySelector(".hero-rotator__word");
  if (rotator) {
    const words = ["Проектирование", "Строительство", "Управление проектами"];
    let index = 0;
    setInterval(() => {
      rotator.classList.add("is-hidden");
      setTimeout(() => {
        index = (index + 1) % words.length;
        rotator.textContent = words[index];
        rotator.classList.remove("is-hidden");
      }, 500); // ждём завершения затухания
    }, 2600);
  }

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

});
