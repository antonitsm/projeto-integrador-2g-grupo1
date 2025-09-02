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

document.querySelectorAll(".toggle-senha").forEach(botao => {
  botao.addEventListener("click", function () {
    const input = document.getElementById(this.dataset.target);
    if (input) {
      if (input.type === "password") {
        input.type = "text";             // senha visível
        this.classList.add("ativo");     // risco some
      } else {
        input.type = "password";         // senha oculta
        this.classList.remove("ativo");  // risco aparece
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobile-toggle")
  const navbar = document.getElementById("navbar")

  mobileMenuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active")
  })

  window.addEventListener("scroll", () => {
    const header = document.querySelector("header")
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  const menuLinks = navbar.querySelectorAll("a")
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active")
    })
  })

  document.addEventListener("click", (event) => {
    if (!mobileMenuToggle.contains(event.target) && !navbar.contains(event.target)) {
      navbar.classList.remove("active")
    }
  })
})
