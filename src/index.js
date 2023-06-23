const apiKey = "203fa770242fcd2b9555d832a88ea567";
let city = "Cairo"; // default city value

function fetchWeatherData(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.main) {
        const currentTemp = data.main.temp;
        const tempCelsius = Math.round(currentTemp - 273.15);
        displayCityTemp(tempCelsius);
        displayCityTime(data.timezone);
        displayWindSpeed(data.wind.speed);
        displayHumidity(data.main.humidity);
        displayPrecipitation(data.weather[0].description);
      }
    });
}

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const cityInput = document.querySelector("#city");
  city = cityInput.value; // update city value
  displayCityName(city);
  fetchWeatherData(city); // call fetch with user-inputted city
});

function displayCityName(cityName) {
  const cityDisplay = document.querySelector("#city-display");
  cityDisplay.textContent = cityName;
}

function displayCityTemp(tempCelsius) {
  const tempDisplay = document.querySelector(".temperature");
  tempDisplay.textContent = `${tempCelsius}°C`;
}

function displayCityTime(timezone) {
  const date = new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const cityTime = new Date(utc + 1000 * timezone);
  const options = { weekday: "long", hour: "numeric", minute: "numeric" };
  const timeDisplay = document.querySelector("#city-time");
  if (timeDisplay) {
    timeDisplay.textContent = cityTime.toLocaleString("en-UK", options);
  }
}

function displayWindSpeed(windSpeed) {
  const windDisplay = document.querySelector("#wind-speed");
  windDisplay.textContent = `Wind Speed: ${windSpeed} m/s`;
}

function displayHumidity(humidity) {
  const humidityDisplay = document.querySelector("#humidity");
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
}

//function for displaying precipitation
function displayPrecipitation(precipitation) {
  const precipitationDisplay = document.querySelector("#conditions");
  precipitationDisplay.textContent = precipitation;
}

const currentLocationButton = document.querySelector("#current-location");
if (currentLocationButton) {
  currentLocationButton.addEventListener("submit", function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.main) {
            const cityName = data.name;
            const currentTemp = data.main.temp;
            const tempCelsius = Math.round(currentTemp - 273.15);
            displayCityName(cityName);
            displayCityTemp(tempCelsius);
            displayCityTime(data.timezone);
            displayWindSpeed(data.wind.speed);
            displayHumidity(data.main.humidity);
            displayPrecipitation(data.weather[0].description);
          }
        });
    });
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const cityInput = document.querySelector("#city");
  const city = cityInput.value;
  displayCityName(city);
  fetchWeatherData(city);
});

fetchWeatherData(city);
