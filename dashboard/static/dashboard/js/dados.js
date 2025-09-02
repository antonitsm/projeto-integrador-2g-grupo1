const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        
        // Remove active de todos os links
        navLinks.forEach(l => l.classList.remove("active"));
        
        // Adiciona active ao link clicado
        this.classList.add("active");
        
        // Fecha menu mobile se estiver aberto
        if (navbar.classList.contains("active")) {
            navbar.classList.remove("active");
            mobileToggle.classList.remove("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.getElementById("mobile-toggle");
  const navbar = document.getElementById("navbar");

  toggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
});