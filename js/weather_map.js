//Constant variable holding Open Weather Map API URL for API call to current weather conditions
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

const MY_MOMS_HOUSE = [33.8596246116055, -117.878436750891];

// BASE_WEATHER_URL + `lat=${MY_MOMS_HOUSE[0]}&lon=${MY_MOMS_HOUSE[1]}&appid=${OPEN_WEATHER_APPID}`;.

//Constant variable holding Open Weather Map API URL for API call to 5 day forecast
const FIVE_DAY_URL = `https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=${OPEN_WEATHER_APPID}`;

//Sends an API call to weather map 5 day, loops through data to grab specified weather information for 5 consecutive days places info in a variable holding html. Then displays the html in a div with the  ID of #insert-weather
$.get(FIVE_DAY_URL + `&q=Honolulu,HI,USA`).done(function (data) {
  // console.log(data.list);
  let html = ``;
  for (let i = 0; i < data.list.length; i += 8) {
    html += `<div class="d-flex flex-column justify-content-center border border-black rounded gap-2 w-25">`;
    html += `<p class="bg-light text-center p-1">${data.list[i].dt_txt}</p>`;
    html += `<p class="d-flex justify-content-center"> Current Temp: ${data.list[
      i
    ].main.temp.toFixed(1)}°F`;
    html += `<p class="d-flex justify-content-center"> High: ${data.list[
      i
    ].main.temp_max.toFixed(1)}°F / Low: ${data.list[i].main.temp_min.toFixed(
      1,
    )}°F</p>`;
    html += `<div class="p-3">`;
    html += `<p>Description: <span class="fw-bold">${data.list[i].weather[0].description}</span></p>`;
    html += `<p>Humidity: <span class="fw-bold">${data.list[i].main.humidity}</span></p>`;
    html += `<p>Wind <span class="fw-bold">${data.list[i].wind.speed}</span></p>`;
    html += `<p>Pressure: <span class="fw-bold">${data.list[i].main.pressure}</span></p>`;
    html += `</div>`;
    html += `</div>`;
  }
  $("#insert-weather").html(html);
});
