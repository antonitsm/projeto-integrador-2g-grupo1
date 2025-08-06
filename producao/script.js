const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let abelhasData = [10, 5, 40, 30, 35, 45, 47, 44, 43, 50, 55, 52];
let melData = [15, 8, 25, 18, 60, 75, 72, 70, 68, 74, 76, 72];

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
