import axios from 'axios';
import { authHeader } from './authUtils';


const baseURL =  process.env.REACT_APP_API_URL;

 const httpClient =  axios.create({});

 /**
 *
 * @param {string} url
 * @param {object} data
 */

const httpClient_post = (url,data,baseURL_=baseURL) => {
   httpClient.defaults.headers.common = authHeader();
   return httpClient.post(`${baseURL_}${url}`,data);
}

/**
 *
 * @param {string} url
 * @param {object} data
 */
const httpClient_get = (url) => {
   httpClient.defaults.headers.common = authHeader();
   return httpClient.get(`${baseURL}${url}`);
}

/**
 *
 * @param {string} url
 * @param {object} data
 */
const httpClient_delete = (url,data) => {
   return httpClient.delete(`${baseURL}${url}`,data);
}

/**
 *
 * @param {string} url
 * @param {object} data
 */
const httpClient_put = (url,data) => {

   return httpClient.put(`${baseURL}${url}`,data);
}




export {
    httpClient,
    httpClient_post,
    httpClient_get,
    httpClient_delete ,
    httpClient_put

}
