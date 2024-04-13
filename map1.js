document.addEventListener('DOMContentLoaded', function () {
    // Set the access token for Mapbox GL JS.
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXRoYW53ZXN0YmVycnkiLCJhIjoiY2x0OWR4Z3k4MGg2dTJpcDlwc2o0ZXFvayJ9.Muok1VdFLcaVekq6lWlzrA';
    
    // Initialize a new Mapbox map.
    const map = new mapboxgl.Map({
        container: 'map1',
        style: 'mapbox://styles/jonathanwestberry/clu7k2gvq02eo01pt8c89fksc',
        center: [-123.14, 49.26],
        zoom: 11
    });

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('load', function() {
        // Add the stops source
        map.addSource('stops', {
            type: 'geojson',
            data: '/data/stops.geojson'
        });

        // Add the stops layer
        map.addLayer({
            id: 'stops',
            type: 'circle',
            source: 'stops',
            paint: {
                'circle-color': '#007cbf',
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10, 1,
                    22, 15
                ]
            }
        });

        // Add the shapes_trips_routes source
        map.addSource('shapes-trips-routes', {
            type: 'geojson',
            data: '/data/shapes_trips_routes.geojson'
        });

        // Add the shapes_trips_routes layer
        map.addLayer({
            id: 'routes',
            type: 'line',
            source: 'shapes-trips-routes',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#ff0000', // Red lines
                'line-width': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10, 1, // Zoom level 10
                    22, 10 //Zoom level 22
                ]
            }
        });

        map.on('mouseenter', 'stops', function(e) {
            // Change the cursor style.
            map.getCanvas().style.cursor = 'pointer';

        });

        map.on('mouseleave', 'stops', function() {
            map.getCanvas().style.cursor = '';
            popup.remove();
        })

        map.on('mouseenter', 'routes', function(e) {
            map.getCanvas().style.cursor = 'pointer';

        });

        map.on('mouseleave', 'routes', function() {
            map.getCanvas().style.cursor = '';
            popup.remove();
        })

    });
});
