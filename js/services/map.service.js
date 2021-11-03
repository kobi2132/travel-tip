import { locService } from './loc.service.js'
import { appController } from '../app.controller.js'
export const mapService = {
    initMap,
    addMarker,
    panTo,
    panToPos,
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);

            gMap.addListener("click", (mapsMouseEvent) => {
                let spotName = prompt('What is the name of the location you want to save?');
                let clickedPos = mapsMouseEvent.latLng.toJSON();
                console.log(clickedPos);
                locService.addNewLoc(spotName, clickedPos)
                appController.onGetLocs()
                addMarker(clickedPos ,spotName)
            });

        })
}

function addMarker(loc, spotName) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: spotName
    });
    return marker;
}

function panTo(id) {
    let currLoc = locService.getCurrLoc(id)
    let lat = currLoc.lat
    let lng = currLoc.lng
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
    addMarker({lat:lat,lng:lng}, currLoc.name)
}

function panToPos(pos){
    let lat = pos.latitude
    let lng = pos.longitude
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
    addMarker({lat:lat,lng:lng})
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCkrsNzE8h557veZZf_VrFSaiPxB5XjHzU';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&region=IL&language=iw`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}
