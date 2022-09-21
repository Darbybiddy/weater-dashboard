// create a current date variable that displays the current dates
// add variable for the search text
// add variable for the display section.
// add a click event to the search button
// add the weather api doc
// add icons that go with the correct weather conditions
// add a variable for the color change for UV index
// in the display section i need to have: temp, wind, humidity, uv index, icon.
// in the forecast i need to have: future date, temp, wind, humidity, icon.


var currentDate = moment().format("MM/DD/YYYY");
var cityInfo
var citySearch = document.querySelector("#city-names")
var searchButton = document.querySelector(".search-btn")
var titleWeather = document.querySelector("#current-date")
titleWeather.textContent = currentDate

var apiKey = "2c7427a61257c9ff1af20d7fb03dd9bf"

function getCurrentWeather (city){
    console.log(city)
var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
fetch (url)
.then ((res)=>{
    return res.json();
})
.then ((data)=>{

    console.log(data)
    var lat = data.coord.lat
    var lon = data.coord.lon
getOneCall(lat,lon)
})
}

function getOneCall (lat,lon){
    console.log(lat,lon)

    var url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={minutely,hourly,alerts}&appid=${apiKey}&units=imperial`
    fetch (url)
    .then ((res)=>{
        return res.json();
    })
    .then ((data)=>{
        console.log(data)
        //Add two functions - one to display the current weathher another to display the forecast
        //call the fucntion here
    })
}
// declare the fucntions here

searchButton.addEventListener("click", (event)=>{
    event.preventDefault()
    var userInput = citySearch.value
    
    getCurrentWeather(userInput)
});



