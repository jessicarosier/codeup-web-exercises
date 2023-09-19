"use strict";
// import { MAPBOX_API_TOKEN, OPEN_WEATHER_APPID } from "./keys.js";
import keys from "./keys.js";

/*variables used to display correct unit of measurement text, value changed based on radio button selection. Event listener located on line 318*/
let unitOfMeasurment;
let radioButtons = $(".units-toggle");
let degreeDisplay = "°F";
let windSpeedDisplay = "mph";

const date = new Date();
let day = date.getDate();
let month = "";
let year = date.getFullYear();

let monthNames = [
  { name: "January", number: 1 },
  { name: "February", number: 2 },
  { name: "March", number: 3 },
  { name: "April", number: 4 },
  { name: "May", number: 5 },
  { name: "June", number: 6 },
  { name: "July", number: 7 },
  { name: "August", number: 8 },
  { name: "September", number: 9 },
  { name: "October", number: 10 },
  { name: "November", number: 11 },
  { name: "December", number: 12 },
];

let dayNames = [
  "Monday", //index 0
  "Tuesday", //index 1
  "Wednesday", //index 2
  "Thursday", //index 3
  "Friday", //index 4
  "Saturday", //index 5
  "Sunday", //index 6
];

/*(Allows full month name to display in html) if the current month number value is equal to the number property value in the array, then current month is equal to the object name property value*/
for (let i = 0; i < monthNames.length; i++) {
  if (date.getMonth() + 1 === monthNames[i].number) {
    month = monthNames[i].name;
  }
}

//re-formatted date to be displayed in weather cards
let currentDate = `${month} ${day} ${year}`;

let BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${29.50652020966919}&lon=${-98.30651848969364}&units=imperial&appid=${
  keys.OPEN_WEATHER_APPID
}`;

//variable holding Open Weather Map API URL for API call to 5 day forecast API
let FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=${keys.OPEN_WEATHER_APPID}&zip=78109,US`;

//event listener runs on page load to display default weather
addEventListener("load", function (event) {
  unitOfMeasurment = "&units=imperial";
  getCurrentWeather(BASE_WEATHER_URL);
  getFiveDayForecast(FIVE_DAY_URL);
});

//adds mapbox API map to page, displays map in div with ID of #map
mapboxgl.accessToken = keys.MAPBOX_API_TOKEN;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [-98.30651848969364, 29.50652020966919], // starting position [lng, lat]
  projection: "globe",
  zoom: 9, // starting zoom
});

/*adds draggable marker to map, initially sets it to default location until drag event or input city search event*/
let draggableMarker = new mapboxgl.Marker({
  draggable: true,
  color: "red",
})
  .setLngLat([-98.30651848969364, 29.50652020966919])
  .addTo(map);

let markerLngLat = draggableMarker.getLngLat();

/*Sends a call to the daily weather API , grabs specified current weather information and places info in a variable holding html. Then displays the html in a div with the  ID of #todays-weather. This function is called whenever a marker drag event or user input search event is triggered*/
function getCurrentWeather(url) {
  $.get(url).done(function (data) {
    //Takes description and capitalizes the first letter of each word
    let currentWeatherImg = ``;
    let currentWeatherHtml = ``;
    let str = "";

    if (data.weather[0].description.includes("rain")) {
      currentWeatherImg = "img/weather/sun-clouds-rain.svg";
    } else if (data.weather[0].description.includes("clouds")) {
      currentWeatherImg = "img/weather/clouds.svg";
    } else if (data.weather[0].description.includes("snow")) {
      currentWeatherImg = "img/weather/clouds-snow.svg";
    } else if (data.weather[0].description.includes("lightning")) {
      currentWeatherImg = "img/weather/lightning.svg";
    } else if (data.weather[0].description.includes("windy")) {
      currentWeatherImg = "img/weather/wind.svg";
    } else if (data.weather[0].description.includes("clear")) {
      currentWeatherImg = "img/weather/sun.svg";
    } else if (data.weather[0].description.includes("rain")) {
      currentWeatherImg = "img/weather/sun-clouds-rain.svg";
    } else {
      currentWeatherImg = "img/weather/clouds.svg";
    }

    //formats weather description text for consistency
    str = data.weather[0].description.split(" ");
    str.forEach((word, index) => {
      let firstLetter = word.charAt(0).toUpperCase();
      let rest = word.slice(1).toLowerCase();
      str[index] = firstLetter + rest;
    });
    str = str.join(" ");
    data.weather[0].description = str;

    currentWeatherHtml += `<div class="d-flex flex-column">`;
    currentWeatherHtml += `<h1 class="text-center m-0" id="hero-city">${data.name}</h1>`;
    currentWeatherHtml += `<p class="text-center m-0" id="hero-p"><span class="fw-bold">${data.main.temp.toFixed(
      0,
    )}${degreeDisplay}</p></span>`;
    currentWeatherHtml += `<p class="text-center m-0">${str}</p>`;
    currentWeatherHtml += `<p class="text-center m-0">H: ${data.main.temp_max.toFixed(
      0,
    )}°    L:${data.main.temp_min.toFixed(0)}°</p>`;
    currentWeatherHtml += `<p class="text-center m-0" id="daily-date">${currentDate}</p>`;

    /*grabs detailed daily weather information and store it in a variable, then displays the compiled info a div with an ID of #todays-conditions*/
    let todaysConditionsHtml = ``;
    todaysConditionsHtml += `<div class="d-flex gap-2 flex-column justify-content-center mt-1 todays-conditions">`;
    todaysConditionsHtml += `<p class="text-center m-0">Feels Like: ${data.main.feels_like.toFixed(
      0,
    )}${degreeDisplay}</p>`;
    todaysConditionsHtml += `<p class="text-center m-0">Wind Speed: ${data.wind.speed.toFixed(
      0,
    )} ${windSpeedDisplay}</p>`;
    todaysConditionsHtml += `<p class="text-center m-0">Humidity: ${data.main.humidity}%</p>`;
    todaysConditionsHtml += `<p class="text-center m-0">Pressure: ${(
      data.main.pressure / 33.864
    ).toFixed(2)} inHg</p>`;
    todaysConditionsHtml += `</div>`;

    $("#todays-weather").html(currentWeatherHtml);
    $("#todays-img").html(
      `<img src="${currentWeatherImg}" id="current-weather-image" />`,
    );
    $("#todays-conditions").html(todaysConditionsHtml);
    $("video").html(`<source src="video/cloud1.mp4" type="video/mp4" />`);
  });
}

/*Sends an API call to weather map 5 day, loops through data to grab specified weather information for 5 consecutive days places info in a variable holding html. Then displays the html in a div with the  ID of #insert-weather. This function is called whenever a marker drag event or user input search event is triggered*/
function getFiveDayForecast(url) {
  $.get(url).done(function (data) {
    // console.log(data.list[0].dt_txt);
    let str = "";
    let fiveDayHtml = ``;
    let weatherImg = "";
    let detailedHtml = "";

    //Takes description and capitalizes the first letter of each word
    for (let i = 0; i < data.list.length; i += 8) {
      //conditional logic determines weatherImg displayed in card html
      if (data.list[i].weather[0].description.includes("rain")) {
        weatherImg = "img/weather/sun-clouds-rain.svg";
      } else if (data.list[i].weather[0].description.includes("clouds")) {
        weatherImg = "img/weather/clouds.svg";
      } else if (data.list[i].weather[0].description.includes("snow")) {
        weatherImg = "img/weather/clouds-snow.svg";
      } else if (data.list[i].weather[0].description.includes("lightning")) {
        weatherImg = "img/weather/lightning.svg";
      } else if (data.list[i].weather[0].description.includes("windy")) {
        weatherImg = "img/weather/wind.svg";
      } else if (data.list[i].weather[0].description.includes("clear")) {
        weatherImg = "img/weather/sun.svg";
      } else {
        weatherImg = "img/weather/clouds.svg";
      }

      str = data.list[i].weather[0].description.split(" ");
      str.forEach((word, index) => {
        let firstLetter = word.charAt(0).toUpperCase();
        let rest = word.slice(1).toLowerCase();
        str[index] = firstLetter + rest;
      });
      str = str.join(" ");
      data.list[i].weather[0].description = str;

      //gets the actual day of week name from the dt in the data object
      let newDate = new Date(data.list[i].dt * 1000);
      let days = newDate.getDate();
      /*returns a number 0 - 6, each number correlates to the string stored at that index number in the dayNames array  //ex. 0 = Monday, 1 = Tuesday etc...*/
      let dayName = dayNames[newDate.getDay()];

      //Creates weather squares for XL screen
      fiveDayHtml += `<div class="flex-column justify-content-center align-items-center gap-2 p-2 five-day-square" id="five-day-card${i}">`;
      fiveDayHtml += `${dayName}`;
      fiveDayHtml += `<p class ="m-0">${month} ${(days += 1)}</p>`;
      fiveDayHtml += `<img src=${weatherImg} class="weather-icon-img" />`;
      fiveDayHtml += `<p class="d-flex justify-content-center m-0"> ${data.list[
        i
      ].main.temp_max.toFixed(0)}${degreeDisplay} / ${data.list[
        i
      ].main.temp_min.toFixed(0)}${degreeDisplay}</p>`;
      fiveDayHtml += `</div>`;

      //Creates weather tiles for L/M screen
      fiveDayHtml += `<div class="flex-column justify-content-center align-items-center text-white five-day-square-lrg" id="five-day-lrg${i}">`;
      fiveDayHtml += `<p class ="m-0">${month} ${days}</p>`;
      fiveDayHtml += `<img src=${weatherImg} class="weather-icon-img-lrg" />`;
      fiveDayHtml += `<p class="d-flex justify-content-center m-0"> ${data.list[
        i
      ].main.temp_max.toFixed(0)}${degreeDisplay} / ${data.list[
        i
      ].main.temp_min.toFixed(0)}${degreeDisplay}</p>`;
      fiveDayHtml += `</div>`;

      //Creates detailed info card for XL screen
      detailedHtml += `<div class="flex-column justify-content-start align-items-start gap-1 p-2 detailed-weather" id="condition${i}">`;
      detailedHtml += `<p class="m-0 fw-bold align-self-center">View details</p>`;
      detailedHtml += `<p class="m-0"><span>${data.list[i].weather[0].description}</span></p>`;
      detailedHtml += `<p class="m-0">Humidity: <span class="fw-bold">${data.list[i].main.humidity}%</span></p>`;
      detailedHtml += `<p class="m-0">Real Feel: <span class="fw-bold">${data.list[
        i
      ].main.feels_like.toFixed(0)}${degreeDisplay}</span></p>`;
      detailedHtml += `<p class = "m-0">Wind <span class="fw-bold">${data.list[
        i
      ].wind.speed.toFixed(0)}${windSpeedDisplay}</span></p>`;
      detailedHtml += `<p class="m-0">Pressure: <span class="fw-bold">${(
        data.list[i].main.pressure / 33.864
      ).toFixed(2)} inHg</span></p>`;
      detailedHtml += `</div>`;

      //Creates detailed info card for L/M screen
      detailedHtml += `<div class="align-items-start gap-2 detailed-weather-lrg" id="condition-lrg${i}">`;
      detailedHtml += `<p class="m-0 mx-3 fw-bold align-self-center"> < </p>`;
      detailedHtml += `<p class="m-0"><span>${data.list[i].weather[0].description}</span></p>`;
      detailedHtml += `<p class="m-0">Humidity: <span class="fw-bold">${data.list[i].main.humidity}%</span></p>`;
      detailedHtml += `<p class="m-0">Real Feel: <span class="fw-bold">${data.list[
        i
      ].main.feels_like.toFixed(0)}${degreeDisplay}</span></p>`;
      detailedHtml += `<p class = "m-0">Wind <span class="fw-bold">${data.list[
        i
      ].wind.speed.toFixed(0)}${windSpeedDisplay}</span></p>`;
      detailedHtml += `<p class="m-0 me-5">Pressure: <span class="fw-bold">${(
        data.list[i].main.pressure / 33.864
      ).toFixed(1)} inHg</span></p>`;
      detailedHtml += `</div>`;
    }
    $("#insert-weather").html(fiveDayHtml);
    $("#insert-detail").html(detailedHtml);
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

  geocode(searchStr, keys.MAPBOX_API_TOKEN).then(function (results) {
    //sets the marker location to the lat,long returned from geocode function
    draggableMarker.setLngLat(results);
    map.flyTo({
      center: results,
      zoom: 11,
      speed: 0.7,
    });

    /*updates the API call URLs with the lat,long obtained from geocode function, then passes the new API cal URL into the functions that will display the new weather info html*/
    FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${results[1]}&lon=${results[0]}${unitOfMeasurment}&appid=${keys.OPEN_WEATHER_APPID}`;
    BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${results[1]}&lon=${results[0]}${unitOfMeasurment}&appid=${keys.OPEN_WEATHER_APPID}`;

    getCurrentWeather(BASE_WEATHER_URL);
    getFiveDayForecast(FIVE_DAY_URL);

    markerLngLat = draggableMarker.getLngLat();
  });
  //clears the search input
  $("#address").val("");
});

/*Event listener that fires on marker drag end. grabs the lat/long location of the marker when drag event ends, then re-defines the API call URLs with the new lat/long. Finally, calls the functions that update the weather information html being displayed*/
function onDragEnd() {
  markerLngLat = draggableMarker.getLngLat();
  BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${markerLngLat.lat}&lon=${markerLngLat.lng}${unitOfMeasurment}&appid=${keys.OPEN_WEATHER_APPID}`;
  FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${markerLngLat.lat}&lon=${markerLngLat.lng}${unitOfMeasurment}&appid=${keys.OPEN_WEATHER_APPID}`;

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

//event listener that runs when the user clicks anywhere on the map
map.on(`click`, function (event) {
  console.log(event);
  console.log(event.lngLat);
  draggableMarker.setLngLat([event.lngLat.lng, event.lngLat.lat]);
  markerLngLat = draggableMarker.getLngLat();
  BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${event.lngLat.lat}&lon=${event.lngLat.lng}${unitOfMeasurment}&appid=${keys.OPEN_WEATHER_APPID}`;
  FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${event.lngLat.lat}&lon=${event.lngLat.lng}${unitOfMeasurment}&appid=${keys.OPEN_WEATHER_APPID}`;
  map.flyTo({
    center: markerLngLat,
    zoom: 11,
    speed: 0.7,
  });
  getCurrentWeather(BASE_WEATHER_URL);
  getFiveDayForecast(FIVE_DAY_URL);
});

/*event listener for F°/C° radio buttons, toggles the API get url between units=imperial to display temp in fahrenheit and units=metric to display degrees in celsius */
radioButtons.on("change", function (event) {
  event.preventDefault();
  markerLngLat = draggableMarker.getLngLat();
  if (document.querySelector("#celsius").checked) {
    unitOfMeasurment = "&units=metric";
    degreeDisplay = "°C";
    windSpeedDisplay = "km";
  } else {
    unitOfMeasurment = "&units=imperial";
    degreeDisplay = "°F";
    windSpeedDisplay = "mph";
  }
  BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${markerLngLat.lat}&lon=${markerLngLat.lng}${unitOfMeasurment}&appid=${keys.OPEN_WEATHER_APPID}`;
  FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${markerLngLat.lat}&lon=${markerLngLat.lng}${unitOfMeasurment}&appid=${keys.OPEN_WEATHER_APPID}`;

  getCurrentWeather(BASE_WEATHER_URL);
  getFiveDayForecast(FIVE_DAY_URL);
});
