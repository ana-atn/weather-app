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
}

function search(city) {
  let apiKey = "7938efc80ce4e41838324558e6af1b4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchform-input").value;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = city;
  search(city);
}

function showCelsius() {
  currentTemperature.innerHTML = "31";
  fahrenheitTemperature.classList.add("not-showing");
  celsiusTemperature.classList.remove("not-showing");
}

function showFahrenheit() {
  currentTemperature.innerHTML = "88";
  fahrenheitTemperature.classList.remove("not-showing");
  celsiusTemperature.classList.add("not-showing");
}

function showPosition(position) {
  let apiKey = "7938efc80ce4e41838324558e6af1b4a";
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

let currentTemperature = document.querySelector("#current-temp");
let celsiusTemperature = document.querySelector("#celsius");
let fahrenheitTemperature = document.querySelector("#fahrenheit");

celsiusTemperature.addEventListener("click", showCelsius);
fahrenheitTemperature.addEventListener("click", showFahrenheit);

let myLocationButton = document.querySelector("#my-location-button");
myLocationButton.addEventListener("click", getCurrentPosition);

search("New York");