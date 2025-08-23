const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let abelhasData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let melData = [0, 0, , 0, 0, 0, 0, 0, 0, 0, 0, 0];


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
      legend: {
        labels: {
          usePointStyle: true
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100
      }
    }
  }
});

document.getElementById("dataForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const abelhas = parseInt(document.getElementById("abelhas").value);
  const mel = parseInt(document.getElementById("mel").value);
  const mes = parseInt(document.getElementById("mes").value);

  if (!isNaN(mes)) {
    abelhasData[mes] = abelhas;
    melData[mes] = mel;
    chart.update();
  }

  this.reset();
});