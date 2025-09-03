// ===== REGISTROS =====
document.addEventListener("DOMContentLoaded", function() {
    const registroItens = document.querySelectorAll(".registro-item");

    registroItens.forEach(item => {
        item.addEventListener("click", () => {
            const wrapper = item.parentElement;
            const detalhes = wrapper.querySelector(".registro-detalhes");

            // Fecha outros
            document.querySelectorAll(".registro-detalhes").forEach(d => {
                if (d !== detalhes) d.classList.remove("show");
            });
            document.querySelectorAll(".registro-item").forEach(i => {
                if (i !== item) i.classList.remove("active");
            });

            // Alterna o registro clicado
            item.classList.toggle("active");
            detalhes.classList.toggle("show");

            // Botão editar não fecha registro
            const editarBotoes = document.querySelectorAll(".btn-editar");
            editarBotoes.forEach(botao => {
                botao.addEventListener("click", function(event) {
                    event.stopPropagation();
                });
            });
        });
    });
});


// ===== MENU HAMBÚRGUER =====
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuToggle = document.getElementById("mobile-toggle");
    const navbar = document.getElementById("navbar");

    if (!mobileMenuToggle || !navbar) return; // <-- evita erro caso não exista

    mobileMenuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });

    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    const menuLinks = navbar.querySelectorAll("a");
    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
        });
    });

    document.addEventListener("click", (event) => {
        if (!mobileMenuToggle.contains(event.target) && !navbar.contains(event.target)) {
            navbar.classList.remove("active");
        }
    });
});
