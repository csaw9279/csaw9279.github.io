let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    //center: [47.3, 11.5],
    //zoom: 8,
    layers: [
        startLayer
    ]
});

// let awsLayer = L.featureGroup().addTo(map);

let overlay = {
    stations: L.featureGroup(),
    temperature: L.featureGroup()
}

L.control.layers({
    "BasemapAT.grau": startLayer,
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.overlay": L.tileLayer.provider("BasemapAT.overlay"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Wetterstationen Tirol": overlay.stations,
    "Temperatur (C°)": overlay.temeparture,
    "Windgeschwindigkeit": overlay.wind
}).addTo(map);

let awsUrl = "https://aws.openweb.cc/stations";



let aws = L.geoJson.ajax(overlay.stations, {
    filter: function (feature) {
        //console.log("Feature in filter: ", feature);
        return feature.geometry.coordinates[2] > 3000;
    },
    pointToLayer: function (point, latlng) {
        // console.log("point: ", point);
        let marker = L.marker(latlng).bindPopup(`
        <h3>${point.properties.name} ${point.geometry.coordinates[2]} m</h3>
        <ul>
        <li> Position: Lat: ${point.geometry.coordinates[1]}/Lng: ${point.geometry.coordinates[0]}</li>
        <li> Datum: ${point.properties.date}</li>
        <li> Lufttemperatur: ${point.properties.LT} °C</li>
        <li> Windgeschwindigkeit: ${point.properties.WG} m/s</li>
        <li> Relative Luftfeuchte: ${point.properties.RH} %</li>
        <li> Schneehöhe: ${point.properties.HS} cm</li>
        </ul>
        
        <p><a target="links" href="https://lawine.tirol.gv.at/data/grafiken/1100/standard/tag/${point.properties.plot}.png">Link</a></p>
    
        `);
        return marker;
    }
}).addTo(overlay.stations);

// geoJSON Objekt
let.drawTemperature = function (jsonData) {
    console.log("aus der Funktion", jsonData);
    L.geoJson(jsonData, {
            filter: function (feature) {
                return feature.properties.LT

            }
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    title: `${feautre.properties.name} (${feature.geometry.coordinates[2]}m)`
                    icon: L.divIcon({
                        html: `<div class="label-temperature">${feature.properties.LT.toFixed(1)}</div>`
                        className: "ignore-me" // "dirty hack"
                    })
                })

            }
        }

    ).addTo(overlay.temperature);

};

// 1. neues overlay definieren - zu L.control.layers hinzufügen und default anzeigen
// 2. die Funtion drawWind als 1:1 Kopie von drawTemperature mit anpassungen
// 3. einen neuen Stil .label-wind im CSS von main.css
// 4. die funktion drawWind in data:loaded aufrufen

let drawWind = function (jsonData) {
    console.log(jsonData);
    L.geoJson(jsonData, {
        filter: function (feature) {
            return feature.properties.WG
        },
        pointToLayer: function (feature, latlng) {

            let windKMh = feature.properties.WG*3.8;


            return L.marker(latlng, {
                title: `${feature.properties.name} (${feature.geometry.coordinates[2]}m)`,
                icon: L.divIcon({
                    html: `<div class="label-wind">${windKMh.toFixed(1)}</div>`,
                    className: "ignore-me" 
                })

            });
        }
    }).addTo(overlay.wind); 

};


aws.on("date:loaded", function () {
    // console.log(aws.toGeoJSON());
    drawTemperature(aws.toGeoJSON());

    // boundry auf station setzen

    map.fitBounds(overlay.stations.getBounds());

    overlay.temperature.addTo(map);
});