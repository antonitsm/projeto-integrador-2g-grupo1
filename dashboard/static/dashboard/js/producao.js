document.addEventListener("DOMContentLoaded", () => {
  const meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  let abelhasData = new Array(12).fill(0);
  let melData = new Array(12).fill(0);

  // Pega os dados do banco via atributo data-producoes
  const producoesDiv = document.getElementById("producoes");
  if (producoesDiv) {
    const producoes = JSON.parse(producoesDiv.getAttribute("data-producoes") || "[]");

    producoes.forEach(p => {
      const index = meses.indexOf(p.mes);
      if (index !== -1) {
        abelhasData[index] = p.numero_abelhas;
        melData[index] = p.quantidade_mel;
      }
    });
  }

  // Inicializa o gráfico (só se existir o canvas)
  const ctx = document.getElementById("beeChart");
  if (ctx) {
    new Chart(ctx.getContext("2d"), {
      type: "line",
      data: {
        labels: meses,
        datasets: [
          {
            label: "Quantidade de Abelhas",
            data: abelhasData,
            borderColor: "gold",
            backgroundColor: "gold",
            fill: false,
            tension: 0.3,
            pointBackgroundColor: "gold"
          },
          {
            label: "Mel Produzido (kg)",
            data: melData,
            borderColor: "black",
            backgroundColor: "black",
            fill: false,
            tension: 0.3,
            pointBackgroundColor: "black"
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { usePointStyle: true } }
        },
        scales: {
          y: { beginAtZero: true, min: 0, max: 100 }
        }
      }
    });
  }

  // ===== MENU HAMBÚRGUER =====
  const mobileMenuToggle = document.getElementById("mobile-toggle");
  const navbar = document.getElementById("navbar");

  if (mobileMenuToggle && navbar) {
    mobileMenuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });

    window.addEventListener("scroll", () => {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }
    });

    const menuLinks = navbar.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");
      });
    });

    document.addEventListener("click", (event) => {
      if (!mobileMenuToggle.contains(event.target) && !navbar.contains(event.target)) {
        navbar.classList.remove("active");
      }
    });
  }
});
