document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  // Reveal sections gently as they enter the viewport.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Static demo form: prepare a prefilled email instead of collecting data on a server.
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const service = String(data.get("service") || "").trim();
      const message = String(data.get("message") || "").trim();

      // Replace this address with the CA firm's real email before publishing.
      const recipient = "replace-with-real-email@example.com";
      const subject = encodeURIComponent(`Website enquiry: ${service}`);
      const body = encodeURIComponent(
        `Hello Meridian & Co.,\n\nMy name is ${name}.\nEmail: ${email}\nService: ${service}\n\nRequirement:\n${message || "I would like to discuss this service."}\n\nRegards,\n${name}`
      );

      if (status) status.textContent = "Opening your email app with a prefilled enquiry…";
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }
});
