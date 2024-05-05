function set(url, key, value) {
    const queryStringIndex = url.indexOf('?');
    const hasQueryString = queryStringIndex !== -1;

    // Check if the provided key already exists in the query parameters
    if (hasQueryString) {
        const queryString = url.substring(queryStringIndex + 1);
        const queryParams = queryString.split('&');
        let updatedParams = queryParams.map(param => {
            const [paramKey, paramValue] = param.split('=');
            if (paramKey === key) {
                return `${paramKey}=${encodeURIComponent(value)}`;
            }
            return param;
        });
        if (!queryParams.some(param => param.startsWith(key + '='))) {
            updatedParams.push(`${key}=${encodeURIComponent(value)}`);
        }
        return url.substring(0, queryStringIndex + 1) + updatedParams.join('&');
    } else {
        return `${url}?${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }
}


function remove(url, keyToRemove) {
    const queryStringIndex = url.indexOf('?');
    if (queryStringIndex !== -1) {
        const queryString = url.substring(queryStringIndex + 1);
        const queryParams = queryString.split('&');
        const updatedParams = queryParams.filter(param => {
            const [paramKey] = param.split('=');
            return paramKey !== keyToRemove;
        });
        const newQueryString = updatedParams.join('&');
        const baseURL = url.substring(0, queryStringIndex);
        return newQueryString ? `${baseURL}?${newQueryString}` : baseURL;
    } else {
        return url;
    }
}

export default {set, remove};
