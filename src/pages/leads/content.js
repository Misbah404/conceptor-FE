import React from 'react'
import { Switch, Route } from 'react-router-dom'

import routes from './routes'

const LeadsContent = ({ ...props }) => {

    return (
        <div className="relative flex-1 overflow-auto bg-gray-100">
            <Switch>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        children={<route.component {...props} />}
                    />
                ))}
            </Switch>
        </div>
    )
}

export default LeadsContent