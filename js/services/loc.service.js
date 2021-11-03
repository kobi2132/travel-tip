// import { storageService } from "./storage.service"
export const locService = {
    getLocs,
    addNewLoc,
    deleteLoc,
}


const locs = [
    { id: 1242, name: 'Greatplace', lat: 32.047104, lng: 34.832384, weather: 'nice', createdAt: 21345, updatedAt: 999 },
    { id: 3352, name: 'Neveragain', lat: 32.047201, lng: 34.832581, weather: 'nice', createdAt: 21345, updatedAt: 999 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function addNewLoc(posName, pos) {
    locs.push({
        id: makeId(),
        name: posName,
        lat: pos.lat,
        lng: pos.lng,
        weather: 'nice',
        createdAt: Date.now(),
        updatedAt: Date.now()
    })
}

function deleteLoc(id) {
    let itemIdx = findIdx(id);
    locs.splice(itemIdx, 1);
    console.log(locs)
}





//----------IN_UTILES----------------

function makeId(length = 4) {
    console.log('hello makeId')
    var txt = ''
    var possible = 'QWETRYUIOPASDFHJKLZXCVBNM1234567890qwerytuiopasdfghjklzxcvbnm'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function findIdx(id) {
    return locs.findIndex((loc => id === loc.id));
}
