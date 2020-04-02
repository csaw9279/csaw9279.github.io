
let startLayer = L.titleLayer.provider("OpenTopoMap");
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
}).addTo(map)