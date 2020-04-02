

let map = L.map("map", {
    center: [0,0],
    zoom: 2,
    layers: [
        L.titleLayer.provider("OpenTopoMap")
    ]
});

L.control.layers({
    "OpenTopoMap" : L.titleLayer.provider("OpenTopoMap"),
    "OpenTopoMap.Mapnick" : L.titleLayer.provider("OpenTopoMap.Mapnick"),
}).addTo(map)