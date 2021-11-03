// import { storageService } from "./storage.service"
export const locService = {
    getLocs,
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