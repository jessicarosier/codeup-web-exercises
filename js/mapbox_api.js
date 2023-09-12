mapboxgl.accessToken = MAPBOX_API_TOKEN;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [-98.4916, 29.426], // starting position [lng, lat]
  zoom: 12, // starting zoom
});

//declares a location for a marker
// let alamoMarker = new mapboxgl.Marker()
//   .setLngLat([-98.4916, 29.426])
//   .addTo(map);

//declares a popup
// let alamoPopup = new mapboxgl.Popup().setHTML("<p>Remember The Alamo!</p>");

//ties a popup to an existing marker
// alamoMarker.setPopup(alamoPopup);

//TODO: Generate a map that shows the city with your favorite restaurant using geocoding
// geocode("The Whole Enchilada, Placentia, CA", MAPBOX_API_TOKEN).then(
//   function (results) {
//     // do something with results
//     let anaheimMarker = new mapboxgl.Marker().setLngLat(results).addTo(map);
//     let anaheimPopup = new mapboxgl.Popup().setHTML(
//       "<p>The Whole Enchilada, Placentia, CA</p>",
//     );
//     anaheimMarker.setPopup(anaheimPopup);
//     map.setZoom(15);
//     map.setCenter(results);
//   },
// );

// geocode("San Antonio", API_TOKEN_HERE).then(function(results) {
//   // do something with results
// })
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

//TODO: How to use reverseGeocode function
// reverseGeocode({lat: 32.77, lng: -96.79}, API_TOKEN_HERE).then(function(results) {
//   // do something with results
// })

function reverseGeocode(coordinates, token) {
  let baseUrl = "https://api.mapbox.com";
  let endPoint = "/geocoding/v5/mapbox.places/";
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

function placeMarkerAndPopup(info, token, map) {
  geocode(info.address, token).then(function (coordinates) {
    let popup = new mapboxgl.Popup().setHTML(info.popupHTML);
    let marker = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map)
      .setPopup(popup);
    popup.addTo(map);
  });
}

//TODO: Display at least 3 restaurants on the map.Create and array of objects with information about each, use a forEach loop

const favoriteCoffee = [
  {
    address: "109 W Santa Fe Ave, Placentia, CA 92870",
    popupHTML:
      "<p>Golden State Coffee Roasters</p> <p>Newly added and in my home town!</p>",
  },
  {
    address: "520 N State College Blvd, Fullerton, CA 92831",
    popupHTML: "<p>Philz Coffee</p>",
  },
  {
    address: "2736 Nutwood Ave D Ste D, Fullerton, CA 92831",
    popupHTML: "<p>Able Coffee Roasters</p>",
  },
];

//creates a marker and popup for each object in the favoriteCoffee array
favoriteCoffee.forEach((element) => {
  placeMarkerAndPopup(element, MAPBOX_API_TOKEN, map);
});

//TODO: Add a select input that allows the user to change the zoom level to 5, 15, or 20.
//targets the "select zoom rate" select element
const zoomSelectEl = $("#zoom");
//Event handler for map zoom selection dropdown
zoomSelectEl.on("change", function () {
  if ($(this).val() === "5") {
    map.setZoom(5);
  }
  if ($(this).val() === "15") {
    map.setZoom(15);
  }
  if ($(this).val() === "20") {
    map.setZoom(20);
  }
});

//TODO: Add a text box for the user to enter an address that will use geocoding to center the map and place a marker on that location.
//targets the address search input element
const searchButton = document.getElementById("address-search-button");
let searchForm = document.getElementById("address-search-form");
//search address form event listener
searchForm.addEventListener(`submit`, function (event) {
  event.preventDefault();
  let formData = new FormData(searchForm, searchButton);
  console.log(formData);
  937;
  let formObj = Object.fromEntries(formData);
  console.log(formObj);
  let searchStr = formObj.address;
  console.log(searchStr);

  geocode(searchStr, MAPBOX_API_TOKEN).then(function (results) {
    // do something with results
    let newMarker = "";
    newMarker = new mapboxgl.Marker().setLngLat(results).addTo(map);
    map.setZoom(15);
    map.setCenter(results);
  });
});

//TODO: Add a button that will hide all markers.
const hideMarkerButton = $("hide-markers");
let mapMarkers = map._markers;

hideMarkerButton.on("click", function () {
  let hiddenMarkers = [];
  hiddenMarkers.push(mapMarkers);
});
