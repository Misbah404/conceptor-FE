import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { token_user } from '../helpers/auth'

const UserRoutes = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} render={props => (
            token_user ? 
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

export default UserRoutes;