// alert("Hallo Welt")


let map = document.querySelector("#map");
let lat = map.dataset.lat;
let lng = map.dataset.lng;


let mymap = L.map(map).setView([lat, lng], 13);

// from leaflet coordinates for pancake rocks?!


let title = map.dataset.title;
console.log(title)

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>tributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https:/ntopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(mymap);

// marks location on set location. also able to create a line or polygon object

let marker = L.marker([lat, lng]).addTo(mymap);

marker.bindPopup("<b>Pancake Rocks</b><br>Come get yo self some pancakes").openPopup();

/*var popup = L.popup()
    .setLatLng([lat, lng])
    .setContent("Displayed place of interest here?")
    .openOn(mymap);
*/

var circle = L.circle([-42.118611, 171.326944], {
    color: 'red',
    fillColor: '#f04',
    fillOpacity: 0.5,
    radius: 300
}).addTo(mymap);

// 42.118611, 171.326944

circle.bindPopup("<b>Pancake Rocks</b><br>Deposition of calcareous sediments").openPopup(); //