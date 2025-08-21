console.log("Header carregado!");

document.getElementById("cadastro2")?.addEventListener("click", function() {
    window.location.href = "loginP2.html";
});

// Script para menu mobile
const mobileToggle = document.getElementById("mobile-toggle");
const navbar = document.getElementById("navbar");
const header = document.getElementById("header");

mobileToggle.addEventListener("click", function() {
    this.classList.toggle("active");
    navbar.classList.toggle("active");
});

// Script para efeito de scroll no header
window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Script para destacar link ativo
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

// Fechar menu mobile ao clicar fora
document.addEventListener("click", function(e) {
    if (!navbar.contains(e.target) && !mobileToggle.contains(e.target)) {
        navbar.classList.remove("active");
        mobileToggle.classList.remove("active");
    }
});
