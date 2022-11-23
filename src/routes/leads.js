import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { token_leads } from '../helpers/auth'

const LeadsRoutes = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} render={props => (
            token_leads ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

export default LeadsRoutes;