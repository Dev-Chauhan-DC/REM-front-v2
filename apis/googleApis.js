import axios from "axios"

const key = "AIzaSyDVNQlGHNNa_YBrcCLcNKA8NyZDE04D52c"

const googlePlaceAutoComplateApi = async (query) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&components=country:IN&types=geocode&key=${key}&fields=geometry`);
        return response;
    } catch (error) {
        console.error(error)
        return false
    }
}

const googlePlaceDetails = async (placeId) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${key}`);
        return response;
    } catch (error) {
        console.error(error)
        return false
    }
}

export default { googlePlaceAutoComplateApi, googlePlaceDetails }
