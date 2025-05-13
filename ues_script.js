const uesMap = L.map('map');

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(uesMap);

function addGeoJSONLayer(geojsonData, map) {
    L.geoJSON(geojsonData, {
        onEachFeature: function (feature, layer) {
            if (feature.properties) {
                let popupContent = `<h3>${feature.properties.name}</h3>`;
                popupContent += `<p>Address: ${feature.properties.des_addres}</p > `;
                layer.bindPopup(popupContent);
                // You can add a click event listener here if needed
                // layer.on('click', function (e) {
                //     this.openPopup();
                // });
            }
        },
        style: function (feature) {
            if (feature.geometry && feature.geometry.type === 'MultiPolygon') {
                return {
                    color: 'blue',
                    fillColor: 'yellow',
                    weight: 2,
                    fillOpacity: 0.5
                };
            }
            return {};
        }
    }).addTo(map);
}

// Assuming 'ues70nyc' is defined in your ues70Park2.js file
if (typeof ues70nyc !== 'undefined') {
    addGeoJSONLayer(ues70nyc, uesMap);
    uesMap.setView([40.7751175, -73.9607865], 17);
    // Optionally, you can open the popup for the first feature
    if (ues70nyc.features.length > 0) {
        const firstFeature = ues70nyc.features[0];
        const firstLayer = L.geoJSON(firstFeature).addTo(uesMap);
        firstLayer.bindPopup(firstFeature.properties.name).openPopup();
    }

} else {
    console.error("ues70nyc data is not defined. Make sure ues70Park2.js is loaded correctly.");
}

// Example marker
const e77Park = L.marker([40.7751175, -73.9607865])
    .bindPopup('East 78th Street and Park Ave');
e77Park.addTo(uesMap);
// You don't typically need to immediately open the popup unless it's the desired initial state
// e77Park.openPopup();

// Example coordinates


var latlngs = [
    [40.76446, -73.96766], // 119-121 East 62nd Street/  Bulgarian Consulate-General
    [40.76766, -73.96938], // 12 East 65th Street / Pakistani Consulate-General
    [40.76955, -73.96808], // 5 East 68th Street / Indonesian Consulate-General
    [40.76957, -73.96605], // 27 East 69th Street / Consulate of Cape Verde in New York (Lucretia Lord Strauss House)
    [40.76951, -73.96605], // 31 East 69th Street / Indian Consulate
    [40.76885, -73.96446], // 111 East 69th Street / Permanent Mission of Mali to the United Nations
    [40.77126, -73.96724], // 107 East 70th Street / "The Frick Collection/James B Duke House"
    [40.77266, -73.96541], // 22 EAST 73rd Street / Permanent Mission of Cameroon to the United Nations
    [40.77158, -73.96495], // 39 East 72nd Street / Austrian Consulate-General
    [40.7754, -73.96404], // 6 East 77th Street /Mongolian Consulate-General
    [40.77581, -73.96422], // 10 East 77th Street / India UN Mision; and Myanmar
    [40.77471, -73.96435], // 9 East 76th Street / Lebanse Consulate-General
    [40.77363, -73.96618] // 927 Fifth Avenue / Cultural Services of the French Embassy (Whitney Payne Mansion)
];

// Create the snaking polyline
var polyline = L.polyline(latlngs, {
    color: 'red',
    weight: 3,
    snakingSpeed: 200
}).addTo(uesMap);

// Trigger the snaking animation (optional, if not already triggered)
polyline.snakeIn();
