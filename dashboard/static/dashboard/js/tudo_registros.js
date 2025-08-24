document.addEventListener("DOMContentLoaded", function() {
    const registroItens = document.querySelectorAll(".registro-item");

    registroItens.forEach(item => {
        item.addEventListener("click", () => {
            const wrapper = item.parentElement;
            const detalhes = wrapper.querySelector(".registro-detalhes");

            // Fecha todos os outros registros
            document.querySelectorAll(".registro-detalhes").forEach(d => {
                if(d !== detalhes) d.classList.remove("show");
            });
            document.querySelectorAll(".registro-item").forEach(i => {
                if(i !== item) i.classList.remove("active");
            });

            // Alterna o registro clicado
            item.classList.toggle("active");
            detalhes.classList.toggle("show");

            // Preenche detalhes apenas com a observação
            if(detalhes.classList.contains("show")) {
                detalhes.innerHTML = `
                    <p class="registro-observacao">${item.dataset.observacao}</p>
                `;
            }
            // Preenche detalhes apenas com a observação e subtítulo
                if(detalhes.classList.contains("show")) {
                    detalhes.innerHTML = `
                        <h4 class="detalhe-subtitulo">Observação:</h4>
                        <p class="registro-observacao">${item.dataset.observacao}</p>
                    `;
                }
                // Seleciona todos os botões de editar
                const editarBotoes = document.querySelectorAll(".btn-editar");

                editarBotoes.forEach(botao => {
                    botao.addEventListener("click", function(event) {
                        event.stopPropagation(); // impede que o registro abra/feche
                        // o link ainda vai funcionar normalmente
                    });
                });
        });
    });
});