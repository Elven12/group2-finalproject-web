mapboxgl.accessToken = 'pk.eyJ1IjoiazYyMjEiLCJhIjoiY2xzc2VyczZiMTJnMTJsbnlqYmY0eDBidCJ9.qYmhavVJJbDDzeyoAuTXeQ';

var map = new mapboxgl.Map({
        container: 'transportation_map', 
        style: 'mapbox://styles/k6221/cltxr4dy101ix01r5elg32b1a', 
        center: [-123.1207, 49.2827], // set Vancouver as the centre
        zoom: 9.3
    });

// clear Map highlight function (makes it default)
function clearMap() {
map.setPaintProperty('stops', 'circle-stroke-color', 'white');
map.setPaintProperty('stops', 'circle-radius', 6);
map.setPaintProperty('routes', 'line-color', '#007ec2');
map.setPaintProperty('routes', 'line-width', 4);
} // close clearMap
    

// don't forget changing source link 
// load line GeoJSON
fetch("https://raw.githubusercontent.com/K6221/472_project_test/main/data/route.geojson").then(res => res.json()).then(routedata => {
  map.addSource('routes', {
    type: 'geojson',
    data: routedata
  });
  // add to the map 
  map.addLayer({
    'id': 'routes',
    'type': 'line',
    'source': 'routes',
    'paint': {
      'line-color': '#007ec2', 
      'line-opacity': 1,
      'line-width': 4,
    } // close paint
    }); // close map.addLayer
}); // close fetch line

//load stop GeoJSON
fetch("https://raw.githubusercontent.com/K6221/472_project_test/main/data/stops_routes.geojson").then(res => res.json()).then(stopdata => {
  map.addSource('stops', {
    type: 'geojson',
    data: stopdata
  }); // close map.addSource
  // add to the map
  map.addLayer({
    'id': 'stops',
    'type': 'circle',
    'source': 'stops',
    'paint': {
      'circle-radius': 6,
      'circle-color': 'white',
      'circle-opacity': 0,
      'circle-stroke-color': 'white',
      'circle-stroke-width': 1
    } //close paint
    }); // close map.addLayer
}); // close fetch


// highlight function
function highlightStationsOnLine(routeShortName) {
  map.setPaintProperty('stops', 'circle-stroke-color', ['case',
                                                        ['==', ['get', 'route_short_name'], routeShortName], // Yellow for clicked station
                                                        'red', 
                                                        'white']); // close setPaintProperty 
  map.setPaintProperty('stops', 'circle-radius', ['case',
                                                  ['==', ['get', 'route_short_name'], routeShortName],
                                                  8,
                                                  6
                                                 ]); // c.ose setPaintProperty radius
}// close highlightStationsOnLine function

function highlightAssociatedRoute(routeShortName) {
  map.setPaintProperty('routes', 'line-color', ['case',
                                                ['==', ['get', 'routes_route_short_name'], routeShortName],
                                                'yellow',
                                                '#007ec2']); //close map.setPaintProperty
  
  map.setPaintProperty('routes', 'line-width', ['case',
                                                ['==', ['get', 'routes_route_short_name'], routeShortName],
                                                8, // if it is an associated line, line width = 8 
                                                4 // otherwise it is 4
                                                ]); // close map.setPaintProperty width
} // close highlightAssociatedRoute

function createRouteClickListener(routeShortName) {
  return function() {
    // console.log(routeShortName);
    routeClick(routeShortName);
  };
} // close create route click listener function
  

map.on('click', 'stops', (e) => {
  // remove previous highlights (make it default)
  clearMap(); 
  const features = map.queryRenderedFeatures(e.point, { layers: ['stops'] });
  
  // add popup
  const popupContent = generatePopupContent(features[0].properties);
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setDOMContent(popupContent)
    .addTo(map)
}); // close map.on click function

// Function to handle route click
function routeClick(routeShortName) {
//   console.log('Route Short Name:', routeShortName); // check whether the function is called or not
  clearMap(); /// clear previous highlights
  highlightAssociatedRoute(routeShortName); // highlight associated lines
} // close routeClick

// pop up function
function generatePopupContent(properties) {
  console.log('Route Short Name:', properties.route_short_name);
  var wrapper= document.createElement('div');
  let popupHTML = `<p><strong>Stop Name: </strong> ${properties.stop_name}</p>`;
  popupHTML += `<p><strong>Stop Code:</strong> ${properties.stop_code}</p>`;
  wrapper.innerHTML= popupHTML;
  
  // Remove square brackets and split the routeShortName by comma      REMOVE " " 
  let routes = properties.route_short_name.replace(/^[\[\]"]/g, '').replace(/"/g, '').replace(/["\]]/g, '').split(',');
  
  // Create clickable links (route short name) for each route
  routes.forEach(route => {
    route = route.trim(); // Remove spaces if any
    let routeShortName = route;
    let routeLink = document.createElement('a');
    routeLink.href = '#';
    routeLink.textContent = route;
    routeLink.addEventListener('click', function(event) {
    //   console.log('listener run. routeShortName is: '+routeShortName)
      event.preventDefault();
    //   console.log(routeShortName);
      routeClick(routeShortName);
    //   console.log('listener ending')
    });
    // console.log(routeLink);

    // console.log('Route Short Name After:', routeShortName);
    
    let routeParagraph = document.createElement('p');
    routeParagraph.appendChild(routeLink);
    wrapper.appendChild(routeParagraph)// += routeParagraph.outerHTML;
  });
  
  return wrapper;
} // close generate popup content


//change the cursor to a pointer when the mouse is over the station points
map.on('mouseenter', 'stops', () => {
  map.getCanvas().style.cursor = 'pointer';
}); // close mouseenter

// change the cursor back to a pointer when it leaves the station points
map.on('mouseleave', 'stops', () => {
  map.getCanvas().style.cursor = '';
});