import store from 'store';
import cookie from 'js-cookie';

const user_name = 'user_name';
const user_permissions = 'user_permissions';

function getSessionUserName() {
    return sessionStorage.getItem(user_name);
}

function getSessionUserPermissions() {
    return sessionStorage.getItem(user_permissions);
}

function setLocalData(name, value) {
    store.set(name, value);
}

function cleanAllLocalData() {
    store.clearAll();
}

function getLocalUserName() {
    return store.get(user_name);
}

function getLocalUserPermissions() {
    return store.get(user_permissions);
}

function setToken(token, options) {
    cookie.set('access_token', token, options);
}

function getToken() {
    return cookie.get('access_token');
}

function removeToken() {
    cookie.remove('access_token');
}

export {
    user_name,
    user_permissions,
    getSessionUserName,
    getSessionUserPermissions,
    setLocalData,
    cleanAllLocalData,
    getLocalUserName,
    getLocalUserPermissions,
    setToken,
    getToken,
    removeToken
}