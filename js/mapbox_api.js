const zoomSelectEl = $("#zoom");

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
geocode("The Whole Enchilada, Placentia, CA", MAPBOX_API_TOKEN).then(
  function (results) {
    // do something with results
    let anaheimMarker = new mapboxgl.Marker().setLngLat(results).addTo(map);
    let anaheimPopup = new mapboxgl.Popup().setHTML(
      "<p>The Whole Enchilada, Placentia, CA</p>",
    );
    anaheimMarker.setPopup(anaheimPopup);
    map.setZoom(15);
    map.setCenter(results);
  },
);

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

function placeMarkerAndPopup(info, token, map) {
  geocode(info.address, token).then(function (coordinates) {
    var popup = new mapboxgl.Popup().setHTML(info.popupHTML);
    var marker = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map)
      .setPopup(popup);
    popup.addTo(map);
  });
}

//TODO: Display at least 3 restaurants on the map.Create and array of objects with information about each, use a forEach loop

let favoriteCoffee = [
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
  console.log(element.address);
  placeMarkerAndPopup(element, MAPBOX_API_TOKEN, map);
});

zoomSelectEl.on("change", function () {
  if ($(this).val() === "5") {
    console.log("5 is selected");
    map.setZoom(5);
  }
  if ($(this).val() === "15") {
    console.log("15 is selected");
    map.setZoom(15);
  }
  if ($(this).val() === "20") {
    console.log("20 is selected");
    map.setZoom(20);
  }
});
