import {atom} from 'recoil';


export const southwestLatState = atom({
    key: 'southwestLat',
    default: 20.925599580988436,
});

export const southwestLngState = atom({
    key: 'southwestLng',
    default: 72.60742485523225,
});

export const northeastLatState = atom({
    key: 'northeastLat',
    default: 21.495048866961963,
});

export const northeastLngState = atom({
    key: 'northeastLng',
    default: 73.03833816200495,
});

export const filterStringState = atom({
    key: 'filterString',
    default: '',
});

export const latitudeState = atom({
    key: 'latitude',
    default: 21.2103242239752,
});

export const longitudeState = atom({
    key: 'longitude',
    default: 72.8228815086186,
});

export const searchQueryState = atom({
    key: 'searchQuery',
    default: ''
})

export const propertiesState = atom({
    key: 'properties',
    default: []
})

export const pageState = atom({
    key: 'page',
    default: 1
})

export const mapPropertiesState = atom({
    key: 'mapProperties',
    default: []
})

export const propertyCardDataState = atom({
    key: 'propertyCardData',
    default: {}
})


