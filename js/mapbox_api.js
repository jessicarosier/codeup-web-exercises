mapboxgl.accessToken = MAPBOX_API_TOKEN;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [-117.8713292, 33.8819333], // starting position [lng, lat]
  zoom: 13, // starting zoom
});

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.032, 38.913],
      },
      properties: {
        title: "Mapbox",
        description: "Washington, D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776],
      },
      properties: {
        title: "Mapbox",
        description: "San Francisco, California",
      },
    },
  ],
};

// add markers to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement("div");
  el.className = "marker";

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
}

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

//TODO: Display at least 3 restaurants on the map.Create and array of objects with information about each, use a forEach loop

const favoriteCoffee = [
  {
    address: "109 W Santa Fe Ave, Placentia, CA 92870",
    popupHTML:
      "<p>Golden State Coffee Roasters</p> <p>Newly added and in my home town!</p>",
    color: "green",
    img: "img/coffee.jpg",
  },
  {
    address: "520 N State College Blvd, Fullerton, CA 92831",
    popupHTML: "<p>Philz Coffee</p>",
    color: "rebeccapurple",
    img: "",
  },
  {
    address: "2736 Nutwood Ave D Ste D, Fullerton, CA 92831",
    popupHTML: "<p>Able Coffee Roasters</p>",
    color: "blue",
    img: "",
  },
];

//creates a marker and popup for each object in the favoriteCoffee array
favoriteCoffee.forEach((object) => {
  placeMarkerAndPopup(object, MAPBOX_API_TOKEN, map);
});

//TODO: Add a select input that allows the user to change the zoom level to 5, 15, or 20.
//targets the select element with the ID of #zoom
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
//targets the input element with the ID of #address-search-bar
const searchButton = document.getElementById("address-search-button");
//targets the form element with the ID of #address-search-form
let searchForm = document.getElementById("address-search-form");
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
    let newMarker = "";
    newMarker = new mapboxgl.Marker().setLngLat(results).addTo(map);
    map.setZoom(15);
    map.setCenter(results);
  });
});

//TODO: Add a button that will hide all markers.
//targets the markers and popups by class name
//toggles (adds and removes) the "invisible" class when button is clicked
$("#hide-markers").on("click", function () {
  $(".mapboxgl-marker").toggleClass("invisible");
  $(".mapboxgl-popup").toggleClass("invisible");
});

//TODO: Animate a marker to bounce up and down
//alter the animation to stop after 2 seconds
//make the amount of bounce animation scale according to zoom level

//Event listener, runs animation function when a marker is clicked
// $(".mapboxgl-marker").on("click", function () {
//   console.log($(this));
// });
//
$(".mapboxgl-marker").on("click", function () {
  console.log($(this).getAttributeNames());
  map.setCenter([$(this)._lngLat.lng, $(this)._lngLat.lat]);
});
