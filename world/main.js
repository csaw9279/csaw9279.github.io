let startLayer = L.tileLayer.provider("OpenTopoMap");


let map = L.map("map", {
    center: [0,0],
    zoom: 2,
    layers: [
        startLayer
    ]
});

L.control.layers({
    "OpenTopoMap": startLayer,
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "OpenStreetMap.Hot": L.tileLayer.provider("OpenStreetMap.Hot"),
    "OpenStreetMap.BZH": L.tileLayer.provider("OpenStreetMap.BZH"),
    "Stamen.Terrain" : L.tileLayer.provider("Stamen.Terrain"),
    "Esri.WorldStreetMap" : L.tileLayer.provider("Esri.WorldStreetMap"),


}).addTo(map);


L.Marker([0,0]), addTo(map);

