document.addEventListener("DOMContentLoaded", function() {
    const registroItens = document.querySelectorAll(".registro-item");

    registroItens.forEach(item => {
        item.addEventListener("click", () => {
            const wrapper = item.parentElement;
            const detalhes = wrapper.querySelector(".registro-detalhes");

            // Fecha todos os outros registros
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

            // Evita que clique no botão de editar feche/abra o registro
            const editarBotoes = document.querySelectorAll(".btn-editar");
            editarBotoes.forEach(botao => {
                botao.addEventListener("click", function(event) {
                    event.stopPropagation();
                });
            });
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-registro");
  const limparBtn = document.getElementById("btn-limpar");

  if (!form || !limparBtn) return;

  // Se quiser zerar tudo (em vez de só resetar para os valores iniciais), use isto:
  limparBtn.addEventListener("click", () => {
    // Volta ao estado inicial
    form.reset();

    // Zera de verdade campos texto/numérico/data/tempo/textarea
    form.querySelectorAll("input[type='text'], input[type='number'], input[type='date'], input[type='email'], input[type='time'], textarea")
        .forEach(el => el.value = "");

    // Selects: volta para a primeira opção
    form.querySelectorAll("select").forEach(el => {
      el.selectedIndex = 0;
      el.dispatchEvent(new Event("change"));
    });

    // Checkboxes e radios: desmarca
    form.querySelectorAll("input[type='checkbox'], input[type='radio']").forEach(el => {
      el.checked = false;
    });

    // Arquivos
    form.querySelectorAll("input[type='file']").forEach(el => el.value = "");
  });
});
});