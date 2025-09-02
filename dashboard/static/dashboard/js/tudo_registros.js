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

            // Preenche detalhes
            if (detalhes.classList.contains("show")) {
                detalhes.innerHTML = `
                    <h4 class="detalhe-subtitulo">Observação:</h4>
                    <p class="registro-observacao">${item.dataset.observacao}</p>
                `;
            }

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


// ===== LIMPAR FORM =====
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-registro");
    const limparBtn = document.getElementById("btn-limpar");

    if (!form || !limparBtn) return;

    limparBtn.addEventListener("click", () => {
        form.reset();

        form.querySelectorAll("input[type='text'], input[type='number'], input[type='date'], input[type='email'], input[type='time'], textarea")
            .forEach(el => el.value = "");

        form.querySelectorAll("select").forEach(el => {
            el.selectedIndex = 0;
            el.dispatchEvent(new Event("change"));
        });

        form.querySelectorAll("input[type='checkbox'], input[type='radio']").forEach(el => {
            el.checked = false;
        });

        form.querySelectorAll("input[type='file']").forEach(el => el.value = "");
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
