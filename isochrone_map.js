var map = L.map('isochrone_map', {
    center: [49.25, -123.1],
    zoom: 11,
}) 

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
subdomains: 'abcd',
maxZoom: 20
}).addTo(map);

L.marker([49.26639036914273, -123.24971452437069]).addTo(map).bindPopup('Origin Point: UBC Student Nest');

async function load_json(url) {
    const response = await fetch(url)
    const commutes = await response.json();
    return commutes;
}

async function main() {
    //load the geojson files from github
    const morning15 = await load_json('https://raw.githubusercontent.com/UBC-GEOS472-Spring2024/group2-finalproject-web/main/morning_commute_geojson/iso_apr4_arriveUBC830am_15mins_transit.json');
    const morning30 = await load_json('https://raw.githubusercontent.com/UBC-GEOS472-Spring2024/group2-finalproject-web/main/morning_commute_geojson/iso_apr4_arriveUBC830am_30mins_transit.json');
    const morning45 = await load_json('https://raw.githubusercontent.com/UBC-GEOS472-Spring2024/group2-finalproject-web/main/morning_commute_geojson/iso_apr4_arriveUBC830am_45mins_transit.json');
    const morning60 = await load_json('https://raw.githubusercontent.com/UBC-GEOS472-Spring2024/group2-finalproject-web/main/morning_commute_geojson/iso_apr4_arriveUBC830am_60mins_transit.json');
    const morning90 = await load_json('https://raw.githubusercontent.com/UBC-GEOS472-Spring2024/group2-finalproject-web/main/morning_commute_geojson/iso_apr4_arriveUBC830am_90mins_transit.json');
    const evening15 = await load_json('https://raw.githubusercontent.com/UBC-GEOS472-Spring2024/group2-finalproject-web/main/evening_commutes_geojson/iso_apr4_leaveUBC5pm_15mins_transit.json');
    const evening30 = await load_json('https://raw.githubusercontent.com/UBC-GEOS472-Spring2024/group2-finalproject-web/main/evening_commutes_geojson/iso_apr4_leaveUBC5pm_30mins_transit.json');
    const evening45 = await load_json('https://raw.githubusercontent.com/UBC-GEOS472-Spring2024/group2-finalproject-web/main/evening_commutes_geojson/iso_apr4_leaveUBC5pm_45mins_transit.json');
    const evening60 = await load_json('https://raw.githubusercontent.com/UBC-GEOS472-Spring2024/group2-finalproject-web/main/evening_commutes_geojson/iso_apr4_leaveUBC5pm_60mins_transit.json');
    const evening90 = await load_json('https://raw.githubusercontent.com/UBC-GEOS472-Spring2024/group2-finalproject-web/main/evening_commutes_geojson/iso_apr4_leaveUBC5pm_90mins_transit.json');

    //define the geoJson files within leaflet
    let morning15_geoJson = L.geoJson(morning15, {
        style: (feature) => {
            return {
                stroke: true,
                color: "#032d5a",
                weight: 2,
                opacity: 0.9,
                fill: true,
                fillColor: "#032d5a",
                fillOpacity: 0.15,
                smoothFactor: 0.5,
                interactive: false,
            };
        },
    });
    let morning30_geoJson = L.geoJson(morning30, {
        style: (feature) => {
            return {
                stroke: true,
                color: "#097883",
                weight: 2,
                opacity: 0.9,
                fill: true,
                fillColor: "#097883",
                fillOpacity: 0.15,
                smoothFactor: 0.5,
                interactive: false,
            };
        },
    });
    let morning45_geoJson = L.geoJson(morning45, {
        style: (feature) => {
            return {
                stroke: true,
                color: "#11a976",
                weight: 2,
                opacity: 0.9,
                fill: true,
                fillColor: "#11a976",
                fillOpacity: 0.15,
                smoothFactor: 0.5,
                interactive: false,
            };
        },
    });
    let morning60_geoJson = L.geoJson(morning60, {
        style: (feature) => {
            return {
                stroke: true,
                color: "#6cd076",
                weight: 2,
                opacity: 0.9,
                fill: true,
                fillColor: "#6cd076",
                fillOpacity: 0.15,
                smoothFactor: 0.5,
                interactive: false,
            };
        },
    });
    let morning90_geoJson = L.geoJson(morning90, {
        style: (feature) => {
            return {
                stroke: true,
                color: "#d1fcac",
                weight: 2,
                opacity: 0.9,
                fill: true,
                fillColor: "#d1fcac",
                fillOpacity: 0.15,
                smoothFactor: 0.5,
                interactive: false,
            };
        },
    });
    let evening15_geoJson = L.geoJson(evening15, {
        style: (feature) => {
            return {
                stroke: true,
                color: "#801f05",
                weight: 2,
                opacity: 0.9,
                fill: true,
                fillColor: "#801f05",
                fillOpacity: 0.15,
                smoothFactor: 0.5,
                interactive: false,
            };
        },
    });
    let evening30_geoJson = L.geoJson(evening30, {
        style: (feature) => {
            return {
                stroke: true,
                color: "#bc0d33",
                weight: 2,
                opacity: 0.9,
                fill: true,
                fillColor: "#bc0d33",
                fillOpacity: 0.15,
                smoothFactor: 0.5,
                interactive: false,
            };
        },
    });
    let evening45_geoJson = L.geoJson(evening45, {
        style: (feature) => {
            return {
                stroke: true,
                color: "#f319a5",
                weight: 2,
                opacity: 0.9,
                fill: true,
                fillColor: "#f319a5",
                fillOpacity: 0.15,
                smoothFactor: 0.5,
                interactive: false,
            };
        },
    });
    let evening60_geoJson = L.geoJson(evening60, {
        style: (feature) => {
            return {
                stroke: true,
                color: "#e26ffe",
                weight: 2,
                opacity: 0.9,
                fill: true,
                fillColor: "#e26ffe",
                fillOpacity: 0.15,
                smoothFactor: 0.5,
                interactive: false,
            };
        },
    });
    let evening90_geoJson = L.geoJson(evening90, {
        style: (feature) => {
            return {
                stroke: true,
                color: "#d9cdff",
                weight: 2,
                opacity: 0.9,
                fill: true,
                fillColor: "#d9cdff",
                fillOpacity: 0.15,
                smoothFactor: 0.5,
                interactive: false,
            };
        },
    });

    //set the leaflet geoJson objects as layer groups
    var morning15_group = L.layerGroup([morning15_geoJson]);
    var morning30_group = L.layerGroup([morning30_geoJson]);
    var morning45_group = L.layerGroup([morning45_geoJson]);
    var morning60_group = L.layerGroup([morning60_geoJson]);
    var morning90_group = L.layerGroup([morning90_geoJson]);
    var evening15_group = L.layerGroup([evening15_geoJson]);
    var evening30_group = L.layerGroup([evening30_geoJson]);
    var evening45_group = L.layerGroup([evening45_geoJson]);
    var evening60_group = L.layerGroup([evening60_geoJson]);
    var evening90_group = L.layerGroup([evening90_geoJson]);

    
    var layerControl = L.control.layers(null, {
        "<span style='color: #032d5a'>Morning 15 minute commute</span>": morning15_group,
        "<span style='color: #097883'>Morning 30 minute commute</span>": morning30_group,
        "<span style='color: #11a976'>Morning 45 minute commute</span>": morning45_group,
        "<span style='color: #6cd076'>Morning 60 minute commute</span>": morning60_group,
        "<span style='color: #d1fcac'>Morning 90 minute commute</span>": morning90_group,
        "<span style='color: #801f05'>Evening 15 minute commute</span>": evening15_group,
        "<span style='color: #bc0d33'>Evening 30 minute commute</span>": evening30_group,
        "<span style='color: #f319a5'>Evening 45 minute commute</span>": evening45_group,
        "<span style='color: #e26ffe'>Evening 60 minute commute</span>": evening60_group,
        "<span style='color: #d9cdff'>Evening 90 minute commute</span>": evening90_group

    }).addTo(map);

}


main();
