function heatPoint(coordinates,ntrip){

    var latLng = L.latLng(coordinates[1], coordinates[0]);
    

    return [latLng.lat,latLng.lng,ntrip]
}

function layer_classify(heatMapTimes,time,point){
    if (time === "0:00-6:00") {
    heatMapTimes.zero.push(point);
    } else if (time === "6:00-10:00") {
        heatMapTimes.six.push(point);
    } else if (time === "10:00-15:00") {
        heatMapTimes.ten.push(point);
    } else if (time === "15:00-20:00") {
        heatMapTimes.fifteen.push(point);
    } else if (time === "20:00-24:00") {
        heatMapTimes.twenty.push(point);
    }
}

var map = L.map('heatmap', {
    center: [49.250880, -123.052112], // EDIT latitude, longitude to re-center map
    zoom: 12,  // EDIT from 1 to 18 -- decrease to zoom out, increase to zoom in
    scrollWheelZoom: false,
    tap: false
});

time_0 = L.layerGroup()
time_6 = L.layerGroup()
time_10 = L.layerGroup()
time_15 = L.layerGroup()
time_20 = L.layerGroup()

const timeWindow ={
    "0:00 - 6:00" :  time_0,
    "6:00 - 10:00" :  time_6,
    "10:00 - 15:00" :  time_10,
    "15:00 - 20:00" :  time_15,
    "20:00 - 24:00": time_20
}

var controlLayers = L.control.layers( timeWindow, null,{
position: "topright",
collapsed: false
}).addTo(map);

var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map);


$.getJSON("data/output.geojson",function(data){
    var heatMapTimes = {
        "zero" : [],
        "six" : [],
        "ten" : [],
        "fifteen": [],
        "twenty": []
    }
    data.features.forEach(feature => {
        var ntrip = feature.properties.ntrips;
        var time = feature.properties.window;
        var coordinates = feature.geometry.coordinates;
        var point = heatPoint(coordinates,ntrip)

        layer_classify(heatMapTimes,time,point)

    });
    L.heatLayer(heatMapTimes.zero, {radius: 13}).addTo(time_0)
    L.heatLayer(heatMapTimes.six, {radius: 13}).addTo(time_6)
    L.heatLayer(heatMapTimes.ten, {radius: 13}).addTo(time_10)
    L.heatLayer(heatMapTimes.fifteen, {radius: 13}).addTo(time_15)
    L.heatLayer(heatMapTimes.twenty, {radius: 13}).addTo(time_20)
});