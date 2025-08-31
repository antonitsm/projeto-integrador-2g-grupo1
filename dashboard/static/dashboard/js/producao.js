const meses = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

let abelhasData = new Array(12).fill(0);
let melData = new Array(12).fill(0);

// Pega os dados do banco via atributo data-producoes
const producoesDiv = document.getElementById("producoes");
const producoes = JSON.parse(producoesDiv.getAttribute("data-producoes") || "[]");

// Preenche os arrays com os dados do banco
producoes.forEach(p => {
    const index = meses.indexOf(p.mes);
    if (index !== -1) {
        abelhasData[index] = p.numero_abelhas;
        melData[index] = p.quantidade_mel;
    }
});

// Inicializa o gráfico
const ctx = document.getElementById("beeChart").getContext("2d");
const chart = new Chart(ctx, {
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
        scales: { y: { beginAtZero: true, min: 0, max: 100 } }
    }
});
