import {atom} from 'recoil';

export const regionState = atom({
    key: "region",
    default: {
        latitude: 21.225082570130432,
        longitude: 72.8368378803134,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
})

export const mapRegionState = atom({
    key: "mapRegion",
    default: {
        latitude: 21.22508257013043,
        longitude: 72.8368378803134,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
})
