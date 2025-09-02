document.addEventListener("DOMContentLoaded", function () {
  const mostrarCadastro = document.getElementById("mostrar-cadastro");
  const mostrarLogin = document.getElementById("mostrar-login");
  const formLogin = document.getElementById("form-login");
  const formCadastro = document.getElementById("form-cadastro");

  // Mostrar o formulário de login inicialmente
  formLogin.classList.add("ativo");

  // Alternar para o formulário de cadastro
  mostrarCadastro.addEventListener("click", function (e) {
    e.preventDefault();
    formLogin.classList.remove("ativo");
    formCadastro.classList.add("ativo");
  });

  // Alternar para o formulário de login
  mostrarLogin.addEventListener("click", function (e) {
    e.preventDefault();
    formCadastro.classList.remove("ativo");
    formLogin.classList.add("ativo");
  });

  // Ação de login
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email-login").value;
    const senha = document.getElementById("senha-login").value;

    console.log("Login:", email, senha);
    alert("Login realizado com sucesso!");
    formLogin.reset();
  });

  // Ação de cadastro
  formCadastro.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome-cadastro").value;
    const email = document.getElementById("email-cadastro").value;
    const senha = document.getElementById("senha-cadastro").value;
    const confirmar = document.getElementById("confirmar-senha").value;

    if (senha !== confirmar) {
      alert("As senhas não coincidem!");
      return;
    }

    console.log("Cadastro:", nome, email, senha);
    alert("Cadastro realizado com sucesso!");
    formCadastro.reset();
    formCadastro.classList.remove("ativo");
    formLogin.classList.add("ativo");
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
