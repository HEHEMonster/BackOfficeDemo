import axios from 'axios';
import { getToken } from '../static/sessionKey';


const instance = axios.create({
    // headers: {
    //     Authorization: `Bearer ${getToken()}`
    // }
})

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

function Request(params) {
    return axios({
        ...params,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}

function Post(url, data, options = {}) {
    return instance.post(url, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        ...options
    })
}

function Get(url) {
    return instance.get(url, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

function GetWithParams(url, params) {
    return instance.get(url, {
        params: params,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

function Put(url, data) {
    return instance.put(url, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

function Delete(url, params) {
    return instance.delete(url, {
        params: params,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}


export { Post, Get, GetWithParams, Request, Put, Delete }
