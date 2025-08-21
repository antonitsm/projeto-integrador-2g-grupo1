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

            // Preenche detalhes se estiver abrindo
            if(detalhes.classList.contains("show")) {
                detalhes.innerHTML = `
                    <div class="detalhe-item">
                        <span class="detalhe-label">Título:</span>
                        <span class="detalhe-valor">${item.querySelector("h3").textContent}</span>
                    </div>
                    <div class="detalhe-item">
                        <span class="detalhe-label">Data:</span>
                        <span class="detalhe-valor">${item.querySelector(".registro-data").textContent.replace('Data: ','')}</span>
                    </div>
                    <div class="detalhe-item">
                        <span class="detalhe-label">Colmeia:</span>
                        <span class="detalhe-valor">${item.querySelector(".registro-colmeia").textContent.replace('Colmeia: ','')}</span>
                    </div>
                    <div class="detalhe-item">
                        <span class="detalhe-label">Tipo de Inspeção:</span>
                        <span class="detalhe-valor">${item.querySelector(".registro-tipo").textContent}</span>
                    </div>
                `;
            }
        });
    });
});
