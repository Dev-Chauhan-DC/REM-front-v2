import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Buffer} from 'buffer';

// const baseUrl = 'https://www.screentimes.in';
const baseUrl = 'http://172.16.20.6:3000';

const auth = async phone => {
  try {
    const data = {
      phone: phone,
        };

        const response = await axios.post(`${baseUrl}/auth/signup`, data);

        if (response.data.success) {
            const token = response.data.data.token;
            const authType = response.data.authType;
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('authType', authType);
        }

        return response;
    } catch (e) {
        throw e;
    }
};

const otpAndVerify = async (phone, otp) => {
    try {
        const data = {
            phone: phone,
            otp: otp
        };

        const response = await axios.post(`${baseUrl}/auth/verify-otp-auth`, data);

        if (response.data.success) {
            const token = response.data.data.token;
            const authType = response.data.authType;
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('authType', authType);
        }

        return response;
    } catch (e) {
        throw e;
    }
};

const sendOtp = async (phone) => {
    try{
        const data = {
            phone: phone,
        };

        const response = await axios.post(`${baseUrl}/auth/send-otp`, data);
        return response;
    }catch (e) {
        console.log(e)
        throw e;
    }
}

const getRoles = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/roles`, {
            headers: {
                Authorization: token,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const updateRoles = async roleId => {
    try {
        const token = await AsyncStorage.getItem('token');
        const data = {
            roleId,
        };
        const response = await axios.post(`${baseUrl}/role`, data, {
            headers: {
                Authorization: token,
            },
        });
        return response;
    } catch (e) {
        throw e;
    }
};

const getUser = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/get/user`, {
            headers: {
                Authorization: token,
            },
        });
        return response;
    } catch (e) {
        throw e;
    }
};

const updateProfileInfo = async body => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.post(`${baseUrl}/update/profile/info`, body, {
            headers: {
                Authorization: token,
            },
        });
        return response;
    } catch (e) {
        throw e;
    }
};

const createProperty = async data => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(`${baseUrl}/list/property`, data, {
            headers: {
                Authorization: token,
            },
        });
        return response;
    } catch (e) {
        throw e;
    }
};

const createPropertyAmenities = async body => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.post(
            `${baseUrl}/list/property/amenities`,
            body,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return response;
    } catch (e) {
        throw e;
    }
};

const getUserProperties = async (query) => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.get(`${baseUrl}/user/properties${query ? query : ''}`, {
            headers: {
                Authorization: token,
            },
        });

        return response;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const deleteProperty = async propertyId => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.delete(`${baseUrl}/property/${propertyId}`, {
            headers: {
                Authorization: token,
            },
        });

        return response;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const getInterestedPeople = async (propertyId, page) => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.get(
            `${baseUrl}/property/${propertyId}/interested/peoples?page=${page ? page : "1"}`,
            {
                headers: {
                    Authorization: token,
                },
            },
        );

        return response;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const getSearchResults = async data => {
    const token = await AsyncStorage.getItem('token');

    try {
        const response = await axios.get(
            `${baseUrl}/properties/${data.swlat}/${data.swlong}/${data.nelat}/${data.nelong}${data.filters}`,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return response;
    } catch (e) {
        throw e;
    }
};

const getPropertyById = async (id, query) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const data = {
            propertyId: id,
        };
        const response = await axios.post(`${baseUrl}/property${query ? query : ''}`, data, {
            headers: {
                Authorization: token,
            },
        });

        return response;
    } catch (e) {
        throw e;
    }
};

const saveProperty = async id => {
    const token = await AsyncStorage.getItem('token');

    const data = {
        propertyId: id,
    };

    try {
        const response = await axios.post(`${baseUrl}/save/property`, data, {
            headers: {
                Authorization: token,
            },
        });

        return response;
    } catch (e) {
        throw e;
    }
};

const getSavedProperty = async sortingQuery => {
    const token = await AsyncStorage.getItem('token');

    try {
        const response = await axios.get(
            `${baseUrl}/properties/saved${sortingQuery}`,
            {
                headers: {
                    Authorization: token,
                },
            },
        );

        return response;
    } catch (e) {
        throw e;
    }
};

const getPropertiesById = async ids => {
    const token = await AsyncStorage.getItem('token');

    try {
        const response = await axios.get(`${baseUrl}/properties?ids=${ids}`, {
            headers: {
                Authorization: token,
            },
        });

        return response;
    } catch (e) {
        throw e;
    }
};

const getPresignedUrl = async reqData => {
    try {
        const token = await AsyncStorage.getItem('token');

        const data = {
            fileName: reqData.fileName,
            ContentType: reqData.ContentType,
        };

        const responce = await axios.post(`${baseUrl}/s3/get-presigned-url`, data, {
            headers: {
                authorization: `${token}`,
            },
        });
        return responce;
    } catch (e) {
        throw e;
    }
};

const sendDataToS3 = async reqData => {
    const buffer = Buffer.from(reqData.fileBase64, 'base64');

    try {
        const responce = await axios.put(reqData.url, buffer, {
            headers: {
                'Content-Type': reqData.fileType,
            },
        });

        return responce;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const createPropertyPhotos = async body => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.post(`${baseUrl}/list/property/images`, body, {
            headers: {
                Authorization: token,
            },
        });
        return response;
    } catch (e) {
        throw e;
    }
};

const createInterestedPerson = async reqData => {
    try {
        const token = await AsyncStorage.getItem('token');
        const data = {
            propertyId: reqData.propertyId,
        };
        const response = await axios.post(
            `${baseUrl}/list/interested/person`,
            data,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return response;
    } catch (e) {
        throw e;
    }
};

// correct error handling
const generateOrderId = async reqData => {
    try {
        const token = await AsyncStorage.getItem('token');
        const data = {
            couponCode: reqData.couponCode,
            planId: reqData.planId,
        };
        const response = await axios.post(
            `${baseUrl}/payment/generate-order-id`,
            data,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return response;
    } catch (e) {
        throw e;
    }
};

const isUserSubscriptionActive = async () => {
    try {
        const token = await AsyncStorage.getItem('token');

        const response = await axios.get(`${baseUrl}/user/is-subscription-active`, {
            headers: {
                Authorization: token,
            },
        });
        return response;
    } catch (e) {
        throw e;
    }
};

const createSubscription = async reqData => {
    try {
        const token = await AsyncStorage.getItem('token');
        const data = {
            planId: reqData.planId,
            orderId: reqData.orderId,
            segnatureId: reqData.segnatureId,
            paymentId: reqData.paymentId,
            paidAmount: reqData.paidAmount,
            couponId: reqData.couponId,
        };
        const response = await axios.post(
            `${baseUrl}/payment/user-subscription/successful`,
            data,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return response;
    } catch (e) {
        throw e;
    }
};

const createFile = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(
            `${baseUrl}/file/create`, data, {
                headers: {
                    Authorization: token,
                },
            },
        );

        return response;
    } catch (e) {
        throw e;
    }
};

const createPropertyPhotoFiles = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(
            `${baseUrl}/list/property/images/file/id`, data, {
                headers: {
                    Authorization: token,
                },
            },
        );

        return response;
    } catch (e) {
        throw e;
    }
};

const readFileByFileId = async (fileId) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(
            `${baseUrl}/file/read`, {fileId}, {
                headers: {
                    Authorization: token,
                },
            },
        );

        return response;
    } catch (e) {
        throw e;
    }
};

export default {
    auth,
    sendOtp,
    otpAndVerify,
    getRoles,
    updateRoles,
    getUser,
    updateProfileInfo,
    createProperty,
    createPropertyAmenities,
    getUserProperties,
    deleteProperty,
    getInterestedPeople,
    getSearchResults,
    getPropertyById,
    saveProperty,
    getSavedProperty,
    getPropertiesById,
    getPresignedUrl,
    sendDataToS3,
    createPropertyPhotos,
    createInterestedPerson,
    generateOrderId,
    isUserSubscriptionActive,
    createSubscription,
    createFile,
    createPropertyPhotoFiles,
    readFileByFileId

};
