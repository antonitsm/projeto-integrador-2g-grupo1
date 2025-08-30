// Função para pegar o CSRF token do Django
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

document.addEventListener("DOMContentLoaded", () => {

  // ===== EDITAR PERFIL =====
  const btnEdit = document.getElementById("btn-perfil-edit");
  const btnSave = document.getElementById("btn-perfil-save");
  const inputs = document.querySelectorAll("#form-perfil .input");
  const form = document.getElementById("form-perfil");

  btnEdit?.addEventListener("click", () => {
    inputs.forEach(input => input.disabled = false);
    btnEdit.classList.add("hidden");
    btnSave.classList.remove("hidden");
  });

  btnSave?.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.getElementById("perfil-username").value.trim();
    const email = document.getElementById("perfil-email").value.trim();
    if (!username || !email) {
      alert("Preencha todos os campos!");
      return;
    }

    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: {
          "X-CSRFToken": getCookie("csrftoken")
        },
        body: formData
      });

      let data;
      try {
        data = await res.json();
      } catch {
        alert("Perfil atualizado.");
        inputs.forEach(input => input.disabled = true);
        btnSave.classList.add("hidden");
        btnEdit.classList.remove("hidden");
        return;
      }

      alert(data.mensagem);
      if (data.status === "ok") {
        inputs.forEach(input => input.disabled = true);
        btnSave.classList.add("hidden");
        btnEdit.classList.remove("hidden");
      }

    } catch (err) {
      alert("Erro de rede. Tente novamente.");
      console.error(err);
    }
  });

  // ===== CONFIRMAÇÃO EXCLUIR CONTA =====
  const formExcluir = document.getElementById('form-excluir-conta');
  formExcluir?.addEventListener('submit', function(e) {
    const confirmar = confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível!");
    if (!confirmar) e.preventDefault();
  });

  // ===== CONFIRMAÇÃO SAIR DA CONTA =====
  const formLogout = document.querySelector('form[action*="logout"]');
  formLogout?.addEventListener('submit', function(e) {
    const confirmar = confirm("Tem certeza que deseja sair da conta?");
    if (!confirmar) e.preventDefault();
  });

});