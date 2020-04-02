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
    "OpenTopoMap.Hot": L.tileLayer.provider("OpenStreetMap.Hot"),



}).addTo(map)





/* let startLayer = L.titleLayer.provider("OpenTopoMap");
let map = L.map("map", {
    center: [0,0],
    zoom: 2,
    layers: [
        L.titleLayer.provider("OpenTopoMap")
    ]
});

L.control.layers({
    "OpenTopoMap" : startLayer,
    "OpenTopoMap.Mapnick" : L.titleLayer.provider("OpenTopoMap.Mapnick"),
    "OpenTopoMap.Thunderforest.Pioneer: "
}).addTo(map)


*/