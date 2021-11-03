import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
export const appController = {
    renderLocations,
    onGetLocs,
}


window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onGetSelectedPosition = onGetSelectedPosition
window.onDeleteLoc = onDeleteLoc
window.onSearchLoc = onSearchLoc
window.onLink = onLink

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
            mapService.panToPos(pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })

}

function onPanTo(id) {
    mapService.panTo(id);
}

function onGetSelectedPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    console.log('Getting  Selected Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function renderLocations(locs) {
    // console.log('hello renderLocations', locs)
    var strHtmls = `
                <tr>
                    <th colspan="9">My locations</th>
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
            <td><button class="table-btn" onclick="onPanTo(${loc.id})">Go</button></td>
            <td><button class="table-btn" onclick="onDeleteLoc('${loc.id}')">Delete</button></td>
        </tr>
        `
        })
        // console.log(strHtmls)
    document.querySelector('.locations-table').innerHTML = strHtmls
}

function onDeleteLoc(id) {
    // console.log('hello onDeleteLoc')
    locService.deleteLoc(id)
    onGetLocs()
}

function onSearchLoc() {
    // console.log('hello onSearchLoc')
    var locName = document.querySelector('.search-input').value
    console.log(locName)
    const prm = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locName}&key=AIzaSyBgnV1YrbPAs1sTJ3vz_63TQskGN_uxsYk`)
        .then(res => {
            console.log('Axios Res:', res);
            var searchObj = {
                latitude: res.data.results[0].geometry.location.lat,
                longitude: res.data.results[0].geometry.location.lng
            }
            console.log(searchObj)
            mapService.panToPos(searchObj)
            locService.addNewLoc(res.data.results[0].formatted_address, res.data.results[0].geometry.location)
        })
}

function onLink() {
    console.log('hello onLink')
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    // console.log(params)
    var center = mapService.getMapCenter()
        // console.log(center)
    var strUrl = `https://kobi2132.github.io/travel-tip/index.html?lat=${center.lat}&lng=${center.lng}`
    console.log(strUrl)
    navigator.clipboard.writeText(strUrl)

}