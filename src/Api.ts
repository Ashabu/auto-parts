import axios from 'axios';
const CONSUMER_KEY = 'ck_c55e81512de294204794032506bbe1aa70e0518a';
const CONSUMER_SECRET = 'cs_00ac3848fc8b9c0ea2b9b185f0b2d2802e6f368f';

export async function searchItems(searchValue: string, currentPage: number) {
    return await axios.get(`https://shopapp.1-amedia.ru/wp-json/wc/v3/products/?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&search=${searchValue}&status=publish&per_page=10&page=${currentPage}&lang=ru&oauth_signature=undefined`)
}