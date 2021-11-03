import { storageService } from "./storage.service.js"
export const locService = {
    getLocs,
    addNewLoc,
    deleteLoc,
    getCurrLoc,
}

const KEY = 'locsDB'

const locs = [
    { id: 1242, name: 'Nitzaney Oz', lat: 32.30933592392525, lng: 35.00758079808111, weather: 'nice', createdAt: 21345, updatedAt: 999 },
    { id: 3352, name: 'Herev Le`et', lat: 32.40161831012314, lng: 34.915886018615716, weather: 'nice', createdAt: 21345, updatedAt: 999 }
]

function getLocs() {
    const locs = storageService.load(KEY) || [];
    if (locs) return Promise.resolve(locs);

    console.log('Getting from Network');

    return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(locs)
            }, 2000)
        })
        .then(locs => {
            console.log('saved to storage')
            storageService.save(KEY, locs)
            return locs
        })
}

function getCurrLoc(id){
    let itemIdx = findIdx(id);
    return locs[itemIdx]
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

    console.log('saved to storage')
    storageService.save(KEY, locs)
}

function deleteLoc(id) {
    let itemIdx = findIdx(id);
    locs.splice(itemIdx, 1);
    storageService.save(KEY, locs)
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