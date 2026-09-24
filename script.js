document.addEventListener("DOMContentLoaded", () => {
  const links = [...document.querySelectorAll(".sidebar a")];
  const sections = [...document.querySelectorAll(".content section")];
  const topButton = document.getElementById("topButton");

  links.forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      links.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${visible.target.id}`
        );
      });
    },
    {
      rootMargin: "-15% 0px -70% 0px",
      threshold: [0, 0.2, 0.5, 1]
    }
  );

  sections.forEach(section => observer.observe(section));

  topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
