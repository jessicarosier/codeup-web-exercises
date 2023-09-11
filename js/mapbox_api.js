mapboxgl.accessToken = MAPBOX_API_TOKEN;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [-98.4916, 29.426], // starting position [lng, lat]
  zoom: 12, // starting zoom
});

//declares a location for a marker
let alamoMarker = new mapboxgl.Marker()
  .setLngLat([-98.4916, 29.426])
  .addTo(map);

//declares a popup
let alamoPopup = new mapboxgl.Popup().setHTML("<p>Remember The Alamo!</p>");

//ties a popup to an existing marker
alamoMarker.setPopup(alamoPopup);

//Six Flags marker and popup
let sixFlagsMarker = new mapboxgl.Marker()
  .setLngLat([-98.6089, 29.5994])
  .addTo(map);
let sixFlagsPopup = new mapboxgl.Popup().setHTML("<p>Six Flags!</p>");
sixFlagsMarker.setPopup(sixFlagsPopup);

//My house marker and popup
let rosierHouseMarker = new mapboxgl.Marker()
  .setLngLat([-98.3095466, 29.4763422])
  .addTo(map);
let rosierHousePopup = new mapboxgl.Popup().setHTML("<p>The Rosier House</p>");
rosierHouseMarker.setPopup(rosierHousePopup);
