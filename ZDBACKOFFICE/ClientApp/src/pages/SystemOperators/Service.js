import { Get, Post, GetWithParams } from '../../utils/http';

const apiUrlSnippet = '/api/system';

function getSystemOperators(filter) {
    return GetWithParams(`${apiUrlSnippet}/operators`, filter);
}

function createOperator(model) {
    return Post(`${apiUrlSnippet}/create/operator`, model);
}

function getAllRolesForAssgin() {
    return Get(`${apiUrlSnippet}/all/roles`);
}

function assginRoles(model) {
    return Post(`${apiUrlSnippet}/assgin/roles`, model);
}

export { getSystemOperators, createOperator, getAllRolesForAssgin, assginRoles };