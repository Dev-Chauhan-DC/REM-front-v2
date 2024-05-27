import {atom} from 'recoil';

export const expectedPriceState = atom({
    key: 'expectedPrice',
    default: "0",
});

export const priceNagotiableState = atom({
    key: 'priceNagotiable',
    default: 1,
});

export const maintenanceState = atom({
    key: 'maintenance',
    default: "",
});

export const isUnderLoanState = atom({
    key: 'isUnderLoan',
    default: 0,
});

export const availabilityState = atom({
    key: 'availability',
    default: 1,
});

export const furnishingState = atom({
    key: 'furnishing',
    default: 1,
});

export const parkingTwoWheelerState = atom({
    key: 'parkingTwoWheeler',
    default: 0,
});

export const parkingFourWheelerState = atom({
    key: 'parkingFourWheeler',
    default: 0,
});

export const cupboardState = atom({
    key: 'cupboard',
    default: 0,
});

export const kitchenTypeState = atom({
    key: 'kitchenType',
    default: 1,
});

export const propertyDescriptionState = atom({
    key: 'propertyDescription',
    default: "",
});

export const cornerPropertyState = atom({
    key: 'cornerProperty',
    default: 0,
});

export const possessionStatusState = atom({
    key: 'possessionStatus',
    default: 1,
});

export const totalFlatsInBuildingState = atom({
    key: 'totalFlatsInBuilding',
    default: "",
});

export const preferredTenantsState = atom({
    key: 'preferredTenants',
    default: 1,
});


