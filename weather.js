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
function getPublicIp() {
    fetch("https://geolocation-db.com/json/", {
        method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        currentCity = data.currentCity;
        getWeatherData(data.city, currentUnit, hourlyorWeek);
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
    });
}

//function for converting celsius to fahrenheit
function celciusToFahrenheit(temp) {
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
    hour = hour & 12;
    hour = hour ? hour : 12;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    let strTime = hour + ":" + minute + ":" + ampm;
    return strTime;
}
