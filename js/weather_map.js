//Constant variable holding Open Weather Map API URL for API call to current weather conditions
const BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=${OPEN_WEATHER_APPID}`;

const MY_MOMS_HOUSE = [33.8596246116055, -117.878436750891];

// BASE_WEATHER_URL + `lat=${MY_MOMS_HOUSE[0]}&lon=${MY_MOMS_HOUSE[1]}&appid=${OPEN_WEATHER_APPID}`;.

$.get(BASE_WEATHER_URL + `&q=Honolulu,HI,USA`).done(function (data) {
  console.log(data);
  let currentWeatherHtml = ``;
  currentWeatherHtml += `<div>`;
  currentWeatherHtml += `<p>${data.name}</p>`;
  currentWeatherHtml += `<p>Current Temp: <span class="fw-bold">${data.main.temp.toFixed(
    1,
  )}°F</p></span>`;

  $("#todays-weather").html(currentWeatherHtml);
});

//Constant variable holding Open Weather Map API URL for API call to 5 day forecast
const FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=${OPEN_WEATHER_APPID}`;

//Sends an API call to weather map 5 day, loops through data to grab specified weather information for 5 consecutive days places info in a variable holding html. Then displays the html in a div with the  ID of #insert-weather
$.get(FIVE_DAY_URL + `&q=Honolulu,HI,USA`).done(function (data) {
  let fiveDayHtml = ``;
  let weatherImg = "";

  //conditional logic determines weatherImg displayed in card html
  for (let i = 0; i < data.list.length; i += 8) {
    if (data.list[i].weather[0].description.includes("rain")) {
      weatherImg = "img/weather/drizzle.svg";
    } else if (data.list[i].weather[0].description.includes("clouds")) {
      weatherImg = "img/weather/sun-cloud.svg";
    } else if (data.list[i].weather[0].description.includes("snow")) {
      weatherImg = "img/weather/snow.svg";
    } else if (data.list[i].weather[0].description.includes("lightning")) {
      weatherImg = "img/weather/lightning.svg";
    } else if (data.list[i].weather[0].description.includes("windy")) {
      weatherImg = "img/weather/wind.svg";
    }
    fiveDayHtml += `<div class="d-flex flex-column justify-content-center align-items-center border border-black rounded gap-2 w-25">`;
    fiveDayHtml += `<p class="bg-light text-center p-1">${data.list[
      i
    ].dt_txt.substring(0, data.list[i].dt_txt.indexOf(" "))}</p>`;
    fiveDayHtml += `<p class="d-flex justify-content-center"> High: ${data.list[
      i
    ].main.temp_max.toFixed(1)}°F / Low: ${data.list[i].main.temp_min.toFixed(
      1,
    )}°F</p>`;
    fiveDayHtml += `<img src=${weatherImg} class="weather-icon-img" />`;
    fiveDayHtml += `<div class="p-3">`;
    fiveDayHtml += `<p>Description: <span class="fw-bold">${data.list[i].weather[0].description}</span></p>`;
    fiveDayHtml += `<p>Humidity: <span class="fw-bold">${data.list[i].main.humidity}</span></p>`;
    fiveDayHtml += `<p>Wind <span class="fw-bold">${data.list[i].wind.speed}</span></p>`;
    fiveDayHtml += `<p>Pressure: <span class="fw-bold">${data.list[i].main.pressure}</span></p>`;
    fiveDayHtml += `</div>`;
    fiveDayHtml += `</div>`;
  }
  $("#insert-weather").html(fiveDayHtml);
});

// function weatherConditions(obj) {
//   if (obj.list[i].weather[0].includes("rain")) {
//     weatherImg = "img/weather/drizzle.svg";
//   }
// }

//adds mapbox API map to page, displays map in div with ID of #map
mapboxgl.accessToken = MAPBOX_API_TOKEN;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [-117.8713292, 33.8819333], // starting position [lng, lat]
  zoom: 13, // starting zoom
});

// geocode("San Antonio", API_TOKEN_HERE).then(function(results) {
//   // do something with results
// })
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

let ids = 0;
function placeMarkerAndPopup(info, token, map) {
  geocode(info.address, token).then(function (coordinates) {
    let popup = new mapboxgl.Popup().setHTML(info.popupHTML);
    let marker = new mapboxgl.Marker({
      color: info.color,
    })
      .setLngLat(coordinates)
      .addTo(map)
      .setPopup(popup);
    popup.addTo(map);
    //sets the id of the newly created marker to the next id #
    marker._element.id = `marker${ids++}`;
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
  con;
  //converts the formData to an object
  let formObj = Object.fromEntries(formData);
  console.log(formObj);
  //stores the value of the object address property. This will be the string address the user typed in.
  let searchStr = formObj.address;

  geocode(searchStr, MAPBOX_API_TOKEN).then(function (results) {
    // do something with results
    let newMarker = "";
    newMarker = new mapboxgl.Marker().setLngLat(results).addTo(map);
    map.setZoom(15);
    map.setCenter(results);
  });
});

//targets the markers and popups by class name
//toggles (adds and removes) the "invisible" class when button is clicked
$("#hide-markers").on("click", function () {
  $(".mapboxgl-marker").toggleClass("invisible");
  $(".mapboxgl-popup").toggleClass("invisible");
});
