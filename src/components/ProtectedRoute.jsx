import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { toast } from "react-toastify";

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
    return (
        <Route {...rest} render={
                props => {
                    if(user){
                        return <Component {...rest} {...props} />
                    }
                    else { 
                        toast.error("Unauthorised Access");
                         return <Redirect to= {
                            {
                                pathname: '/',
                                state: {
                                    from: props.location
                                }
                            }
                        } 
                        />
                    }
                }
            }
        />
    )
}

export default ProtectedRoute;