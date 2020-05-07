let startLayer = L.tileLayer.provider("BasemapAT.terrain");

let map = L.map("map", {
    center: [47.25, 11.5],
    zoom: 9,
    layers: [
        startLayer
    ]
});

let overlay = {
    adlerblicke: L.featureGroup(),
    etappen: L.featureGroup()
};

L.control.layers({
    "BasemapAT.grau": L.tileLayer.provider("BasemapAT.grau"),
    "BasemapAT": L.tileLayer.provider("BasemapAT"),
    "BasemapAT.highdpi": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT.terrain": startLayer,
    "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT.overlay": L.tileLayer.provider("BasemapAT.overlay"),
    "BasemapAT.orthofoto+overlay": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay")
    ])
}, {
    "Adlerblicke": overlay.adlerblicke,
    "Adlerweg Etappen": overlay.etappen
}).addTo(map);

//console.log(ETAPPEN);
//console.log(ADLERBLICKE);

for (const blick of ADLERBLICKE) {
    //console.log(blick);
    let mrk = L.marker([blick.lat,blick.lng], {
        icon: L.icon({
            iconSize: [32, 37],  // centers icon if imgsize is known
            iconAnchor: [16, 37],   // centers img
            popupAnchor: [0, -37],  // moves img 37px
            iconUrl: "icons/panoramicview.png"
        })
    }).addTo(overlay.adlerblicke);
    //L.marker([blick.lat,blick.lng]).addTo(map);
    mrk.bindPopup(`Standort ${blick.standort} (${blick.seehoehe}m)`);
}
overlay.adlerblicke.addTo(map);

let drawEtappe = function(nr) {
    overlay.etappen.clearLayers();

    console.log(ETAPPEN[nr].track);
    let track = ETAPPEN[nr].track.replace("A", "");  // A nicht löschen --> track attribute
    console.log(track);

    let gpxpath = `gpx/AdlerwegEtappe${track}.gpx`

    let etappenPfad = `gpx/AdlerwegEtappe${track}.gpx`
    //console.log(etappenPfad)
    let gpx = new L.GPX(etappenPfad, {
        async: true,
        polyline_options: {
            color: 'black',
            weight: 3,
            lineCap: 'round',
            dashArray: [2, 5]
        },
        marker_options: {
            startIconUrl: `icon/number/number_${nr}.png`,
            endIconUrl: 'icon/finish.png',
            shadowUrl: null,
            iconSize: [32, 37],
            iconAnchor: [16, 37],
        }
    });
    
    gpx.on("loaded", function(evt){
        map.fitBounds(evt.target.getBounds());
    }).addTo(overlay.etappen);
    overlay.etappen.addTo(map);

    // Iterates data information --> adjusts text according to "Etappe"
    for (const key in ETAPPEN[nr]) {
        const element = ETAPPEN[nr][key];
        console.log(`et-${key}`);
        let elem = document.querySelector(`#et-${key}`);
        if (elem) {
            elem.innerHTML = ETAPPEN[nr][key];
        }
        download = document.querySelector("#track").href = etappenPfad;  // pfad angeben
}
};
drawEtappe(1);




let pulldown = document.querySelector("#pulldown");  // addresses pulldown menu in index.html
//console.log(pulldown);

for (let i = 1; i < ETAPPEN.length; i++) {
    const etappe = ETAPPEN[i];
    console.log(etappe);
    pulldown.innerHTML += `<option value ="${i}">${etappe.titel}</option>`; 
}

// activates pulldown menu for "etappen" - 
pulldown.onchange = function(evt) {
    let nr = evt.target.options[evt.target.options.selectedIndex].value;
    //console.log(nr);
    drawEtappe(nr);
}




