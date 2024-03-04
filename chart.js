// function for data set
async function fetchWeatherData() {
    const city = document.querySelector('#query').value;
    const apiKey = "HZTLVV6N5NJ324Y2VVYRK74RN";

    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`,
            {
                method: "GET",
            }
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        displayWeatherData(data); // Call a function to display the weather data
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayWeatherData(data) {
    // Display the weather data in the UI or perform any other action with it
    console.log("Weather API Response:", data);

    const indices = [0, 1, 2, 3, 4 ,5, 6]; // Define the indices you want to include
    const daysOfWeek = [];

    indices.forEach(index => {
    const day = data.days[index];
    const dayDate = new Date(day.datetime);
    const dayOfWeek = dayDate.toLocaleString('en-us', { weekday: 'long' });
    daysOfWeek.push(dayOfWeek);
    });

    console.log(daysOfWeek); // Output the array of day names

    // Temp array
    const tempIndices = [0, 1, 2, 3, 4, 5, 6];
    const temperatures = [];

    tempIndices.forEach(index => {
        const temp = data.days[index]; // Get the data of each day
        const tempNum = temp.temp; // Access the temperature value
        temperatures.push(tempNum); // Push the temperature value into the array
    });

    // Humidity array
    const humIndices = [0, 1, 2, 3, 4, 5, 6];
    const Humidities = [];

    humIndices.forEach(index => {
        const hum = data.days[index]; // Get the data of each day
        const humNum = hum.humidity; // Access the temperature value
        Humidities.push(humNum); // Push the temperature value into the array
    });

    // Solar Energy array
    const solarIndices = [0, 1, 2, 3, 4, 5, 6];
    const solarEnergy = [];

    solarIndices.forEach(index => {
        const solar = data.days[index]; // Get the data of each day
        const solarNum = solar.solarenergy; // Access the temperature value
        solarEnergy.push(solarNum); // Push the temperature value into the array
    });

    // Pressure array
    const pressureIndices = [0, 1, 2, 3, 4, 5, 6];
    const pressure = [];

    pressureIndices.forEach(index => {
        const press = data.days[index]; // Get the data of each day
        const pressureNum = press.pressure; // Access the temperature value
        pressure.push(pressureNum); // Push the temperature value into the array
    });

    console.log(temperatures); // Output the array of temperaturegit s
    console.log(Humidities); 

    // CHARTING functionality
const ctx1 = document.getElementById('temp-chart-data');

new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: daysOfWeek,
    datasets: [{
      label: 'Temperature',
      data: temperatures,
      borderWidth: 1,
      backgroundColor: 'skyblue', // Change the color of the bars here
      borderColor: 'white',
      color: 'white'
    }]
  },
  options: {
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: 'white' // Change the color of the x-axis labels here
        },
        grid: {
            color: 'rgba(255, 255, 255, 0.2)' // Change the color of the x-axis gridlines here
          }
      },
      y: {
        beginAtZero: true,
        suggestedMin: 0, // Set the minimum value on the y-axis
        suggestedMax: 60, // Set the maximum value on the y-axis
        stepSize: 10,
        ticks: {
          color: 'white' // Change the color of the y-axis labels here
        },
        grid: {
            color: 'rgba(255, 255, 255, 0.2)' // Change the color of the x-axis gridlines here
          }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'white' // Change the color of the legend labels here
        }
      }
    }
  }
});



const ctx2 = document.getElementById('hum-chart-data');

new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: daysOfWeek,
    datasets: [{
      label: 'Humidity',
      data: Humidities,
      borderWidth: 1,
      backgroundColor: 'skyblue', // Change the color of the bars here
      borderColor: 'white',
      color: 'white'
    }]
  },
  options: {
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: 'white' // Change the color of the x-axis labels here
        },
        grid: {
            color: 'rgba(255, 255, 255, 0.2)' // Change the color of the x-axis gridlines here
          }
      },
      y: {
        beginAtZero: true,
        suggestedMin: 0, // Set the minimum value on the y-axis
        suggestedMax: 100, // Set the maximum value on the y-axis
        stepSize: 20,
        ticks: {
          color: 'white' // Change the color of the y-axis labels here
        },
        grid: {
            color: 'rgba(255, 255, 255, 0.2)' // Change the color of the x-axis gridlines here
          }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'white' // Change the color of the legend labels here
        }
      }
    }
  }
});




// Solar Energy Data graph
const ctx3 = document.getElementById('solar-chart-data');

new Chart(ctx3, {
  type: 'line',
  data: {
    labels: daysOfWeek,
    datasets: [{
      label: 'Solar Energy',
      data: solarEnergy,
      borderWidth: 4,
      backgroundColor: 'skyblue', // Change the color of the bars here
      borderColor: 'yellow',
      color: 'white'
    }]
  },
  options: {
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: 'white' // Change the color of the x-axis labels here
        },
        grid: {
            color: 'rgba(255, 255, 255, 0.2)' // Change the color of the x-axis gridlines here
          }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white' // Change the color of the y-axis labels here
        },
        grid: {
            color: 'rgba(255, 255, 255, 0.2)' // Change the color of the x-axis gridlines here
          }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'white' // Change the color of the legend labels here
        }
      }
    }
  }
});

const ctx4 = document.getElementById('pressure-chart-data');

new Chart(ctx4, {
  type: 'bar',
  data: {
    labels: daysOfWeek,
    datasets: [{
      label: 'Temperature',
      data: pressure,
      borderWidth: 1,
      backgroundColor: 'none', // Change the color of the bars here
      borderColor: 'white',
      color: 'white'
    }]
  },
  options: {
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: 'white' // Change the color of the x-axis labels here
        },
        grid: {
            color: 'rgba(255, 255, 255, 0.2)' // Change the color of the x-axis gridlines here
          }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white' // Change the color of the y-axis labels here
        },
        grid: {
            color: 'rgba(255, 255, 255, 0.2)' // Change the color of the x-axis gridlines here
          }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'white' // Change the color of the legend labels here
        }
      }
    }
  }
});

}

const fetchBtn = document.querySelector('.fetch-data');
fetchBtn.addEventListener('click', fetchWeatherData);














