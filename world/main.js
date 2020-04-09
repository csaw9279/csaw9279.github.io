let startLayer = L.tileLayer.provider("OpenTopoMap");
let map = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [
        startLayer
    ]
});

let circleGroup = L.featureGroup().addTo(map);

L.control.layers({
    "OpenTopoMap": startLayer,
    "OpenStreetMap.Mapnik": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Stamen.Watercolor": L.tileLayer.provider("Stamen.Watercolor"),
    "Stamen.TerrainBackground": L.tileLayer.provider("Stamen.TerrainBackground"),
    "Esri.WorldImagery": L.tileLayer.provider("Esri.WorldImagery"),
}, {
    "Thematische Darstellung": circleGroup
}).addTo(map)


let drawCircles = function () {
    let data = CONFIRMED;
    let header = CONFIRMED[0];
    let index = header.length - 1; 
    let topic = "bestätigte Fälle";
    let options = document.querySelector("pulldown").options;
    let value = options[options.selectedIndex].value;
    let label = options[options.selectedIndex].text;
    console.log(value,label,options);

    //Datum und Thema anzeigen

    document.querySelector("#datum").innerHTML = `am ${header[index]} - ${topic}`;


        for (let i = 1; i < data.length; i++) {
            let row = data[i];
            // console.log(row[2], row[3]);
            let reg = `${row[0]} ${row[1]}`;
            let lat = row[2];
            let lng = row[3];
            let val = row[index];
            // let mrk = L.marker([lat,lng]).addTo(map);
            // mrk.bindPopup(`${reg}: ${val}`);

            let s = 0.5;
            let r = Math.sqrt(val * s / Math.PI);

            let circle = L.circleMarker([lat, lng], {
                radius: r
            }).addTo(circleGroup);
            circle.bindPopup(`${reg}: ${val}`);

        }

};

document.querySelector("#pulldown").onchange = function () {
    drawCircles();

};


drawCircles();
// drawCircles(RECOVERED);
// drawCircles(DEATHS);





//drawCircles(RECOVERED);
//drawCircles(CONFIRMED);

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