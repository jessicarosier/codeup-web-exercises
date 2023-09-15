//variables to store html that will be displayed on click event
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

for (let i = 0; i < monthNames.length; i++) {
  if (date.getMonth() + 1 === monthNames[i].number) {
    month = monthNames[i].name;
  }
}

let currentDate = `${month} ${day} ${year}`;

//variable holding Open Weather Map API URL for API call to current weather conditions API
let BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=${OPEN_WEATHER_APPID}&q=Converse,TX,USA`;

//variable holding Open Weather Map API URL for API call to 5 day forecast API
let FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=${OPEN_WEATHER_APPID}&zip=78109,US`;

//adds mapbox API map to page, displays map in div with ID of #map
mapboxgl.accessToken = MAPBOX_API_TOKEN;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [-98.30651848969364, 29.50652020966919], // starting position [lng, lat]
  projection: "globe",
  zoom: 9, // starting zoom
});

//adds draggable marker to map, initially sets it to default location until drag event or input city search event
let draggableMarker = new mapboxgl.Marker({
  draggable: true,
})
  .setLngLat([-98.30651848969364, 29.50652020966919])
  .addTo(map);

let markerLngLat = draggableMarker.getLngLat();

//event listener runs on page load to display default weather
addEventListener("load", function (event) {
  getCurrentWeather(BASE_WEATHER_URL);
  getFiveDayForecast(FIVE_DAY_URL);
});

//Sends a call to the daily weather API , grabs specified current weather information and places info in a variable holding html. Then displays the html in a div with the  ID of #todays-weather. This function is called whenever a marker drag event or user input search event is triggered
function getCurrentWeather(url) {
  $.get(url).done(function (data) {
    console.log(data);
    //Takes description and capitalizes the first letter of each word
    let currentWeatherImg = ``;
    let currentBackground = ``;
    let currentWeatherHtml = ``;
    let str = "";

    if (data.weather[0].description.includes("rain")) {
      currentBackground = "video/rain.mp4";
      currentWeatherImg = "img/weather/sun-clouds-rain.svg";
    } else if (data.weather[0].description.includes("clouds")) {
      currentWeatherImg = "img/weather/clouds.svg";
      currentBackground = "video/clouds.mp4";
    } else if (data.weather[0].description.includes("snow")) {
      currentWeatherImg = "img/weather/clouds-snow.svg";
      currentBackground = "video/sun.mp4";
    } else if (data.weather[0].description.includes("lightning")) {
      currentWeatherImg = "img/weather/lightning.svg";
      currentBackground = "video/rain.mp4";
    } else if (data.weather[0].description.includes("windy")) {
      currentWeatherImg = "img/weather/wind.svg";
      currentBackground = "video/rain.mp4";
    } else if (data.weather[0].description.includes("clear")) {
      console.log("clear");
      currentWeatherImg = "img/weather/sun.svg";
      currentBackground = "video/rain.mp4";
    } else if (data.weather[0].description.includes("rain")) {
      currentWeatherImg = "img/weather/sun-clouds-rain.svg";
      currentBackground = "video/rain.mp4";
    } else {
      currentWeatherImg = "img/weather/clouds.svg";
      currentBackground = "video/rain.mp4";
    }

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
    )}°F</p></span>`;
    currentWeatherHtml += `<p class="text-center m-0">${str}</p>`;
    currentWeatherHtml += `<p class="text-center m-0">H: ${data.main.temp_max.toFixed(
      0,
    )}°    L:${data.main.temp_min.toFixed(0)}°</p> `;
    currentWeatherHtml += `<p class="text-center fs-1 m-0">${currentDate}</p>`;

    //grabs detailed daily weather information and store it in a variable, then displays the compiled info a div with an ID of #todays-conditions
    let todaysConditionsHtml = ``;
    todaysConditionsHtml += `<div class="d-flex gap-2 flex-column justify-content-center mt-1">`;
    todaysConditionsHtml += `<p class="text-center m-0">Feels Like: ${data.main.feels_like.toFixed(
      0,
    )}°F</p>`;
    todaysConditionsHtml += `<p class="text-center m-0">Wind Speed: ${data.wind.speed.toFixed(
      0,
    )} mph</p>`;
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
    $("video").html(`<source src="${currentBackground}" type="video/mp4" />`);
  });
}

//Sends an API call to weather map 5 day, loops through data to grab specified weather information for 5 consecutive days places info in a variable holding html. Then displays the html in a div with the  ID of #insert-weather. This function is called whenever a marker drag event or user input search event is triggered
function getFiveDayForecast(url) {
  $.get(url).done(function (data) {
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

      fiveDayHtml += `<div class="d-flex flex-column justify-content-center align-items-center gap-2 p-2 five-day-square" id="five-day-card${i}">`;
      fiveDayHtml += `<p class ="m-0">${month} ${(day += 1)} ${year}</p>`;
      fiveDayHtml += `<img src=${weatherImg} class="weather-icon-img" />`;
      fiveDayHtml += `<p class="d-flex justify-content-center fs-4 fw-bold m-0"> ${data.list[
        i
      ].main.temp_max.toFixed(0)}°F / ${data.list[i].main.temp_min.toFixed(
        0,
      )}°F</p>`;
      fiveDayHtml += `</div>`;

      detailedHtml += `<div class="d-flex flex-column justify-content-start align-items-center gap-1 p-2 detailed-weather" id="condition${i}">`;
      detailedHtml += `<p class="m-0">Detailed Info</p>`;
      detailedHtml += `<p class="m-0"><span class="fw-bold">${data.list[i].weather[0].description}</span></p>`;
      detailedHtml += `<p class="m-0">Humidity: <span class="fw-bold">${data.list[i].main.humidity}%</span></p>`;
      detailedHtml += `<p class="m-0">Real Feel: <span class="fw-bold">${data.list[
        i
      ].main.feels_like.toFixed(0)}°F</span></p>`;
      detailedHtml += `<p class = "m-0">Wind <span class="fw-bold">${data.list[
        i
      ].wind.speed.toFixed(0)}mph</span></p>`;
      detailedHtml += `<p class="m-0">Pressure: <span class="fw-bold">${(
        data.list[i].main.pressure / 33.864
      ).toFixed(2)} inHg</span></p>`;
      detailedHtml += `</div>`;
    }
    $("#insert-weather").html(fiveDayHtml);
    $("#insert-detail").html(detailedHtml);
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
    //sets the marker location to the lat,long returned from geocode function
    draggableMarker.setLngLat(results);
    map.flyTo({
      center: results,
      zoom: 11,
      speed: 0.7,
    });

    //updates the API call URLs with the lat,long obtained from geocode function, then passes the new API cal URL into the functions that will display the new weather info html.
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

// Event listener that fires on marker drag end. grabs the lat/long location of the marker when drag event ends, then re-defines the API call URLs with the new lat/long. Finally, calls the functions that update the weather information html being displayed.
function onDragEnd() {
  markerLngLat = draggableMarker.getLngLat();
  BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${markerLngLat.lat}&lon=${markerLngLat.lng}&units=imperial&appid=${OPEN_WEATHER_APPID}`;
  FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${markerLngLat.lat}&lon=${markerLngLat.lng}&units=imperial&appid=${OPEN_WEATHER_APPID}`;
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
