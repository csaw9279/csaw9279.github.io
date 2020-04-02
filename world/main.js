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
    "OpenStreetMap.BZH": L.tileLayer.provider("OpenStreetMap.BZH"),
    "Stamen.Terrain" : L.tileLayer.provider("Stamen.Terrain"),
    "Esri.WorldStreetMap" : L.tileLayer.provider("Esri.WorldStreetMap"),


}).addTo(map);


L.Marker([0,0]), addTo(map);

console.log(CONFIRMED);
for (let i = 1; i < CONFIRMED.length; i++) {
    let row = CONFIRMED[i];
 //   console.log(row[2],row[3]);
    let val = row[row.length-1];
    let mrk = L.marker([row[2], row[3]]).addTo(map);
    mrk.bindPopup(`${row[0]} ${row[1]}`);
    
}






// https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv


/* L.control.layers({
    "OpenTopoMap": startLayer,
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "OpenStreetMap.BZH": L.tileLayer.provider("OpenStreetMap.BZH"),
    "Stamen.Terrain" : L.tileLayer.provider("Stamen.Terrain"),
    "Esri.WorldStreetMap" : L.tileLayer.provider("Esri.WorldStreetMap"),


    */