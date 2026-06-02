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

  // === Hero Frame Auto Loop Animation ===
  const layers = [1,2,3].map(i => document.getElementById('hero-layer-' + i));
  const labels = [1,2,3].map(i => document.getElementById('hero-label-' + i));

  if (layers[0]) {
    // Последовательность: 0 → 1 → 2 → 1 → 0 → ...
    const sequence = [0, 1, 2, 1];
    let current = 0;

    function showSlide(idx) {
      layers.forEach((l, i) => l.style.opacity = i === idx ? 1 : 0);
      labels.forEach((l, i) => l.style.opacity = i === idx ? 1 : 0);
    }

    showSlide(sequence[0]);

    setInterval(() => {
      current = (current + 1) % sequence.length;
      showSlide(sequence[current]);
    }, 2000);
  }
});
