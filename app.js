
// api key : 4aecbee3ed7b7212390e072e790e0906
//gmaps api key: AIzaSyAeLtl53tFSL2GZevA9yPpJZcNHB4iFl9U
//mapbox access token: pk.eyJ1IjoicHJhZ3lhc2Fic3RyYWN0cyIsImEiOiJja2NpeHM3c2kxOGV4MnRscG1zOTc5eGJnIn0.mToKKeKEuOHPV3mySpXs6A
//select element

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//const gkey="AIzaSyAeLtl53tFSL2GZevA9yPpJZcNHB4iFl9U";
//app data
const weather = {};
weather.temperature = {
    unit: "celsius"
}
const KELVIN = 273;
//API key
const key = "4aecbee3ed7b7212390e072e790e0906";

//if browser supports geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support geolocation</p>";
}

//set user's position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}
//error if an issue with geolocation service
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message}</p>`;
}
//weather from api
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}

//display function
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//c to f
function celsiusToFah(temperature) {
    return (temperature * 9 / 5) + 32;
}

//when user clicks on temperature element
tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;
    if (weather.temperature.unit === "celsius") {
        let fah = celsiusToFah(weather.temperature.value);
        fah = Math.floor(fah);
        tempElement.innerHTML = `${fah}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});