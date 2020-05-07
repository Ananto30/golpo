import React from "react"
import { Route } from "react-router"

export const HeaderLayout = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        <>
            <Component {...props} />
        </>
    )} />
)