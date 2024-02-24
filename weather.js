const temp = document.querySelector(".temp");
const date = document.querySelector(".date-time");
const currentLocation = document.querySelector(".location");
const condition = document.querySelector("#condition");
const rain = document.querySelector("#rain");
const mainIcon = document.querySelector("#icon");
const uvIndex = document.querySelector(".uv-index");
const uvText = document.querySelector(".uv-index");
const windSpeed = document.querySelector(".uv-index");
const sunRise = document.querySelector(".uv-index");
const sunSet = document.querySelector(".uv-index");
const humidity = document.querySelector(".uv-index");
const visibility = document.querySelector(".uv-index");
const humidityStatus = document.querySelector(".uv-index");
const airQuality = document.querySelector(".uv-index");
const airQualityStatus = document.querySelector(".uv-index");
const visibilityStatus = document.querySelector(".uv-index");

let currentCity = "";
let currentUnit = "";
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
function getPublicIp() {
    fetch("https://geolocation-db.com/json/", {
        method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        currentCity = data.currentCity;
    })
}

getPublicIp();


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
        let today = data.currentConditions;
        if (unit === "c") {
            temp.innerText = today.temp;
        } else {
            temp.innerText = celsiusToFahrenheit(today.temp);
        }
        currentLocation.innerText = data.resolvedAddress;
        CSSConditionRule.innerText = today.conditions;
        rain.innerText = "Perc -" + today.precip + "%";
    });
}

//function for converting celsius to fahrenheit
function celciusToFahrenheit(temp) {
    return ((temp * 9) / 5 + 32).toFixed(1);
}


