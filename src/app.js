function displayWeatherConditions(response) {
  console.log(response.data);
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#country`).innerHTML = response.data.sys.country;
  document.querySelector(`#temperature`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#current-temp`).innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(`#weather-icon`).innerHTML =
    response.data.weather.icon;
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

let searchForm = document.querySelector("#search-weather");
searchForm.addEventListener("submit", handleSubmit);

function formatDate() {
  let days = [`Sun`, `Mon`, `Tues`, `Wed`, `Thur`, `Fri`, `Sat`];

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

  let h2 = document.querySelector(`h2`);
  h2.innerHTML = `${currentDay}. ${currentMonth}/${currentDate}`;
  let h3 = document.querySelector(`h3`);
  h3.innerHTML = `${currentHours}:${currentMinutes}`;

  let formattedDate = `${currentHours}:${currentMinutes} ${currentDay}. ${currentMonth} ${currentDate}`;
  console.log(formattedDate);

  return formattedDate;
}
