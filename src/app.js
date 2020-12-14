function dateTime(timestamp) {
  let date = new Date(timestamp);
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

  let dateElement = document.querySelector(`#currentDateTime`);
  dateElement.innerHTML = dateTime(response.data.dt * 1000);
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
console.log(formatDate());

function displayWeatherConditions(response) {
  console.log(response.data.main);
  let h2 = document.querySelector(`#city`);
  h2.innerHTML = response.data.name;

  document.querySelector(`#country`).innerHTML = response.data.sys.country;

  let temperature = document.querySelector(`#temperature`);
  temperature.innerHTML = Math.round(response.data.main.temp);
  document.querySelector(`#current-temp`).innerHTML = Math.round(
    response.data.main.feels_like
  );

  let iconElement = document.querySelector(`#weatherIcon`);
  document.querySelector(`#forecast-description`).innerHTML =
    response.data.weather[0].description;
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#sunrise`).innerHTML = Math.round(
    response.data.sys.sunrise
  );
  document.querySelector(`#sunset`).innerHTML = Math.round(
    response.data.sys.sunset
  );
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
search(`Sacramento`);
let searchForm = document.querySelector("#search-weather");
searchForm.addEventListener("submit", handleSubmit);
