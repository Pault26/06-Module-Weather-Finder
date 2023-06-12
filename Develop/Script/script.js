// Sets up script variables
var city = document.querySelector("#citySearch");
var searchBtnEl = document.querySelector("#searchBtn");
var cityList = document.querySelector("#cityList");
var today = dayjs().format('MM/DD/YYYY');

// Adds dates to application
$("#cityName").text("City Name (" + today + ")");
$("#futureDate1").text(dayjs().add(1, 'day').format('MM/DD/YYYY'));
$("#futureDate2").text(dayjs().add(2, 'day').format('MM/DD/YYYY'));
$("#futureDate3").text(dayjs().add(3, 'day').format('MM/DD/YYYY'));
$("#futureDate4").text(dayjs().add(4, 'day').format('MM/DD/YYYY'));
$("#futureDate5").text(dayjs().add(5, 'day').format('MM/DD/YYYY'));

// Function to fetch city data
function fetchCityData(cityValue) {
  var cityUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityValue + "&units=imperial&appid=2bb4402fe29a55c09200fb5cca6bce10";
  fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Sets city name, temp, wind spd, humidity, and weather icon as well as for the next 5 days
      $("#cityName").text(data.city.name + " (" + today + ") ");
      $("#iconToday").attr("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png");
      $("#tempToday").text("Temp: " + data.list[0].main.temp + " \u00B0F");
      $("#windToday").text("Wind: " + data.list[0].wind.speed + " MPH");
      $("#humidityToday").text("Humidity: " + data.list[0].main.humidity + " %");

      $("#futureIcon1").attr("src", "http://openweathermap.org/img/w/" + data.list[5].weather[0].icon + ".png");
      $("#futureIcon2").attr("src", "http://openweathermap.org/img/w/" + data.list[13].weather[0].icon + ".png");
      $("#futureIcon3").attr("src", "http://openweathermap.org/img/w/" + data.list[21].weather[0].icon + ".png");
      $("#futureIcon4").attr("src", "http://openweathermap.org/img/w/" + data.list[29].weather[0].icon + ".png");
      $("#futureIcon5").attr("src", "http://openweathermap.org/img/w/" + data.list[37].weather[0].icon + ".png");

      $("#futureTemp1").text(data.list[0].main.temp + " \u00B0F");
      $("#futureTemp2").text(data.list[13].main.temp + " \u00B0F");
      $("#futureTemp3").text(data.list[21].main.temp + " \u00B0F");
      $("#futureTemp4").text(data.list[29].main.temp + " \u00B0F");
      $("#futureTemp5").text(data.list[37].main.temp + " \u00B0F");

      $("#futureWind1").text(data.list[5].wind.speed + " MPH");
      $("#futureWind2").text(data.list[13].wind.speed + " MPH");
      $("#futureWind3").text(data.list[21].wind.speed + " MPH");
      $("#futureWind4").text(data.list[29].wind.speed + " MPH");
      $("#futureWind5").text(data.list[37].wind.speed + " MPH");

      $("#futureHumid1").text(data.list[5].main.humidity + " %");
      $("#futureHumid2").text(data.list[13].main.humidity + " %");
      $("#futureHumid3").text(data.list[21].main.humidity + " %");
      $("#futureHumid4").text(data.list[29].main.humidity + " %");
      $("#futureHumid5").text(data.list[37].main.humidity + " %");
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
}

// Event listener for search button click
searchBtnEl.addEventListener("click", function () {
  var cityValue = city.value;
  if (cityValue !== "") {
    localStorage.setItem(cityValue, cityValue);
    city.value = "";
    createCityButton(cityValue);
    fetchCityData(cityValue);
  }
});

// Event listener for city button click
cityList.addEventListener("click", function (event) {
  var cityValue = event.target.textContent;
  fetchCityData(cityValue);
});

// Function to create city buttons
function createCityButton(cityValue) {
  var newCityBtn = document.createElement("button");
  newCityBtn.setAttribute("class", "list-group-item list-group-item-action");
  newCityBtn.setAttribute("type", "button");
  newCityBtn.textContent = cityValue;
  cityList.appendChild(newCityBtn);
}

// Retrieve and display past city searches
for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  if (key !== "") {
    createCityButton(localStorage.getItem(key));
  }
}