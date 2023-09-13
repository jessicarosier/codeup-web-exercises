//variables to store html that will be displayed on click event
let dayOneHtml = "";
let dayTwoHtml = "";
let dayThreeHtml = "";
let dayFourHtml = "";
let dayFiveHtml = "";

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${month}/${day}/${year}`;

//Constant variable holding Open Weather Map API URL for API call to current weather conditions
let BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=${OPEN_WEATHER_APPID}&q=Converse,TX,USA`;

//variable holding Open Weather Map API URL for API call to 5 day forecast
let FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=${OPEN_WEATHER_APPID}&zip=78109,US`;

//adds mapbox API map to page, displays map in div with ID of #map
mapboxgl.accessToken = MAPBOX_API_TOKEN;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [-98.4842, 37.0119], // starting position [lng, lat] //center of U.S
  projection: "globe",
  zoom: 5, // starting zoom
});

const nav = new mapboxgl.NavigationControl({
  showCompass: true,
  showZoom: true,
});
map.addControl(nav, "top-left");

let draggableMarker = new mapboxgl.Marker({
  draggable: true,
})
  .setLngLat([-98.4842, 37.0119])
  .addTo(map);

let markerLngLat = draggableMarker.getLngLat();

//event listener runs on page load to display default weather
addEventListener("load", function (event) {
  getCurrentWeather(BASE_WEATHER_URL);
  getFiveDayForecast(FIVE_DAY_URL);
});

function getCurrentWeather(url) {
  $.get(url).done(function (data) {
    let currentWeatherHtml = ``;
    currentWeatherHtml += `<div class="d-flex flex-column">`;
    currentWeatherHtml += `<h1 class="text-center">${data.name}</h1>`;
    currentWeatherHtml += `<p class="text-center" id="hero-p"><span class="fw-bold">${data.main.temp.toFixed(
      0,
    )}°F</p></span>`;
    currentWeatherHtml += `<p class="text-center fs-1">${currentDate}</p>`;
    let currentWeatherImg = "";

    if (data.weather[0].description.includes("light rain")) {
      currentWeatherImg = "img/weather/cloud-drizzle.svg";
    } else if (data.weather[0].description.includes("clouds")) {
      currentWeatherImg = "img/weather/cloud.svg";
    } else if (data.weather[0].description.includes("snow")) {
      currentWeatherImg = "img/weather/cloud-snow.svg";
    } else if (data.weather[0].description.includes("lightning")) {
      currentWeatherImg = "img/weather/lightning.svg";
    } else if (data.weather[0].description.includes("windy")) {
      currentWeatherImg = "img/weather/wind.svg";
    } else if (data.weather[0].description.includes("clear")) {
      currentWeatherImg = "img/weather/brightness-high.svg";
    } else if (data.weather[0].description.includes("rain")) {
      currentWeatherImg = "img/weather/cloud-rain.svg";
    }

    $("#todays-weather").html(currentWeatherHtml);
    $("#todays-img").html(
      `<img src=${currentWeatherImg} id="current-weather-img" />`,
    );
  });
}

//Sends an API call to weather map 5 day, loops through data to grab specified weather information for 5 consecutive days places info in a variable holding html. Then displays the html in a div with the  ID of #insert-weather
function getFiveDayForecast(url) {
  $.get(url).done(function (data) {
    let fiveDayHtml = ``;
    let weatherImg = "";

    //conditional logic determines weatherImg displayed in card html
    for (let i = 0; i < data.list.length; i += 8) {
      if (data.list[i].weather[0].description.includes("light rain")) {
        weatherImg = "img/weather/cloud-drizzle.svg";
      } else if (data.list[i].weather[0].description.includes("clouds")) {
        weatherImg = "img/weather/cloud.svg";
      } else if (data.list[i].weather[0].description.includes("snow")) {
        weatherImg = "img/weather/cloud-snow.svg";
      } else if (data.list[i].weather[0].description.includes("lightning")) {
        weatherImg = "img/weather/lightning.svg";
      } else if (data.list[i].weather[0].description.includes("windy")) {
        weatherImg = "img/weather/wind.svg";
      } else if (data.list[i].weather[0].description.includes("clear")) {
        weatherImg = "img/weather/brightness-high.svg";
      }
      fiveDayHtml += `<div class="d-flex flex-column justify-content-center align-items-center gap-2 border border-black rounded p-2 w-75 five-day-square">`;
      fiveDayHtml += `<p class="text-center p-1">${data.list[
        i
      ].dt_txt.substring(0, data.list[i].dt_txt.indexOf(" "))}</p>`;
      fiveDayHtml += `<img src=${weatherImg} class="weather-icon-img" />`;
      fiveDayHtml += `<p class="d-flex justify-content-center"> ${data.list[
        i
      ].main.temp_max.toFixed(0)}°F / ${data.list[i].main.temp_min.toFixed(
        0,
      )}°F</p>`;
      // fiveDayHtml += `<img src=${weatherImg} class="weather-icon-img" />`;
      fiveDayHtml += `<div class="p-3 d-none detailed-weather">`;
      fiveDayHtml += `<p>Description: <span class="fw-bold">${data.list[i].weather[0].description}</span></p>`;
      fiveDayHtml += `<p>Humidity: <span class="fw-bold">${data.list[i].main.humidity}%</span></p>`;
      fiveDayHtml += `<p>Real Feel: <span class="fw-bold">${data.list[
        i
      ].main.feels_like.toFixed(0)}°F</span></p>`;
      fiveDayHtml += `<p>Wind <span class="fw-bold">${data.list[
        i
      ].wind.speed.toFixed(0)}mph</span></p>`;
      fiveDayHtml += `<p>Pressure: <span class="fw-bold">${(
        data.list[i].main.pressure / 33.864
      ).toFixed(2)} inHg</span></p>`;
      fiveDayHtml += `</div>`;
      fiveDayHtml += `</div>`;
    }
    $("#insert-weather").html(fiveDayHtml);
  });
}

//takes in a string value and MapBox API Key, returns array containing [lat, lon]
function geocode(search, token) {
  let baseUrl = "https://api.mapbox.com";
  let endPoint = "/geocoding/v5/mapbox.places/";
  return fetch(
    baseUrl +
      endPoint +
      encodeURIComponent(search) +
      ".json" +
      "?" +
      "access_token=" +
      token,
  )
    .then(function (res) {
      return res.json();
      // to get all the data from the request, comment out the following three lines...
    })
    .then(function (data) {
      return data.features[0].center;
    });
}

//targets the input element with the ID of #address-search-bar
const searchButton = document.getElementById("weather-search-button");
//targets the form element with the ID of #address-search-form
let searchForm = document.getElementById("search-form");
//search address form event listener
searchForm.addEventListener(`submit`, function (event) {
  event.preventDefault();
  //grabs the value of all the form inputs
  let formData = new FormData(searchForm, searchButton);
  //converts the formData to an object
  let formObj = Object.fromEntries(formData);
  //stores the value of the object address property. This will be the string address the user typed in.
  let searchStr = formObj.address;

  geocode(searchStr, MAPBOX_API_TOKEN).then(function (results) {
    // do something with results
    // let newMarker = "";
    // newMarker = new mapboxgl.Marker().setLngLat(results).addTo(map);
    draggableMarker.setLngLat(results);
    map.flyTo({
      center: results,
      zoom: 11,
      speed: 0.7,
    });
    FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${results[1]}&lon=${results[0]}&units=imperial&appid=${OPEN_WEATHER_APPID}`;
    BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${results[1]}&lon=${results[0]}&units=imperial&appid=${OPEN_WEATHER_APPID}`;

    getCurrentWeather(BASE_WEATHER_URL);
    getFiveDayForecast(FIVE_DAY_URL);

    markerLngLat = draggableMarker.getLngLat();
  });
});

function reverseGeocode(coordinates, token) {
  var baseUrl = "https://api.mapbox.com";
  var endPoint = "/geocoding/v5/mapbox.places/";
  return (
    fetch(
      baseUrl +
        endPoint +
        coordinates.lng +
        "," +
        coordinates.lat +
        ".json" +
        "?" +
        "access_token=" +
        token,
    )
      .then(function (res) {
        return res.json();
      })
      // to get all the data from the request, comment out the following three lines...
      .then(function (data) {
        return data.features[0].place_name;
      })
  );
}

//set default display when search occurs, change get request URL
function updateMarkerLocation() {
  markerLngLat = draggableMarker.getLngLat();
  BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${markerLngLat.lat}&lon=${markerLngLat.lng}&units=imperial&appid=${OPEN_WEATHER_APPID}`;
  FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${markerLngLat.lat}&lon=${markerLngLat.lng}&units=imperial&appid=${OPEN_WEATHER_APPID}`;
  map.setZoom(10);
  map.setCenter(markerLngLat);
  map.setZoom(5);
  getCurrentWeather(BASE_WEATHER_URL);
  getFiveDayForecast(FIVE_DAY_URL);
}

// Event listener that fires on marker drag end.
function onDragEnd() {
  markerLngLat = draggableMarker.getLngLat();
  BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${markerLngLat.lat}&lon=${markerLngLat.lng}&units=imperial&appid=${OPEN_WEATHER_APPID}`;
  FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${markerLngLat.lat}&lon=${markerLngLat.lng}&units=imperial&appid=${OPEN_WEATHER_APPID}`;
  map.setZoom(5);
  map.flyTo({
    center: markerLngLat,
    zoom: 11,
    speed: 0.7,
  });
  getCurrentWeather(BASE_WEATHER_URL);
  getFiveDayForecast(FIVE_DAY_URL);
}

//event listener that runs onDragEnd function on marker drag end
draggableMarker.on("dragend", onDragEnd);

let fiveDaySquare = $(".five-day-square");
fiveDaySquare.on("click", function (event) {
  $(".detailed-weather").toggleClass("d-none");
});

$("body").on("hover", fiveDaySquare, function (event) {
  event.target.css("background-color", "blue");
});
