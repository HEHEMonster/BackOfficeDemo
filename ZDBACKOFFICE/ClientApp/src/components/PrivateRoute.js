import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getLocalUserPermissions } from '../static/sessionKey';

// 权限路由组件
const PrivateRoute = ({ component: Component, allow, ...rest }) => {

    const allowAccess = () => {
        let currentUserPermissions = `${getLocalUserPermissions()}` || '';
        return currentUserPermissions.split(',').some(x => [...allow].includes(x));
    }
    
    return (
        <Route {...rest} render={(props) => (
            allowAccess() ? <Component {...props}></Component> : <Redirect to='/forbidden' />
        )} />
    );
}

export default PrivateRoute;