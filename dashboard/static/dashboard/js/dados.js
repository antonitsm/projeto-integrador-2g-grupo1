document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.getElementById("mobile-toggle");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".navbar a");

  toggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
    toggle.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      navLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");

      if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        toggle.classList.remove("active");
      }
    });
  });
});