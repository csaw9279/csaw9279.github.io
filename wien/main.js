let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [48.208333, 16.373056],
    zoom: 12,
    layers: [
        startLayer
    ]
});

let sightGroup = L.markerClusterGroup().addTo(map);
let walkGroup = L.featureGroup().addTo(map);
let heritageGroup = L.featureGroup().addTo(map);

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
    "Stadtspaziergang (Punkte)": sightGroup,
    "Wanderungen": walkGroup,
    "Weltkulturerbe": heritageGroup

}).addTo(map);

// spazieren

let sightUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERPUNKTOGD &srsName=EPSG:4326&outputFormat=json";

let sights = L.geoJson.ajax(sightUrl, {
    pointToLayer: function (point, latlng) {
        let icon = L.icon({
            iconUrl: 'icons/sight.svg',
            iconSize: [32, 32]
        });
        let marker = L.marker(latlng, {
            icon: icon
        });
        // console.log("Point", point);
        marker.bindPopup(`<h3>${point.properties.NAME}</h3>
        <p><b>Adresse: </b> ${point.properties.ADRESSE}</p>
        <p><a target="links" href="${point.properties.WEITERE_INF}">Link</a></p>
        `);
        return marker;
    }
});

sights.on("data:loaded", function () {
    sightGroup.addLayer(sights);
    //console.log('data loaded!');
    map.fitBounds(sightGroup.getBounds());
});

// Wandern

let wandern = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WANDERWEGEOGD&srsName=EPSG:4326&outputFormat=json";

L.geoJson.ajax(wandern, {
    style: function (feature) {

        if (feature.properties.TYP == "1") {
            return {
                color: "blue",
                dashArray: "4.5",
                fillOpacity: 0.3
            };
        } else if (feature.properties.TYP == "2") {
            return {
                color: "blue",
                dashArray: "1.0",
                fillOpacity: 0.3
            };

        }

    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`${feature.properties.BEZ_TEXT}`)
    }
}).addTo(map);


// Weltkulturerbe

let heritage = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WELTKULTERBEOGD&srsName=EPSG:4326&outputFormat=json";


letHeritageSort = function (jsondata) {
    heritage_list = jsondata.features
    console.log("test", hertiage_list);

    heritage_list.sort(function compareTyp(obj1, obj2) {
        return obj2.properties.TYP - obj1.properties.TYP;
    });

    L.geoJson(heritage_list, {
        style: function (feature) {
            if (feature.properties.TYP == "1") {
                return {
                    color: #ff0000,
                    fillOpacity: 0.3
                };
            } else if (feature.properties.TYP == "2") {
                return {
                    color: #FFFF00,
                    fillOpacity: 0.3
                };
            }
        },


        // oneachfeature hier popupbinden

        onEachFeature: function (feature, layer) {
            layer.bindPopup(`
            <h3></h3>
            <p></p>
            `)
        }

    })

}


/*L.geoJson.ajax(heritage, {
    style: function () {
        return {
            color: "salmon",
            fillOpacity: 0.3
        };
    },
    onEachFeature: function (feature, layer) {
        //console.log("Feature: ", feature);
        layer.bindPopup(`<h3>${feature.properties.NAME}</h3>
        <p>${feature.properties.INFO}</p>
        `);
    }
}).addTo(heritageGroup);
*/


/* 
beim Layer "Stadtspaziergang" für jede Sehenswürdigkeit ein Popup mit Namen, Adresse, Beschreibung sowie einem weiterführenden Link
beim Layer "Weltkulturerbe" ein Popup mit Namen und Zusatzinfo sowie verschiedene (transparente) Flächenfarben für Kernzone (rot) und Pufferzone (gelb)
beim Layer "Stadtwanderwege und RundumadumWanderweg Wien" die Bezeichnung des Weges als Popup und die Linien nach Typ: Stadtwanderwege schwarz strichliert, Rundumadum Wege schwarz punktiert - siehe dazu https://leafletjs.com/reference-1.6.0.html#path-dasharray
*/