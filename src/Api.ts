import { TecDocInstance, TEC_DOC_BASEURL, TEC_DOC_PROVIDER_ID } from './Api/axiosApi';
import axios from 'axios';
import {IFinaAuthResponse, IGetProductsResponse, IGetVehiclesByVinResponse, IgGtLinkageTargetsRequest, IgGtLinkageTargetsResponse, IGetArticlesResponse, IGetArticlesData, IGetMainCategoriesResponse} from './Api/types';
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
    getData('fina_token').then(data => {
        token = data!;
    });
    return token
};


const finaInstance = axios.create({
    baseURL: FINA_BASEURL,
    timeout: 25000,
    headers: {
        'Authorization': getAccessToken() ? `Bearer ${getAccessToken()}` : '',
        ' Content-Type': 'application/json',
        'accept': 'application/json',
    }
});




export function GetFinaAuthToken() {
    let data: {
        Login: string, Password: string
    } = {
        Login: FINA_AUTH_KEY,
        Password: FINA_AUTH_PASSWORD
    };

    axios.post<IFinaAuthResponse>('http://185.139.57.86:8083/api/authentication/authenticate', data).then((response) => {
        storeData('fina_token', response.data.token)
    }).catch((error) => {
        console.log(error);
    });
};

export async function GetProductList() {
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

export async function GetLinkageTargets(data: any) {
    let requestData: IgGtLinkageTargetsRequest = {
        getLinkageTargets: {
            provider: TEC_DOC_PROVIDER_ID,
            linkageTargetCountry: 'RU',
            lang: 'en',
            linkageTargetType: 'V',
            perPage: 0,
            page: 1
        }
    };
    if (data.includeMfrFacets) {
        requestData.getLinkageTargets.includeMfrFacets = true;
    };
    if (data.includeVehicleModelSeriesFacets) {
        requestData.getLinkageTargets.mfrIds = data.mfrIds;
        requestData.getLinkageTargets.includeVehicleModelSeriesFacets = true;
    };
    if (data.vehicleModelSeriesIds) {
        requestData.getLinkageTargets.mfrIds = data.mfrIds;
        requestData.getLinkageTargets.vehicleModelSeriesIds = data.vehicleModelSeriesIds;
        requestData.getLinkageTargets.perPage = 100;
    }
    return await TecDocInstance.post<IgGtLinkageTargetsResponse>(TEC_DOC_BASEURL, requestData)
};

export async function GetArticles(type: string, data: any) {
    let requestData = {};
    

    if (type == 'GET_CATEGORIES') {
        requestData = {
            getArticles: {
                provider: TEC_DOC_PROVIDER_ID,
                articleCountry: 'RU',
                lang: 'en',
                perPage: 0,
                page: 1,
                linkageTargetId: data.linkageTargetId,
                linkageTargetType: data.linkageTargetType,
                assemblyGroupFacetOptions: {
                    enabled: true,
                    assemblyGroupType: 'P',
                    includeCompleteTree: true
                }
            }
        }
    };
    if (type == 'GET_SINGLE_ARTICLE') {
        requestData = {
            getArticles: {
                provider: TEC_DOC_PROVIDER_ID,
                articleCountry: 'RU',
                lang: 'en',
                perPage: 100,
                page: 1,
                assemblyGroupNodeIds: data.assemblyGroupNodeId,
                linkageTargetId: data.linkageTargetId,
                linkageTargetType: data.linkageTargetType,
                includeAll: true,
                includeOEMNumbers: true
            }
        }
    };
    console.log('*************************************************************',TEC_DOC_BASEURL, requestData)

    return await TecDocInstance.post<IGetArticlesResponse>(TEC_DOC_BASEURL, requestData)
};


export async function GetParentCategories(linkingTargetId: number) {
    let requestData = {
        getChildNodesAllLinkingTarget2: {
            provider: TEC_DOC_PROVIDER_ID,
            articleCountry: 'RU',
            lang: 'en',
            linkingTargetType: 'V',
            linkingTargetId: linkingTargetId
        }
    };
    
    return await TecDocInstance.post<IGetMainCategoriesResponse>(TEC_DOC_BASEURL, requestData);
};
