const extractKeyFromUrl = (presignedUrl) => {
    const arr = presignedUrl.split('?');
    const arr2 = arr[0].split('.com');
    const str = arr2[1].substring(1);
    const decodedStr = decodeURIComponent(str);
    return decodedStr;
};


export default {extractKeyFromUrl};

