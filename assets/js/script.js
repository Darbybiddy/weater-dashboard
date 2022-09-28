var cityStorage = []
cityStorage = JSON.parse(localStorage.getItem("searchHistory"))|| []
var searchHistoryBtn = document.getElementById("search-history-btn")

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


var forecastCol = document.getElementById("forecast-col")
var forecastDate = moment().format("MM/DD/YYYY");

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
  currentCityNameEl.textContent = data.name;
  currentTempEl.textContent = `Temp: ${data.main.temp} F`;
  console.log(data.main.temp);
  currentHumidityEl.textContent = `Humidity: ${data.main.humidity} %`;
  currentWindEl.textContent = `wind: ${data.wind.speed} MPH`;

  currentIconEl.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
}
function displayForecast(data) {
    var forecastDays = 5
forecastCol.innerHTML = ""

  for (i = 0; i < forecastDays; i++) {
var card = document.createElement("div")
card.setAttribute ("class", "card")
var cardDate = document.createElement("h5")
cardDate.setAttribute ("class", "cardDate")
var forDt = i * 8 + 4
var day = new Date(data.list[forDt].dt * 1000)
cardDate.textContent = day.toDateString()
var icon = document.createElement("img")
icon.setAttribute ("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
var cardBody = document.createElement("div")
cardBody.setAttribute("class", "card-body")
var temp = document.createElement ("p")
var humidity = document.createElement ("p")
var wind = document.createElement ("p")

  temp.textContent = `Temp: ${data.list[i].main.temp} F`;
  humidity.textContent = `Humidity: ${data.list[i].main.humidity} %`;
  wind.textContent = `wind: ${data.list[i].wind.speed} MPH`;

  cardBody.append(temp,humidity,wind)
  card.append(cardDate, icon, cardBody)
  forecastCol.append(card)
  
} 
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
function storage (city){
    cityStorage = JSON.parse(localStorage.getItem("searchHistory"))|| []
if (!cityStorage.includes(city)){
    cityStorage.push(city)
    localStorage.setItem("searchHistory", JSON.stringify(cityStorage))

}

}

function historyBtn(city){
    //if the city is not there then dont create the button 
    //if city is written twice then dont duplicate it 
    var btn = document.createElement ("button")
    btn.setAttribute("class", "city")
    btn.setAttribute ("value", city)
btn.textContent = city
searchHistoryBtn.append(btn)

}

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  userInput = citySearch.value;

  getCurrentWeather(userInput);
  storage(userInput)
  historyBtn(userInput);
});

searchHistoryBtn.addEventListener("click", ()=> {
    var btnClick = this.event.target.value
    console.log(btnClick)
    getCurrentWeather(btnClick)
})