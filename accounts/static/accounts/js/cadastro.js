document.addEventListener("DOMContentLoaded", function () {
  const formLogin = document.getElementById("form-login");
  const formCadastro = document.getElementById("form-cadastro");

  // Validação Login
  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email-login").value;
      const senha = document.getElementById("senha-login").value;

      if (email.trim() === "" || senha.trim() === "") {
        alert("Preencha todos os campos!");
        return;
      }

      alert("Login realizado com sucesso!");
      formLogin.reset();
    });
  }

  // Validação Cadastro
  if (formCadastro) {
    formCadastro.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = document.getElementById("nome-cadastro").value;
      const email = document.getElementById("email-cadastro").value;
      const senha = document.getElementById("senha-cadastro").value;
      const confirmarSenha = document.getElementById("confirmar-senha").value;

      if (nome.trim() === "" || email.trim() === "" || senha.trim() === "" || confirmarSenha.trim() === "") {
        alert("Preencha todos os campos!");
        return;
      }

      if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
      }

      alert("Cadastro realizado com sucesso!");
      formCadastro.reset();
      window.location.href = "login.html"; // Redireciona para login após cadastro
    });
  }
});