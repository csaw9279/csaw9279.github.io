
let startLayer = L.tileLayer.provider("Esri.WorldTopoMap");

let map = L.map("map", {
    center: [0,0],
    zoom: 2,
    layers: [
        startLayer
    ]
});

let circleGroup = L.featureGroup().addTo(map);


L.control.layers({
    "OpenTopoMap" : L.tileLayer.provider("OpenTopoMap"),
    "OpenStreetMap.Mapnik" : L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Stamen.TonerLite" : L.tileLayer.provider("Stamen.TonerLite"),
    "Stamen.Watercolor" : L.tileLayer.provider("Stamen.Watercolor"),
    "Stamen.Terrain" : L.tileLayer.provider("Stamen.Terrain"),
    "Stamen.TerrainBackground" : L.tileLayer.provider("Stamen.TerrainBackground"),
    "Esri.WorldStreetMap": L.tileLayer.provider("Esri.WorldStreetMap"),
    "Esri.WorldTopoMap": startLayer,
    "Esri.WorldImagery": L.tileLayer.provider("Esri.WorldImagery"),
    "Esri.WorldPhysical": L.tileLayer.provider("Esri.WorldPhysical"),
    "Esri.WorldGrayCanvas": L.tileLayer.provider("Esri.WorldGrayCanvas"),
    "CartoDB.Positron": L.tileLayer.provider("CartoDB.Positron")
}).addTo(map);

//console.log(CONFIRMED);
for (let i = 1; i < CONFIRMED.length; i++) {
    let row = CONFIRMED[i];
    //console.log(row[2],row[3]);
    let reg = `${row[0]} ${row[1]}`;
    let lat = row[2];
    let lng = row[3];
    let val = row[row.length-1];
    let mrk = L.marker([row[2],row[3]]).addTo(map);
    mrk.bindPopup(`${reg}: ${val}`);

    let r = Math.sqrt(val/Math.PI);
    let circle = L.circleMarker([row[2],row[3]).addTo(map);
    circle.bindPopup(`${reg}: ${val}`);
    
}

drawCircles(CONFIRMED);

// draw circle funktion ** wiederholen ** 


// repeat this until everything is clear to advance further in coursework

// Formel Fläche Kreis -> A = r²*pi
// r² = A/PI
//r = WURZEL(A/PI)




// https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv


/* L.control.layers({
    "OpenTopoMap": startLayer,
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "OpenStreetMap.BZH": L.tileLayer.provider("OpenStreetMap.BZH"),
    "Stamen.Terrain" : L.tileLayer.provider("Stamen.Terrain"),
    "Esri.WorldStreetMap" : L.tileLayer.provider("Esri.WorldStreetMap"),


    */