document.addEventListener("DOMContentLoaded", function () {
  const formCadastro = document.querySelector(".formulario-autenticacao");

  // Ação de cadastro
  formCadastro.addEventListener("submit", function (e) {
    //e.preventDefault();
    
    const nome = document.getElementById("nome-cadastro").value;
    const email = document.getElementById("email-cadastro").value;
    const senha = document.getElementById("senha-cadastro").value;
    const confirmar = document.getElementById("confirmar-senha").value;

    // Validação de senhas
    if (senha !== confirmar) {
      alert("As senhas não coincidem!");
      return;
    }

    // Validação de senha forte (opcional)
    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    console.log("Cadastro:", nome, email, senha);
    //alert("Cadastro realizado com sucesso!");
    
    // Limpar formulário
    //formCadastro.reset();
    
    // Opcional: redirecionar para página de login
    // window.location.href = "login.html";
  });

  // Efeito de scroll no header (opcional)
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  console.log("Página de cadastro carregada com sucesso!");
});

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        
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

window.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname; // pega a URL atual
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});