// import { storageService } from './services/storage.service.js'
export const locService = {
    getLocs,
    addNewLoc
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

function addNewLoc(posName, pos){
    locs.push({
        id: 1234,
        name: posName,
        lat: pos.lat,
        lng: pos.lng,
        weather: 'nice',
        createdAt: Date.now(),
        updatedAt: Date.now()
    })
    console.log(locs);
}
