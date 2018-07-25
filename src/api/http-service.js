/**
 * Http interceptor for set headers
 */
import axios from 'axios';

const httpServise = {
    get: (url, params) => {
        return new Promise((resolve, reject) => {
            axios(url, {
                method: 'GET',
                headers: getHeaders(url),
                params: params
            }).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    },
    post: (url, params) => {
        return new Promise((resolve, reject) => {
            axios(url, {
                method: 'POST',
                headers: getHeaders(url),
                data: params
            }).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    },
    put: (url, params) => {
        return new Promise((resolve, reject) => {
            axios(url, {
                method: 'PUT',
                headers: getHeaders(url),
                data: params
            }).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    },
    delete: (url, params) => {
        return new Promise((resolve, reject) => {
            axios(url, {
                method: 'DELETE',
                headers: getHeaders(url),
                data: params
            }).then(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }
};

function getHeaders(url) {
    let mapboxRequest = url.includes('directions');
    let headers = mapboxRequest ? {'Content-Type': 'application/json'} : {'Client-Device': 'web', 'Content-Type': 'application/json'};

    let userToken = window.localStorage.getItem('auth_headers');
    if (userToken) headers['access-token'] = JSON.parse(userToken) ? JSON.parse(userToken)['access-token'] : '';
    return headers;
}
export default httpServise;