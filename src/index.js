function greenTheme() {
  let container = document.querySelector(".container");
  container.classList.remove("pink");
  container.classList.add("green");
}

function pinkTheme() {
  let container = document.querySelector(".container");
  container.classList.remove("green");
  container.classList.add("pink");
}

function blueTheme() {
  let container = document.querySelector(".container");
  container.classList.remove("green");
  container.classList.remove("pink");
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  let currentDate = date.getDate();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `O${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${month} ${currentDate}, ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let dailyForecast = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (dailyForecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col weather-day">
      <div class="day-name">${formatDay(dailyForecastDay.dt)}</div>
      <img class="weather-symbol" src="${showIcon(
        dailyForecastDay.weather[0].icon
      )}" />
      <div class="day-max-min">
        <strong>${Math.round(dailyForecastDay.temp.max)}
        </strong>/${Math.round(dailyForecastDay.temp.min)}
      </div>
    </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function showIcon(icon) {
  let url = null;
  if (icon === "01d" || icon === "01n") {
    url = "src/images/sun.png";
  } else if (icon === "02d" || icon === "02n") {
    url = "src/images/sun-cloud.png";
  } else if (
    icon === "03d" ||
    icon === "03n" ||
    icon === "04d" ||
    icon === "04n"
  ) {
    url = "src/images/cloud.png";
  } else if (
    icon === "09d" ||
    icon === "09n" ||
    icon === "10d" ||
    icon === "10n"
  ) {
    url = "src/images/rain.png";
  } else if (icon === "11d" || icon === "11n") {
    url = "src/images/storm.png";
  } else if (icon === "13d" || icon === "13n") {
    url = "src/images/snow.png";
  } else if (icon === "50d" || icon === "50n") {
    url = "src/images/mist.png";
  } else {
    url = "src/images/cloud-computing.png";
  }

  return url;
}

function getForecast(coordinates) {
  let apiKey = "bf54175800a55e59e6c4d6461deeef12";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;

  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let tempMax = document.querySelector("#temp-current-max");
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `${showIcon(response.data.weather[0].icon)}`);

  currentCelsius = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "bf54175800a55e59e6c4d6461deeef12";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchform-input");
  search(city.value);
}

function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round(currentCelsius);
  fahrenheitTemperature.classList.add("not-showing");
  celsiusTemperature.classList.remove("not-showing");
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = (currentCelsius * 9) / 5 + 32;
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round(fahrenheit);
  fahrenheitTemperature.classList.remove("not-showing");
  celsiusTemperature.classList.add("not-showing");
}

function showPosition(position) {
  let apiKey = "bf54175800a55e59e6c4d6461deeef12";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let greenThemeButton = document.querySelector(".button-green");
greenThemeButton.addEventListener("click", greenTheme);
let pinkThemeButton = document.querySelector(".button-pink");
pinkThemeButton.addEventListener("click", pinkTheme);
let blueThemeButton = document.querySelector(".button-blue");
blueThemeButton.addEventListener("click", blueTheme);

let timeNow = document.querySelector("#time-now");
let now = new Date();
timeNow.innerHTML = formatDate(now);

let searchform = document.querySelector("#searchform");
searchform.addEventListener("submit", handleSubmit);

let currentCelsius = null;

let currentTemperature = document.querySelector("#current-temp");
let celsiusTemperature = document.querySelector("#celsius");
let fahrenheitTemperature = document.querySelector("#fahrenheit");

celsiusTemperature.addEventListener("click", showCelsius);
fahrenheitTemperature.addEventListener("click", showFahrenheit);

let myLocationButton = document.querySelector("#my-location-button");
myLocationButton.addEventListener("click", getCurrentPosition);

search("Lisbon");
