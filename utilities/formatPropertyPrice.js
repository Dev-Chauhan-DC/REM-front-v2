function formatPropertyPrice(price) {
    if (price >= 10000000) {
        return (price / 10000000).toFixed(2) + ' Cr';
    } else if (price >= 100000) {
        return (price / 100000).toFixed(0) + ' L';
    } else if (price >= 1000) {
        return (price / 1000).toFixed(0) + ' k';
    } else {
        return price.toString();
    }
}

export default formatPropertyPrice