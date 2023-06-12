const url = "http://45.71.181.109:3001/api/sensors?id_team=3&id_sensor=6";
const sensorValues = [];
const sensorLabels = [];
let sensorChart;

function fetchData() {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Respuesta de la red no válida");
      }
    })
    .then((data) => {
      displaySensorData(data);
      updateChart(data); // Añade esta línea para actualizar el gráfico
      console.log(data);
    })
    .catch((error) => {
      console.error("Error al obtener datos:", error);
    });
}

function displaySensorData(data) {
  const sensorData = data.msg[0];
  const sensorDataDiv = document.getElementById("sensor-data");
  const sensorInfo = `
      <p>Equipo: ${sensorData.team_members}</p>
      <p>Nombre Sensor: ${sensorData.name_sensor}</p>
      <p>Valor Sensor: ${sensorData.value_data}</p>
    `;
  sensorDataDiv.innerHTML = sensorInfo;
}

function updateChart(data) {
  const sensorData = data.msg[0];
  sensorValues.push(sensorData.value_data);
  sensorLabels.push(new Date().toLocaleTimeString());

  if (!sensorChart) {
    createChart();
  } else {
    sensorChart.update();
  }
}

function createChart() {
  const ctx = document.getElementById("sensorChart").getContext("2d");
  sensorChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: sensorLabels,
      datasets: [
        {
          label: "Valor Sensor",
          data: sensorValues,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

setInterval(fetchData, 2000);

