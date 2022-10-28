import axios from 'axios';
import { getAccessToken } from './../Api';


const BASE_URL = 'https://shopapp.1-amedia.ru';
const FINA_BASEURL = 'http://185.139.57.86:8083'
const FINA_AUTH_KEY = 'premAPIx';
const FINA_AUTH_PASSWORD = 'Pr3miXX@piPass';  
export const TEC_DOC_BASEURL = 'https://webservice.tecalliance.services/pegasus-3-0/info/proxy/services/TecdocToCatDLB.jsonEndpoint';
const TEC_DOC_API_KEY = '2BeBXg6GThDH8GRV3rZiYoYW4CZR5UWtYeJy7KyhX65iHNPjwads';
export const TEC_DOC_PROVIDER_ID = 22890;


 const WpressInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
        "Content-Type": "application/json",
        accept: "application/json",
    }
});


WpressInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url !== "/auth" && error.response) {
            // Access Token was expired
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                // try {
                //     const refreshData = await axiosInstance.post("refresh token api link", {
                //         refreshToken: getRefreshToken(), //function to get refresh token
                //     });
                //     const { accessToken } = refreshData.data;
                //     setToken(accessToken) //function to update existing access token 
                //     return axiosInstance(originalRequest);
                // } catch (_error) {
                //     return Promise.reject(_error);
                // };
            };
        };
        return Promise.reject(error);
    }
);

export default WpressInstance;

export const FinaInstance = axios.create({
    baseURL: FINA_BASEURL,
    timeout: 25000,
    headers: {
        'Authorization': getAccessToken() ? `Bearer ${getAccessToken()}` : '',
        "Content-Type": "application/json",
        accept: "application/json",
    }
});

export const TecDocInstance = axios.create({
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
        "X-API-Key": TEC_DOC_API_KEY
    }
});