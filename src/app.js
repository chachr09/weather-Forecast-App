function formatHours(timestamp) {
  let currentDateTime = new Date(timestamp);
  let hours = currentDateTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDateTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[currentDateTime.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDate() {
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];

  let months = [
    `Jan`,
    `Feb`,
    `Mar`,
    `Apr`,
    `May`,
    `Jun`,
    `Jul`,
    `Aug`,
    `Sep`,
    `Oct`,
    `Nov`,
    `Dec`,
  ];

  let currentTime = new Date();
  let currentDay = days[currentTime.getDay()];
  let currentMonth = months[currentTime.getMonth()];
  let currentHours = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();

  let currentDate = currentTime.getDate();
  let currentYear = currentTime.getFullYear();

  let h3 = document.querySelector(`h3`);
  h3.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;
  let h4 = document.querySelector(`h4`);
  h4.innerHTML = `${currentMonth}. ${currentDate}, ${currentYear}`;

  let formattedDate = `${currentDay} ${currentHours}:${currentMinutes}  ${currentMonth}. ${currentDate}, ${currentYear} `;
  console.log(formattedDate);

  return formattedDate;
}

function displayWeatherConditions(response) {
  let h2 = document.querySelector(`#city`);
  h2.innerHTML = response.data.name;
  let dateElement = document.querySelector(`#currentDateTime`);
  dateElement.innerHTML = formatHours(response.data.dt * 1000);
  document.querySelector(`#country`).innerHTML = response.data.sys.country;

  let temperature = document.querySelector(`#temperature`);
  temperature.innerHTML = Math.round(celsiusTemperature);

  document.querySelector(`#current-temp`).innerHTML = Math.round(
    response.data.main.feels_like
  );

  let iconElement = document.querySelector(`#weatherIcon`);

  celsiusTemperature = response.data.main.temp;

  document.querySelector(`#forecast-description`).innerHTML =
    response.data.weather[0].description;
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;

  let sunrise = document.querySelector(`#sunrise`);
  sunrise.innerHTML = new Date(response.data.sys.sunrise * 1000);
  let sunset = document.querySelector(`#sunset`);
  sunset.innerHTML = new Date(response.data.sys.sunset * 1000);
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let units = `metric`;
  let apiKey = `20e1dda3ee52411912adb300097a5c3f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(`#search-city-input`).value;
  search(city);
}

let celsiusTemperature = null;

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove(`active`);
  fahrenheitLink.classList.add(`active`);
  let temperature = document.querySelector(`#temperature`);
  let fahrenheitTemp = (temperature.innerHTML * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function displaycelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add(`active`);
  fahrenheitLink.classList.remove(`active`);
  let temperature = document.querySelector(`#temperature`);
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let searchForm = document.querySelector("#search-weather");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector(`#fahrenheit`);
fahrenheitLink.addEventListener(`click`, displayFahrenheitTemperature);

let celsiusLink = document.querySelector(`#celsius`);
celsiusLink.addEventListener(`click`, displaycelsiusTemperature);
