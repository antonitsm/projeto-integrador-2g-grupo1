// Elementos DOM
const colmeiaCards = document.querySelectorAll('.colmeia-card');
const btnAdicionarColmeia = document.querySelector('.btn-adicionar-colmeia');

// Função para adicionar efeitos de hover e animações
function inicializarEfeitos() {
    // Adicionar efeitos de hover mais suaves para os cartões
    colmeiaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efeito de hover para o botão adicionar colmeia
    if (btnAdicionarColmeia) {
        btnAdicionarColmeia.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btnAdicionarColmeia.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
}

// Animação de entrada para os cartões de colmeias
function animarEntrada() {
    colmeiaCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Função para confirmar exclusão de colmeia (para futuras expansões)
function confirmarExclusao() {
    return confirm("Tem certeza que deseja excluir esta colmeia?");
}

// Função para filtrar colmeias (para futuras expansões)
function filtrarColmeias(filtro) {
    colmeiaCards.forEach(card => {
        const nome = card.querySelector('.colmeia-nome').textContent.toLowerCase();
        
        if (nome.includes(filtro.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Função para ordenar colmeias (para futuras expansões)
function ordenarColmeias(criterio) {
    const lista = document.querySelector('.colmeias-lista');
    const cards = Array.from(colmeiaCards);
    
    cards.sort((a, b) => {
        const nomeA = a.querySelector('.colmeia-nome').textContent;
        const nomeB = b.querySelector('.colmeia-nome').textContent;
        
        switch (criterio) {
            case 'nome':
                return nomeA.localeCompare(nomeB);
            case 'nome-desc':
                return nomeB.localeCompare(nomeA);
            default:
                return 0;
        }
    });
    
    // Reordenar os elementos no DOM
    cards.forEach(card => {
        lista.appendChild(card);
    });
}

// Função para mostrar notificação (para futuras expansões)
function mostrarNotificacao(mensagem, tipo = 'info') {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.textContent = mensagem;
    
    // Estilos da notificação
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Cores baseadas no tipo
    const cores = {
        'info': '#2196F3',
        'success': '#4CAF50',
        'warning': '#FF9800',
        'error': '#f44336'
    };
    
    notificacao.style.backgroundColor = cores[tipo] || cores.info;
    
    document.body.appendChild(notificacao);
    
    // Animar entrada
    setTimeout(() => {
        notificacao.style.opacity = '1';
        notificacao.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.style.opacity = '0';
        notificacao.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            document.body.removeChild(notificacao);
        }, 300);
    }, 3000);
}

// Função para validar formulário de nova colmeia (para futuras expansões)
function validarFormularioColmeia(dados) {
    const erros = [];
    
    if (!dados.nome || dados.nome.trim() === '') {
        erros.push('Nome da colmeia é obrigatório');
    }
    
    if (!dados.localizacao || dados.localizacao.trim() === '') {
        erros.push('Localização é obrigatória');
    }
    
    if (!dados.dataInstalacao) {
        erros.push('Data de instalação é obrigatória');
    }
    
    return erros;
}

// Event listeners para botões de ação
document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Confirmar ações importantes
    if (target.classList.contains('btn-excluir')) {
        const colmeiaCard = target.closest('.colmeia-card');
        const colmeiaNome = colmeiaCard.querySelector('.colmeia-nome').textContent;
        const colmeiaId = colmeiaCard.getAttribute('data-colmeia');
        
        if (!confirmarExclusao(colmeiaId, colmeiaNome)) {
            event.preventDefault();
        }
    }
    
    // Feedback visual para cliques em botões
    if (target.classList.contains('btn-action')) {
        target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            target.style.transform = '';
        }, 150);
    }
});

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    inicializarEfeitos();
    animarEntrada();
    
    // Log para debug
    console.log('Página de colmeias carregada com sucesso');
    console.log(`Total de colmeias: ${colmeiaCards.length}`);
});

// Função para atualizar contador de colmeias (para futuras expansões)
function atualizarContador() {
    const contador = document.querySelector('.contador-colmeias');
    if (contador) {
        contador.textContent = `Total: ${colmeiaCards.length} colmeias`;
    }
}

// Função para busca em tempo real (para futuras expansões)
function configurarBusca() {
    const campoBusca = document.querySelector('#busca-colmeias');
    if (campoBusca) {
        campoBusca.addEventListener('input', function() {
            const termo = this.value;
            filtrarColmeias(termo);
        });
    }
}

// Exportar funções para uso global (se necessário)
window.ColmeiasPage = {
    filtrarColmeias,
    ordenarColmeias,
    mostrarNotificacao,
    confirmarExclusao,
    validarFormularioColmeia
};


  document.addEventListener("DOMContentLoaded", function() {
  const botoes = document.querySelectorAll(".btn-registro");

  botoes.forEach(botao => {
    botao.addEventListener("click", function() {
      const targetId = this.getAttribute("data-target");
      const target = document.getElementById(targetId);

      if (target.classList.contains("show")) {
        target.classList.remove("show");
        this.textContent = "Ver Dados";
      } else {
        target.classList.add("show");
        this.textContent = "Esconder Dados";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-confirmacao");
    const btnCancelar = document.getElementById("cancelar-exclusao");
    const btnConfirmar = document.getElementById("confirmar-exclusao");

    // Quando clicar em "Excluir" (botão de cada colmeia), abrir modal
    document.querySelectorAll(".btn-excluir").forEach(botao => {
        botao.addEventListener("click", (e) => {
            e.preventDefault(); // não deixa ir pro link direto
            const url = botao.getAttribute("data-url"); // pega a URL do botão
            modal.style.display = "flex";

            // Se confirmar, vai para a URL de exclusão
            btnConfirmar.onclick = () => {
                window.location.href = url;
            };

            // Se cancelar, fecha modal
            btnCancelar.onclick = () => {
                modal.style.display = "none";
            };
            function toggleCollapse(id) {
                const el = document.getElementById(id);
                el.classList.toggle("show");
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    console.log('Página Minhas Colmeias carregada');
    
    // Inicializar funcionalidades
    initCollapseButtons();
    initModalConfirmacao();
});

// Função para inicializar os botões de collapse
function initCollapseButtons() {
    const collapseButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
    
    collapseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-bs-target');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Atualizar o atributo aria-expanded
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                
                // Log para debug
                console.log(`Collapse ${targetId} ${!isExpanded ? 'expandido' : 'recolhido'}`);
            }
        });
    });
}

// Função para modal de confirmação de exclusão
function initModalConfirmacao() {
    const modal = document.getElementById('modal-confirmacao');
    
    if (modal) {
        // Função para abrir modal
        window.abrirModal = function() {
            modal.style.display = 'flex';
        };
        
        // Função para fechar modal
        window.fecharModal = function() {
            modal.style.display = 'none';
        };
        
        // Fechar modal ao clicar fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                fecharModal();
            }
        });
    }
}

// Função para confirmar exclusão
function confirmarExclusao() {
    return confirm('Tem certeza de que deseja excluir esta colmeia?');
}

// Função para implementar collapse sem Bootstrap (fallback)
function toggleCollapse(targetId) {
    const element = document.querySelector(targetId);
    const button = document.querySelector(`[data-bs-target="${targetId}"]`);
    
    if (element && button) {
        const isExpanded = element.classList.contains('show');
        
        if (isExpanded) {
            element.classList.remove('show');
            button.setAttribute('aria-expanded', 'false');
        } else {
            element.classList.add('show');
            button.setAttribute('aria-expanded', 'true');
        }
    }
}

// Verificar se Bootstrap está carregado, senão usar implementação própria
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que o Bootstrap carregou
    setTimeout(function() {
        if (typeof bootstrap === 'undefined') {
            console.log('Bootstrap não detectado, usando implementação própria de collapse');
            
            // Implementar collapse manualmente
            const collapseButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
            
            collapseButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('data-bs-target');
                    toggleCollapse(targetId);
                });
            });
        } else {
            console.log('Bootstrap detectado e funcionando');
        }
    }, 100);
});