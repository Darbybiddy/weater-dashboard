var currentDate = moment().format("MM/DD/YYYY");

var citySearch = document.querySelector("#city-names");
var searchButton = document.querySelector(".search-btn");
var titleWeather = document.querySelector("#current-date");
titleWeather.textContent = currentDate;
var displayInfoEl = document.querySelector(".city-info");
var userInput;
var apiKey = "2c7427a61257c9ff1af20d7fb03dd9bf";
var currentTempEl = document.getElementById("current-temp");
var currentWindEl = document.getElementById("current-windspeed");
var currentHumidityEl = document.getElementById("current-humidity");
var currentCityNameEl = document.getElementById("current-name");
var currentIconEl = document.getElementById("current-icon");

var dayOneTempEl = document.getElementById("day-one-temp");
var dayOneWindEl = document.getElementById("day-one-wind");
var dayOneHumidityEl = document.getElementById("day-one-humidity");
var dayOneIconEl = document.getElementById("day-one-icon");

function getCurrentWeather(city) {
  console.log(city);
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      displayInfo(data);
      getOneCall(lat, lon);
    });
}

function displayInfo(data) {
  currentCityNameEl.textContent = userInput;
  currentTempEl.textContent = `Temp: ${data.main.temp} F`;
  console.log(data.main.temp);
  currentHumidityEl.textContent = `Humidity: ${data.main.humidity} %`;
  currentWindEl.textContent = `wind: ${data.wind.speed} MPH`;

  currentIconEl.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
}
function displayForecast(data) {
  for (i = 0; i < data; i++) {
    // need to add it to every card, so that i dont have to keep adding the same code for each card.
  }

  dayOneTempEl.textContent = `Temp: ${data.list[0].main.temp} F`;
  dayOneHumidityEl.textContent = `Humidity: ${data.list[0].main.humidity} %`;
  dayOneWindEl.textContent = `wind: ${data.list[0].wind.speed} MPH`;

  dayOneIconEl.src = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
}
function getOneCall(lat, lon) {
  console.log(lat, lon);

  var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude={minutely,hourly,alerts}&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      displayForecast(data);
    });
}
// declare the fucntions here

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  userInput = citySearch.value;

  getCurrentWeather(userInput);
});
