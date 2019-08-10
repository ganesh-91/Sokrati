import axios from 'axios';


let config = {
    YOUR_APP_ID: '3bc67f24',
    YOUR_APP_KEY: '28d127be55d278db21447667e7cf329c'
}

export const axiosInterceptor = axios.create({
    baseURL: `https://api.edamam.com/`
    // baseURL: `http://app.chefnote.me`
});

export const getApi = (data) => {
    return axiosInterceptor.get(`search?app_id=${config.YOUR_APP_ID}&app_key=${config.YOUR_APP_KEY}&to=20&${data}`)
    // return axiosInterceptor.get(`recipes.json?${data}`)
}

const API = {
    getApi
};

export default API;