import { SHA1 } from "./SHA1";

const AppId = "A6053788184630";
const AppKey = "8B3F5860-2646-2C47-DC50-39106919B260";
var now = Date.now();
const secureAppKey = SHA1(AppId + "UZ" + AppKey + "UZ" + now) + "." + now;

const headers = new Headers({
  "X-APICloud-AppId": AppId,
  "X-APICloud-AppKey": secureAppKey,
  "Accept": "application/json",
  "Content-Type": "application/json"
});

function get(url) {
  return fetch(url, {
    method: "GET",
    headers: headers
  }).then(response => {
    return handleResponse(url, response);
  }).catch(err => {
    return { error: { message: "Request failed." } };
  })
}

function getWithParams(url, params) {
  if (params) {
    let paramsArray = [];
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return fetch(url, {
    method: 'GET',
    headers: headers
  }).then(response => {
    return handleResponse(url, response)
  }).catch((err) => {
    return { error: { message: "Request failed." } };
  })
}

function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  }).then(checkStatus)
    .then(parseJSON)
    .then((data) => data)
    .catch((err) => Promise.reject(err));
}

function put(url, data) {
  return fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data)
  }).then(response => {
    return handleResponse(url, response);
  }).catch(err => {
    console.error(`Request failed. Url = ${url} . Message = ${err}`);
    return { error: { message: "Request failed." } };
  })
}

function handleResponse(url, response) {
  if (response.status < 500) {
    return response.json();
  } else {
    console.error(`Request failed. Url = ${url} . Message = ${response.statusText}`);
    return { error: { message: "Request failed due to server error " } };
  }
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return Promise.reject(response.json());
  }
  // const error = new Error(response.statusText);
  // error.response = response;
  // console.log(response);
  // throw error;
}

export { get, post, put, getWithParams }