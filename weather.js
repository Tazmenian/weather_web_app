const temp = document.querySelector(".temp");
const date = document.querySelector(".date-time");
const currentLocation = document.querySelector(".location");
const condition = document.querySelector("#condition");
const rain = document.querySelector("#rain");
const mainIcon = document.querySelector("#icon");
const uvIndex = document.querySelector(".uv-index");
const uvText = document.querySelector(".uv-text");
const windSpeed = document.querySelector(".wind-speed");
const sunRise = document.querySelector(".sunrise");
const sunSet = document.querySelector(".sunset");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility");
const humidityStatus = document.querySelector(".humidity-status");
const airQuality = document.querySelector(".air-quality");
const airQualityStatus = document.querySelector(".air-quality-status");
const visibilityStatus = document.querySelector(".visibility-status");
const weatherCards = document.querySelector("#weather-cards");
const hourlyBtn = document.querySelector(".hourly");
const weekBtn = document.querySelector(".week");
const tempUnit = document.querySelectorAll(".temp-unit");
const celsiusBtn = document.querySelector(".celsius");
const fahrenheitBtn = document.querySelector(".fahrenheit");
const searchForm = document.querySelector("#search");
const search = document.querySelector("#query");


let currentCity = "";
let currentUnit = "c";
let hourlyorWeek = "Week";


// Time Update

function getDateTime() {
    let now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        seconds = now.getSeconds();

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let amOrPm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }

    let dayString = days[now.getDay()];
    return `${dayString}, ${hour}:${minute}:${seconds} ${amOrPm}`;
}

function updateDate() {
    date.innerText = getDateTime();
}

// Call updateDate immediately to set the initial time
updateDate();

// Update the date every second (1000 milliseconds)
setInterval(updateDate, 1000);

//  Function to get the Public IP
//function getPublicIp() {
//    fetch("https://geolocation-db.com/json/", {
//        method: "GET",
 //   })
//    .then((response) => response.json())
 //   .then((data) => {
 //       console.log(data);
 //       currentCity = data.city;
 //       //getWeatherData(data.city, currentUnit, hourlyorWeek);
 //   })
//}

//getPublicIp();


 // Initialize the map
 var map = L.map('map').setView([51.505, -0.09], 10); // Centered at (51.505, -0.09) with zoom level 13

 // Add a base map tile layer (you can choose different tile providers)
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
 }).addTo(map);

//function to get weather data

function getWeatherData(city, unit, hourlyorWeek) {
    const apiKey = "HZTLVV6N5NJ324Y2VVYRK74RN";
    fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`,
        {
            method: "GET",
        }
    )
    .then((response) => response.json())
    .then((data) => {
        console.log("Weather API Response:", data);
        let today = data.currentConditions;

        // Update map location based on city coordinates
        map.setView([data.latitude, data.longitude], 13);

        if (temp) {
            if (unit === "c") {
                temp.innerText = today.temp;
            } else {
                temp.innerText = celsiusToFahrenheit(today.temp);
            }
        }

        currentLocation.innerText = data.resolvedAddress;
        condition.innerText = today.conditions;
        rain.innerText = "Perc -" + today.precip + "%";
        uvIndex.innerText = today.uvindex;
        windSpeed.innerText = today.windspeed;
        humidity.innerText = today.humidity + "%";
        visibility.innerText = today.visibility;
        airQuality.innerText = today.winddir;
        measureUvindex(today.uvindex);
        updateHumidityStatus(today.humidity);
        updateVisibilityStatus(today.visibility);
        updateAirQualityStatus(today.winddir);
        sunRise.innerText = convertTimeTo12HourFormat(today.sunrise);
        sunSet.innerText = convertTimeTo12HourFormat(today.sunset);
        mainIcon.src = getIcon(today.icon);
        changeBackground(today.icon);

        if (hourlyorWeek === "hourly") {
            if (data.days && data.days.length > 0 && data.days[0].hours) {
                updateForecast(data.days[0].hours, unit, "day");
            } else {
                console.error("Hourly forecast data not available in the expected format");
            }
        } else {
            updateForecast(data.days, unit, "week");
        }

        // Add a marker to the map at the weather location
        const marker = L.marker([data.latitude, data.longitude]).addTo(map)
            .bindPopup(`<b>${city}</b><br>Temperature: ${today.temp}°C<br>Weather: ${today.conditions}`)
            .openPopup();

        // Pan the map to the weather location
        map.panTo([data.latitude, data.longitude]);
    })
    .catch((err) => {
        alert("City Invalid");
    });
}




//function for converting celsius to fahrenheit
function celsiusToFahrenheit(temp) {
    return ((temp * 9) / 5 + 32).toFixed(1);
}

//function to get the UV index status

function measureUvindex(uvIndex) {
    if (uvIndex <= 2 ){
        uvText.innerText = "Low";
    } else if (uvText <= 5) {
        uvText.innerText = "Moderate";
    } else if (uvText <= 7) {
        uvText.innerText = "High";
    } else if (uvText <= 10) {
        uvText.innerText = "Very High";
    } else {
        uvText.innerText = "Extreme";
    }
}
//function to get the Humidity status
function updateHumidityStatus(humidity) {
    if (humidity <= 30) {
        humidityStatus.innerText = "Low";
    } else if (humidity <= 60) {
        humidityStatus.innerText = "Moderate";
    } else {
        humidityStatus.innerText = "High"
    }
}
//function to get the Visibility status
function updateVisibilityStatus(visibility) {
    if (visibility <= 0.3){
        visibilityStatus.innerText = "Dense Fog";
    } else if (visibility <= 0.16) {
        visibilityStatus.innerText = "Moderate Fog";
    } else if (visibility <= 0.35) {
        visibilityStatus.innerText = "Light Fog";
    } else if (visibility <= 1.13) {
        visibilityStatus.innerText = "Very  Light Fog";
    } else if (visibility <= 2.16) {
        visibilityStatus.innerText = "Light Mist";
    } else if (visibility <= 5.4) {
        visibilityStatus.innerText = "Very Light Mist";
    } else if (visibility <= 10.8) {
        visibilityStatus.innerText = "Clear Air";
    } else {
        visibilityStatus.innerText = "Very Clear Air";
    }
}
//function to get the Air Quality status
function updateAirQualityStatus(airQuality) {
    if (airQuality <= 50) {
        airQualityStatus.innerText = "Good";
    } else if (airQuality <= 100) {
        airQualityStatus.innerText = "Moderate";
    } else if (airQuality <= 150) {
        airQualityStatus.innerText = "Unhealthy for Sensitive Groups";
    } else if (airQuality <= 200) {
        airQualityStatus.innerText = "Unhealthy";
    } else if (airQuality <= 250) {
        airQualityStatus.innerText = "Very Unhealthy";
    } else{
        airQualityStatus.innerText = "Hazardous";
    }
}

function convertTimeTo12HourFormat(time) {
    let hour = time.split(":")[0];
    let minute = time.split(":")[1];
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    let strTime = hour + ":" + minute + "" + ampm;
    return strTime;
}

function getIcon(condition) {
    if (condition === "Partly-cloudy-day") {
        return "images/clouds.png";
    } else if (condition === "Partly-cloudy-night") {
        return "images/clouds.png";
    } else if (condition === "rain") {
        return "images/rain.png";
    } else if (condition === "clear-day") {
        return "images/clear.png";
    } else if (condition === "clear-night") {
        return "images/clear.png";
    } else  {
        return "images/snow.png";
    }
}

function getDayName(date) {
    let day = new Date(date);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return days[day.getDay()];
}

function getHour(time) {
    let hour = time.split(":")[0];
    let min = time.split(":")[1];
    if (hour > 12) {
        hour = hour % 12;
        return `${hour}:${min} PM`;
    } else {
        return `${hour}:${min} AM`;
    }
}

function updateForecast(data, unit, type) {

    weatherCards.innerHTML = "";

    let numCards = (type === "day") ? 24 : 7; // 24 cards for hourly, 7 for weekly

    for (let i = 0; i < numCards && i < data.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        
        let dayName = (type === "week") ? getDayName(data[i].datetime) : getHour(data[i].datetime);
        let dayTemp = (unit === "f") ? celsiusToFahrenheit(data[i].temp) : data[i].temp;
        let iconSrc = getIcon(data[i].icon);
        let tempUnit = (unit === "f") ? "°F" : "°C";

        card.innerHTML = `
            <h2 class="day-name">${dayName}</h2>
            <div class="card-icon">
                <img src="${iconSrc}" alt="">
            </div>
            <div class="day-temp">
                <h2 class="temp">${dayTemp}</h2>
                <span class="temp-uni">${tempUnit}</span>
            </div>   
        `;
        weatherCards.appendChild(card);
    } 
}

function changeBackground(condition){
    let bg = "";
    const body = document.body; // Define body explicitly
    if (condition === "Partly-cloudy-day") {
        bg = "var(--color-success)";
    } else if (condition === "Partly-cloudy-night") {
        bg = "var(--color-dark)";
    } else if (condition === "rain") {
        bg = "var(--color-primary)";
    } else if (condition === "clear-day") {
        bg = "var(--color-primary)";
    } else if (condition === "clear-night") {
        bg = "var(--color-primary)";
    } else  {
        bg = "var(--color-dark)";
    }
    body.style.background = `url(${bg})`;
}

fahrenheitBtn.addEventListener('click', () => {
    changeUnit("f");
});

celsiusBtn.addEventListener('click', () => {
    changeUnit("c");
});

function changeUnit(unit) {
    if (currentUnit !== unit) {
        currentUnit = unit;
        tempUnit.forEach((elem) => {
            elem.innerText = `°${unit.toUpperCase()}`;
        });
        if(unit === "c") {
            celsiusBtn.classList.add("active")
            fahrenheitBtn.classList.remove("active")
        } else{
            celsiusBtn.classList.remove("active")
            fahrenheitBtn.classList.add("active")
        }

        // function call
        getWeatherData(currentCity, currentUnit, hourlyorWeek);
    }
}

hourlyBtn.addEventListener('click', () => {
    changeTimeSpan("hourly");
});
weekBtn.addEventListener('click', () => {
    changeTimeSpan("week");
});
 function changeTimeSpan(unit) {
    if (hourlyorWeek != unit) {
        hourlyorWeek = unit;
        if (unit === "hourly") {
            hourlyBtn.classList.add("active");
            weekBtn.classList.remove("active");
        } else {
            hourlyBtn.classList.remove("active");
            weekBtn.classList.add("active");
        }
        // change took place
        getWeatherData(currentCity, currentUnit, hourlyorWeek);
    }
 }

 searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = search.ariaValueMax;
    if (location) {
        currentCity = location;
        getWeatherData(currentCity, currentUnit, hourlyorWeek);
    }
 })

 //array for city suggestion

 const cities = [
    "Manila",
    "Calamba",
    "Cebu",
    "Quezon",
    "Rizal",
    "Antipolo",
    "Cavite",
    "Tagaytay",
];

// async function fetchPlaceSuggestions(query) {
//     const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
//     try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch suggestions. Status: ${response.status}`);
//         }
//         const data = await response.json();
//         const suggestions = data.map(place => place.display_name.split(',')[0]);
//         return suggestions;
//     } catch (error) {
//         console.error('Error fetching place suggestions:', error);
//         return [];
//     }
// }

function initializeSearch() {
    const searchInput = document.getElementById('query');
    const suggestionsContainer = document.createElement("ul");
    suggestionsContainer.setAttribute("id", "suggestions");
    searchInput.parentNode.appendChild(suggestionsContainer);

    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value.trim();
        if (query.length >= 2) {
            try {
                const suggestions = await fetchPlaceSuggestions(query);
                displaySuggestions(suggestions);
            } catch (error) {
                console.error('Error fetching or displaying suggestions:', error);
                clearSuggestions();
            }
        } else {
            displaySuggestionsFromCities(query);
        }
    });

    function displaySuggestions(suggestions) {
        suggestionsContainer.innerHTML = '';
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement("li");
            suggestionItem.textContent = suggestion;
            suggestionItem.addEventListener('click', () => {
                searchInput.value = suggestion;
                clearSuggestions();
            });
            suggestionsContainer.appendChild(suggestionItem);
        });
    }

    function clearSuggestions() {
        suggestionsContainer.innerHTML = '';
    }

    function displaySuggestionsFromCities(query) {
        clearSuggestions();
        if (!query) return;
        
        const matchedCities = cities.filter(city =>
            city.toUpperCase().includes(query.toUpperCase())
        );

        matchedCities.forEach(city => {
            const suggestionItem = document.createElement("li");
            suggestionItem.innerHTML = `<strong>${city.substr(0, query.length)}</strong>${city.substr(query.length)}`;
            suggestionItem.addEventListener('click', () => {
                searchInput.value = city;
                clearSuggestions();
            });
            suggestionsContainer.appendChild(suggestionItem);
        });
    }
}

initializeSearch();


// Function to clear suggestions
function clearSuggestions() {
    const suggestions = document.getElementById("suggestions");
    if (suggestions) {
        suggestions.parentNode.removeChild(suggestions);
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = search.value; // Use search.value instead of search.ariaValueMax
    if (location) {
        currentCity = location;
        getWeatherData(currentCity, currentUnit, hourlyorWeek);
    }
});

//variable for Menu DOm manipulation
const dashboardBtn = document.querySelector('.dashboard'),
analyticsBtn = document.querySelector('.analytics'),
navigationBtn = document.querySelector('.navigation');

//variable for Content DOm manipulation
const analyticsContent = document.querySelector('.analytics-container'),
dashboardContent = document.querySelector('.dashboard-container'),
navigationContent = document.querySelector('.navigation-container');

//variable menu styling manipulation
// Variable menu styling manipulation
const dashboardMenu = document.querySelector('.menu ul li.dashboard a'),
      analyticsMenu = document.querySelector('.menu ul li.analytics a'),
      navigationMenu = document.querySelector('.menu ul li.navigation a');


dashboardBtn.addEventListener('click', () => {
    dashboardContent.style.display = "block";
    analyticsContent.style.display = "none";
    navigationContent.style.display = "none";

    //manipulate menu li class
    dashboardMenu.classList.add("active");
    analyticsMenu.classList.remove("active");
    navigationMenu.classList.remove("active");

    //manipulate menu li class
    dashboardBtn.classList.add("active");
    analyticsBtn.classList.remove("active");
    navigationBtn.classList.remove("active");

});

analyticsBtn.addEventListener('click', () => {
    dashboardContent.style.display = "none";
    analyticsContent.style.display = "block";
    navigationContent.style.display = "none";

    //manipulate menu li class
    dashboardMenu.classList.remove("active");
    analyticsMenu.classList.add("active");
    navigationMenu.classList.remove("active");

     //manipulate menu li class
     dashboardBtn.classList.remove("active");
     analyticsBtn.classList.add("active");
     navigationBtn.classList.remove("active");
});

navigationBtn.addEventListener('click', () => {
    dashboardContent.style.display = "none";
    analyticsContent.style.display = "none";
    navigationContent.style.display = "block";

    //manipulate menu li class
    dashboardMenu.classList.remove("active");
    analyticsMenu.classList.remove("active");
    navigationMenu.classList.add("active");

     //manipulate menu li class
     dashboardBtn.classList.remove("active");
     analyticsBtn.classList.remove("active");
     navigationBtn.classList.add("active");
});





// Grapch functionality

