// ================= OBSERVAÇÃO.JS - REGISTRO DE COLMEIAS =================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de registro de observações carregado');
    
    // Elementos do formulário
    const tituloInput = document.getElementById('titulo-registro');
    const dataInput = document.getElementById('data-registro');
    const colmeiaInput = document.getElementById('colmeia-registro');
    const observacoesTextarea = document.getElementById('observacoes');
    
    // Botões
    const btnSalvar = document.getElementById('btn-salvar');
    const btnUltimo = document.getElementById('btn-ultimo');
    const btnLimpar = document.getElementById('btn-limpar');
    
    // Mensagem de status
    const mensagemStatus = document.getElementById('mensagem-status');
    
    // Definir data atual como padrão
    if (dataInput) {
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.value = hoje;
    }
    
    // ================= FUNÇÕES UTILITÁRIAS =================
    
    function mostrarMensagem(texto, tipo = 'info') {
        if (mensagemStatus) {
            mensagemStatus.textContent = texto;
            mensagemStatus.className = `mensagem-status ${tipo}`;
            mensagemStatus.style.display = 'block';
            
            // Auto-ocultar após 5 segundos
            setTimeout(() => {
                mensagemStatus.style.display = 'none';
            }, 5000);
        }
    }
    
    function validarFormulario() {
        const titulo = tituloInput?.value.trim();
        const data = dataInput?.value;
        const colmeia = colmeiaInput?.value.trim();
        const observacoes = observacoesTextarea?.value.trim();
        
        if (!titulo) {
            mostrarMensagem('Por favor, insira um título para o registro.', 'erro');
            tituloInput?.focus();
            return false;
        }
        
        if (!data) {
            mostrarMensagem('Por favor, selecione uma data para o registro.', 'erro');
            dataInput?.focus();
            return false;
        }
        
        if (!colmeia) {
            mostrarMensagem('Por favor, selecione ou digite uma colmeia.', 'erro');
            colmeiaInput?.focus();
            return false;
        }
        
        if (!observacoes) {
            mostrarMensagem('Por favor, insira suas observações.', 'erro');
            observacoesTextarea?.focus();
            return false;
        }
        
        return true;
    }
    
    function limparFormulario() {
        if (tituloInput) tituloInput.value = '';
        if (colmeiaInput) colmeiaInput.value = '';
        if (observacoesTextarea) observacoesTextarea.value = '';
        
        // Manter a data atual
        if (dataInput) {
            const hoje = new Date().toISOString().split('T')[0];
            dataInput.value = hoje;
        }
        
        mostrarMensagem('Formulário limpo com sucesso!', 'info');
        
        // Focar no primeiro campo
        if (tituloInput) tituloInput.focus();
    }
    
    function salvarRegistro() {
        if (!validarFormulario()) {
            return;
        }
        
        const registro = {
            titulo: tituloInput.value.trim(),
            data: dataInput.value,
            colmeia: colmeiaInput.value.trim(),
            observacoes: observacoesTextarea.value.trim(),
            timestamp: new Date().toISOString()
        };
        
        try {
            // Salvar no localStorage (simulação)
            let registros = JSON.parse(localStorage.getItem('registrosColmeias') || '[]');
            registros.push(registro);
            localStorage.setItem('registrosColmeias', JSON.stringify(registros));
            
            mostrarMensagem('Registro salvo com sucesso!', 'sucesso');
            
            // Limpar formulário após salvar
            setTimeout(() => {
                limparFormulario();
            }, 1500);
            
            console.log('Registro salvo:', registro);
            
        } catch (error) {
            console.error('Erro ao salvar registro:', error);
            mostrarMensagem('Erro ao salvar o registro. Tente novamente.', 'erro');
        }
    }
    
    function abrirUltimoRegistro() {
        try {
            const registros = JSON.parse(localStorage.getItem('registrosColmeias') || '[]');
            
            if (registros.length === 0) {
                mostrarMensagem('Nenhum registro encontrado.', 'info');
                return;
            }
            
            const ultimoRegistro = registros[registros.length - 1];
            
            // Preencher formulário com último registro
            if (tituloInput) tituloInput.value = ultimoRegistro.titulo || '';
            if (dataInput) dataInput.value = ultimoRegistro.data || '';
            if (colmeiaInput) colmeiaInput.value = ultimoRegistro.colmeia || '';
            if (observacoesTextarea) observacoesTextarea.value = ultimoRegistro.observacoes || '';
            
            mostrarMensagem('Último registro carregado com sucesso!', 'sucesso');
            
            console.log('Último registro carregado:', ultimoRegistro);
            
        } catch (error) {
            console.error('Erro ao carregar último registro:', error);
            mostrarMensagem('Erro ao carregar o último registro.', 'erro');
        }
    }
    
    // ================= EVENT LISTENERS =================
    
    // Botão Salvar
    if (btnSalvar) {
        btnSalvar.addEventListener('click', function(e) {
            e.preventDefault();
            salvarRegistro();
        });
    }
    
    // Botão Último Registro
    if (btnUltimo) {
        btnUltimo.addEventListener('click', function(e) {
            e.preventDefault();
            abrirUltimoRegistro();
        });
    }
    
    // Botão Limpar
    if (btnLimpar) {
        btnLimpar.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Tem certeza que deseja limpar todos os campos?')) {
                limparFormulario();
            }
        });
    }
    
    // Auto-save no localStorage quando o usuário digita (debounced)
    let autoSaveTimeout;
    
    function autoSave() {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            const dadosTemporarios = {
                titulo: tituloInput?.value || '',
                data: dataInput?.value || '',
                colmeia: colmeiaInput?.value || '',
                observacoes: observacoesTextarea?.value || ''
            };
            
            localStorage.setItem('registroTemporario', JSON.stringify(dadosTemporarios));
        }, 1000);
    }
    
    // Adicionar listeners para auto-save
    [tituloInput, dataInput, colmeiaInput, observacoesTextarea].forEach(element => {
        if (element) {
            element.addEventListener('input', autoSave);
        }
    });
    
    // Recuperar dados temporários ao carregar a página
    function recuperarDadosTemporarios() {
        try {
            const dadosTemporarios = JSON.parse(localStorage.getItem('registroTemporario') || '{}');
            
            if (Object.keys(dadosTemporarios).length > 0) {
                if (dadosTemporarios.titulo && tituloInput) tituloInput.value = dadosTemporarios.titulo;
                if (dadosTemporarios.data && dataInput) dataInput.value = dadosTemporarios.data;
                if (dadosTemporarios.colmeia && colmeiaInput) colmeiaInput.value = dadosTemporarios.colmeia;
                if (dadosTemporarios.observacoes && observacoesTextarea) observacoesTextarea.value = dadosTemporarios.observacoes;
                
                mostrarMensagem('Dados temporários recuperados.', 'info');
            }
        } catch (error) {
            console.error('Erro ao recuperar dados temporários:', error);
        }
    }
    
    // Recuperar dados temporários na inicialização
    recuperarDadosTemporarios();
    
    // ================= ATALHOS DE TECLADO =================
    
    document.addEventListener('keydown', function(e) {
        // Ctrl + S para salvar
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            salvarRegistro();
        }
        
        // Ctrl + L para limpar
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            if (confirm('Tem certeza que deseja limpar todos os campos?')) {
                limparFormulario();
            }
        }
        
        // Ctrl + U para último registro
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            abrirUltimoRegistro();
        }
    });
    
    // ================= MELHORIAS DE UX =================
    
    // Contador de caracteres para observações
    if (observacoesTextarea) {
        const contadorDiv = document.createElement('div');
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
            
            if (caracteres > 1000) {
                contadorDiv.style.color = '#d4a017';
            } else {
                contadorDiv.style.color = '#666';
            }
        }
        
        observacoesTextarea.addEventListener('input', atualizarContador);
        atualizarContador(); // Inicializar contador
    }
    
    // Validação em tempo real
    function adicionarValidacaoTempoReal(input, validador, mensagem) {
        if (!input) return;
        
        input.addEventListener('blur', function() {
            if (input.value.trim() && !validador(input.value.trim())) {
                input.style.borderColor = '#dc3545';
                mostrarMensagem(mensagem, 'erro');
            } else {
                input.style.borderColor = '#e0e0e0';
            }
        });
        
        input.addEventListener('focus', function() {
            input.style.borderColor = '#f8bf4d';
        });
    }
    
    // Validadores
    adicionarValidacaoTempoReal(
        tituloInput,
        (valor) => valor.length >= 3,
        'O título deve ter pelo menos 3 caracteres.'
    );
    
    adicionarValidacaoTempoReal(
        colmeiaInput,
        (valor) => valor.length >= 1,
        'Por favor, selecione uma colmeia.'
    );
    
    console.log('Sistema de registro de observações inicializado com sucesso!');
});

