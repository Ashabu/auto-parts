import {TecDocInstance, TEC_DOC_BASEURL, TEC_DOC_PROVIDER_ID} from './Api/axiosApi';
import axios from 'axios';
import {IFinaAuthResponse, IGetProductsResponse, IGetVehiclesByVinResponse, IGetVehiclesByCarMakerResponse} from './Api/types';
import { storeData, getData } from './services/StorageService';
const CONSUMER_KEY = 'ck_c55e81512de294204794032506bbe1aa70e0518a';
const CONSUMER_SECRET = 'cs_00ac3848fc8b9c0ea2b9b185f0b2d2802e6f368f';


const FINA_BASEURL = 'http://185.139.57.86:8083'
const FINA_AUTH_KEY = 'premAPIx';
const FINA_AUTH_PASSWORD = 'Pr3miXX@piPass';


export async function searchItems(searchValue: string, currentPage: number) {
    return await axios.get(`https://shopapp.1-amedia.ru/wp-json/wc/v3/products/?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&search=${searchValue}&status=publish&per_page=10&page=${currentPage}&lang=ru&oauth_signature=undefined`)
}

export const getAccessToken = () => {
    let token = '';
     getData("fina_token").then(data => {
        token = data!;
     });
     return token
};


const finaInstance = axios.create({
    baseURL: FINA_BASEURL,
    timeout: 25000,
    headers: {
        'Authorization': getAccessToken() ? `Bearer ${getAccessToken()}` : '',
        "Content-Type": "application/json",
        accept: "application/json",
    }
});




export function GetFinaAuthToken() {
    let data: {
        Login: string, Password: string
    } = {
        "Login": FINA_AUTH_KEY,
        "Password": FINA_AUTH_PASSWORD
    };

    axios.post<IFinaAuthResponse>('http://185.139.57.86:8083/api/authentication/authenticate', data).then((response) => {
        storeData('fina_token', response.data.token)
    }).catch((error) => {
        console.log(error);
    });
};

export async function GetProductList() {
    console.log('started');
    // console.log(finaInstance.get('/api/operation/getProducts'))
    // finaInstance.get<IGetProductsResponse>('/api/operation/getProducts').then(response => {
    //     console.log(response.data.products)
    // }).catch((err: any) =>{
    //     console.log(err)
    // })

    var config = {
        method: 'get',
        url: 'http://185.139.57.86:8083/api/operation/getProducts',
        headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NjI5NjczNDcsImV4cCI6MTY2MzA5Njk0NywiaWF0IjoxNjYyOTY3MzQ3LCJpc3MiOiJGSU5BIEwudC5kIiwiYXVkIjoi4YOo4YOe4YOhIFBSRU1JWCAuIn0.VNw7qiOxeAR1u-AgPSNTgCsdIznLt39g2uum_QoUm1N8XTtv9RHkRh6DUTquCimpZm8ZBNV1Z0wWcKxgYgtVuQ'
        }
      };
      
      return axios(config)
      
}

export async function GetVehiclesByVin(vin: string) {
    let requestData = {
        getVehiclesByVIN: {
            country: 'RU',
            lang: 'ru',
            provider: TEC_DOC_PROVIDER_ID,
            vin: vin
        }
    }
    return await TecDocInstance.post<IGetVehiclesByVinResponse>(TEC_DOC_BASEURL, requestData);
}
export async function GetVehiclesByCarMaker() {
    let requestData = {
        getManufacturers2: {
            country: "RU",
            lang: "ru",
            linkingTargetType: "s",
            provider: TEC_DOC_PROVIDER_ID
          }
    }
    return await TecDocInstance.post<IGetVehiclesByCarMakerResponse>(TEC_DOC_BASEURL, requestData);
}
export async function GetVehiclesByCarModel(manuId: number) {
    let requestData = {
        getModelSeries2: {
            country: 'RU',
            lang: 'ru',
            provider: TEC_DOC_PROVIDER_ID,
            manuId: manuId
        }
    }
    return await TecDocInstance.post<IGetVehiclesByVinResponse>(TEC_DOC_BASEURL, requestData);
}