const COLORS = {
    temperature: [
        [9999, "rgb(250,55,150)"],
        [30, "rgb(255,5,5)"],
        [25, "rgb(255,85,54)"],
        [20, "rgb(255,154,53)"],
        [15, "rgb(255,190,130)"],
        [10, "rgb(255,255,103)"],
        [5, "rgb(176,255,188)"],
        [0, "rgb(140,255,255)"],
        [-5, "rgb(3,205,255)"],
        [-10, "rgb(4,129,255)"],
        [-15, "rgb(3,91,190)"],
        [-20, "rgb(120,75,255)"],
        [-25, "rgb(159,128,255)"]
    ],


    wind: [
        [9999, "rgb(255,50,50)"],
        [80, "rgb(150,100,255)"],
        [60, "rgb(100,150,255)"],
        [40, "rgb(50,200,255)"],
        [20, "rgb(150,255,150)"],
        [10, "rgb(200,255,100)"],
        [5, "rgb(255,255,100)"]
    ],

    // humidity

    humidity: [
        [9999, "rgb(0,165,255)"],
        [80, "rgb(0,205,255)"],
        [60, "rgb(140,255,255)"],
        [40, "rgb(255,255,195)"]
    ]

};




/* Nach dem Muster des Temperaturlayers sollt ihr mindestens einen 
der beiden neuen Layer Relative Feuchte (humidity) und/oder Gesamtschneehöhe 
(snow) implementieren. Die Farben und Schwellenwerte kommen wieder von
 https://lawine.report und sind in colors.js zu ergänzen. */