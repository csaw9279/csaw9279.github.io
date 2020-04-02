// alert("Hallo Welt")


let map = document.querySelector("#map");

// from leaflet coordinates for pancake rocks?!

var mymap = L.map(map).setView([-42.118611, 171.326944], 13);

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>tributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https:/ntopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(mymap);

// marks location on set location. also able to create a line or polygon object

var marker = L.marker([-42.118611 , 171.326944]).addTo(mymap);

marker.bindPopup("<b>Pancake Rocks</b><br>a Location of phenomena").openPopup();
