import {atom} from "recoil";


export const imagesState = atom({
    key: 'images',
    default: [],
});

export const imageFilesState = atom({
    key: 'imageFiles',
    default: [],
});
