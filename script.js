

// =====================   MENU & Close BTN =========================//
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';

    window.addEventListener('resize', () => {
        // Check if the window width is greater than 768px
        if (window.innerWidth < 800) {
            sideMenu.style.display = 'block';
         } // Show the side menu
    });
    
})


// =====================   DARK Theme ========================= //
const themeToggler = document.querySelector(".theme-toggler");

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})



const apiKey = "ee613267b6b41a9425773b35390ca7bc";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.city.name;
    document.querySelector(".humidity").innerHTML = data.list[0].main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.list[0].wind.speed + " km/hr";
    document.querySelector(".pressure").innerHTML = data.list[0].main.pressure + " Pa";
    document.querySelector(".temp").innerHTML = Math.round(data.list[0].main.temp) + " °C";

    createChartWithTemp(data);
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

function createChartWithTemp(data) {
    const dailyData = [];
    const days = [];

    data.list.forEach(entry => {
        const date = new Date(entry.dt * 1000);
        const day = date.getDate();
        if (!days.includes(day)) {
            days.push(day);
            dailyData.push({
                day: date.toLocaleDateString('en-US', { weekday: 'long' }),
                temp: entry.main.temp
            });
        }
    });

    const temps = dailyData.map(entry => entry.temp);
    const dayLabels = dailyData.map(entry => entry.day);

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dayLabels,
            datasets: [{
                label: 'Daily Temperature',
                data: temps,
                backgroundColor: 'rgba(236, 247, 121, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMin: -30,
                    suggestedMax: 80,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'white' // Font color for y-axis labels
                    }
                },
                x: {
                    ticks: {
                        color: 'white' // Font color for x-axis labels
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: 'white' // Font color for legend labels
                    }
                },
                tooltip: {
                    backgroundColor: 'black', // Background color for tooltips
                    titleColor: 'white', // Font color for tooltip titles
                    bodyColor: 'white' // Font color for tooltip bodies
                },
                datalabels: {
                    color: 'white', // Font color for data labels
                    display: true // Show data labels
                }
            },
            layout: {
                padding: {
                    top: 20,
                    bottom: 20
                }
            },
            aspectRatio: 2,
            height: 200
        }
    });
    


}

document.querySelector('.reset-chart-button').addEventListener('click', () => {
    window.location.reload(); // Reload the page
});