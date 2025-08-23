// ================= OBSERVATION.JS - REGISTRO DE COLMEIAS =================

document.addEventListener("DOMContentLoaded", function() {
    console.log("Sistema de registro de observações carregado");

    // Elementos do formulário
    const tituloInput = document.getElementById("titulo-registro");
    const dataInput = document.getElementById("data-registro");
    const colmeiaInput = document.getElementById("colmeia-registro");
    const observacoesTextarea = document.getElementById("observacoes");

    // Botões
    const btnSalvar = document.getElementById("btn-salvar");
    const btnUltimo = document.getElementById("btn-ultimo");
    const btnLimpar = document.getElementById("btn-limpar");

    // Mensagem de status
    const mensagemStatus = document.getElementById("mensagem-status");

    // Definir data atual como padrão
    if (dataInput) {
        const hoje = new Date().toISOString().split("T")[0];
        dataInput.value = hoje;
    }

    // ================= FUNÇÕES UTILITÁRIAS =================

    function mostrarMensagem(texto, tipo = "info") {
        if (mensagemStatus) {
            mensagemStatus.textContent = texto;
            mensagemStatus.className = `mensagem-status ${tipo}`;
            mensagemStatus.style.display = "block";

            // Auto-ocultar após 5 segundos
            setTimeout(() => {
                mensagemStatus.style.display = "none";
            }, 5000);
        }
    }

    function validarFormulario() {
        const titulo = tituloInput?.value.trim();
        const data = dataInput?.value;
        const colmeia = colmeiaInput?.value.trim();
        const observacoes = observacoesTextarea?.value.trim();

        if (!titulo) {
            mostrarMensagem("Por favor, insira um título para o registro.", "erro");
            tituloInput?.focus();
            return false;
        }

        if (!data) {
            mostrarMensagem("Por favor, selecione uma data para o registro.", "erro");
            dataInput?.focus();
            return false;
        }

        if (!colmeia) {
            mostrarMensagem("Por favor, selecione ou digite uma colmeia.", "erro");
            colmeiaInput?.focus();
            return false;
        }

        if (!observacoes) {
            mostrarMensagem("Por favor, insira suas observações.", "erro");
            observacoesTextarea?.focus();
            return false;
        }

        return true;
    }

    function salvarRegistro() {
        if (!validarFormulario()) return;

        const registro = {
            titulo: tituloInput.value.trim(),
            data: dataInput.value,
            colmeia: colmeiaInput.value.trim(),
            observacoes: observacoesTextarea.value.trim(),
            timestamp: new Date().toISOString()
        };

        try {
            let registros = JSON.parse(localStorage.getItem("registrosColmeias") || "[]");
            registros.push(registro);
            localStorage.setItem("registrosColmeias", JSON.stringify(registros));

            mostrarMensagem("Registro salvo com sucesso!", "sucesso");

            // Limpar formulário após salvar
            setTimeout(() => {
                limparFormulario();
            }, 1500);

            console.log("Registro salvo:", registro);

        } catch (error) {
            console.error("Erro ao salvar registro:", error);
            mostrarMensagem("Erro ao salvar o registro. Tente novamente.", "erro");
        }
    }

    function abrirUltimoRegistro() {
        try {
            const registros = JSON.parse(localStorage.getItem("registrosColmeias") || "[]");

            if (registros.length === 0) {
                mostrarMensagem("Nenhum registro encontrado.", "info");
                return;
            }

            const ultimoRegistro = registros[registros.length - 1];

            if (tituloInput) tituloInput.value = ultimoRegistro.titulo || "";
            if (dataInput) dataInput.value = ultimoRegistro.data || "";
            if (colmeiaInput) colmeiaInput.value = ultimoRegistro.colmeia || "";
            if (observacoesTextarea) observacoesTextarea.value = ultimoRegistro.observacoes || "";

            mostrarMensagem("Último registro carregado com sucesso!", "sucesso");

            console.log("Último registro carregado:", ultimoRegistro);

        } catch (error) {
            console.error("Erro ao carregar último registro:", error);
            mostrarMensagem("Erro ao carregar o último registro.", "erro");
        }
    }

    function limparFormulario() {
        if (tituloInput) tituloInput.value = "";
        if (dataInput) dataInput.value = new Date().toISOString().split("T")[0];
        if (colmeiaInput) colmeiaInput.value = "";
        if (observacoesTextarea) observacoesTextarea.value = "";
        mostrarMensagem("Formulário limpo.", "info");
    }

    // ================= EVENT LISTENERS =================

    if (btnSalvar) btnSalvar.addEventListener("click", e => { e.preventDefault(); salvarRegistro(); });
    if (btnUltimo) btnUltimo.addEventListener("click", e => { e.preventDefault(); abrirUltimoRegistro(); });
    if (btnLimpar) btnLimpar.addEventListener("click", e => {
        e.preventDefault();
        if (confirm("Tem certeza que deseja limpar todos os campos?")) limparFormulario();
    });

    // ================= AUTO-SAVE =================

    let autoSaveTimeout;

    function autoSave() {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            const dadosTemporarios = {
                titulo: tituloInput?.value || "",
                data: dataInput?.value || "",
                colmeia: colmeiaInput?.value || "",
                observacoes: observacoesTextarea?.value || ""
            };
            localStorage.setItem("registroTemporario", JSON.stringify(dadosTemporarios));
        }, 1000);
    }

    if (tituloInput) tituloInput.addEventListener("input", autoSave);
    if (dataInput) dataInput.addEventListener("input", autoSave);
    if (colmeiaInput) colmeiaInput.addEventListener("input", autoSave);
    if (observacoesTextarea) observacoesTextarea.addEventListener("input", autoSave);

    function recuperarDadosTemporarios() {
        try {
            const dadosTemporarios = JSON.parse(localStorage.getItem("registroTemporario") || "{}");

            if (Object.keys(dadosTemporarios).length > 0) {
                if (dadosTemporarios.titulo && tituloInput) tituloInput.value = dadosTemporarios.titulo;
                if (dadosTemporarios.data && dataInput) dataInput.value = dadosTemporarios.data;
                if (dadosTemporarios.colmeia && colmeiaInput) colmeiaInput.value = dadosTemporarios.colmeia;
                if (dadosTemporarios.observacoes && observacoesTextarea) observacoesTextarea.value = dadosTemporarios.observacoes;

                mostrarMensagem("Dados temporários recuperados.", "info");
            }
        } catch (error) {
            console.error("Erro ao recuperar dados temporários:", error);
        }
    }

    recuperarDadosTemporarios();

    // ================= ATALHOS DE TECLADO =================

    document.addEventListener("keydown", function(e) {
        if (e.ctrlKey && e.key === "s") { e.preventDefault(); salvarRegistro(); }
        if (e.ctrlKey && e.key === "l") { e.preventDefault(); if (confirm("Tem certeza que deseja limpar todos os campos?")) limparFormulario(); }
        if (e.ctrlKey && e.key === "u") { e.preventDefault(); abrirUltimoRegistro(); }
    });

    // ================= MELHORIAS DE UX =================

    // Contador de caracteres para observações
    if (observacoesTextarea) {
        const contadorDiv = document.createElement("div");
        contadorDiv.style.cssText = `
            text-align: right;
            font-size: 12px;
            color: #666;
            margin-top: 5px;
            font-family: 'Montserrat', sans-serif;
        `;
        observacoesTextarea.parentNode.appendChild(contadorDiv);

        function atualizarContador() {
            const caracteres = observacoesTextarea.value.length;
            contadorDiv.textContent = `${caracteres} caracteres`;

            contadorDiv.style.color = caracteres > 1000 ? '#d4a017' : '#666';
        }

        observacoesTextarea.addEventListener("input", atualizarContador);
        atualizarContador();
    }

    // ================= VALIDAÇÃO EM TEMPO REAL =================

    function adicionarValidacaoTempoReal(campo, condicao, mensagemErro) {
        if (!campo) return;

        const aviso = document.createElement("div");
        aviso.style.color = "#d9534f"; // vermelho
        aviso.style.fontSize = "12px";
        aviso.style.marginTop = "3px";
        campo.parentNode.appendChild(aviso);

        campo.addEventListener("input", () => {
            aviso.textContent = condicao(campo.value) ? "" : mensagemErro;
        });
    }

    adicionarValidacaoTempoReal(
        tituloInput,
        valor => valor.length >= 3,
        "O título deve ter pelo menos 3 caracteres."
    );

    adicionarValidacaoTempoReal(
        colmeiaInput,
        valor => valor.length >= 1,
        "Por favor, selecione uma colmeia."
    );

    console.log("Sistema de registro de observações inicializado com sucesso!");
});
