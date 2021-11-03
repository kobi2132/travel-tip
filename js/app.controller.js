import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onGetSelectedPosition = onGetSelectedPosition;

function onInit() {
    console.log('hello onInit')
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'));
        
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
            renderLocations(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onGetSelectedPosition(){
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    console.log('Getting  Selected Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })}

function renderLocations(locs) {
    console.log('hello renderLocations', locs)
    var strHtmls = `
                <tr>
                    <th colspan="7">My locations</th>
                </tr>
                <tr>
                    <td>id</td>
                    <td>name</td>
                    <td>lat</td>
                    <td>lng</td>
                    <td>weather</td>
                    <td>createdAt</td>
                    <td>updatedAt</td>
                </tr>
                `
    strHtmls += locs.map(function(loc) {
        return `
        <tr>
            <td>${loc.id}</td>
            <td>${loc.name}</td>
            <td>${loc.lat}</td>
            <td>${loc.lng}</td>
            <td>${loc.weather}</td>
            <td>${loc.createdAt}</td>
            <td>${loc.updatedAt}</td>
        </tr>
        `
    })
    console.log(strHtmls)
    document.querySelector('.locations-table').innerHTML = strHtmls
}
