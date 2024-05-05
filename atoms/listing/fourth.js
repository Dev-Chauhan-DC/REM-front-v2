import {atom} from 'recoil';

export const gatedSecurityState = atom({
    key: 'gatedSecurity',
    default: 0,
})

export const gymState = atom({
    key: 'gym',
    default: 0,
})

export const waterSupplyState = atom({
    key: 'waterSupply',
    default: 1,
})

export const powerBackupState = atom({
    key: 'powerBackup',
    default: 1,
})

export const amenityArrayState = atom({
    key: 'amenities',
    default: [],
})
