/**
 * @api {JANELA} PRIVATEROUTE PrivateRoute 
 * @apiName eleicoesSegurasPrivateRoute
 * @apiGroup PrivateRoute
 *
 * @apiDescription PrivateRoute
 * - Controlo de acessos
 */
import React from 'react'; //React main module
import { Route, Redirect } from 'react-router-dom'; //React Route and Redirect to send user to a specific page
export const PrivateRoute = ({ component: Component, ...rest }) => ( //Begin PrivateRoute class
    <Route {...rest} render={props => ( //Begin Route for using redirect
        localStorage.getItem('token_eleicoes_seguras')  //Lambda if token_eleicoes_seguras exists
            ? <Component {...props} /> //The render Component props (other component aka module)
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> //else redirects to login
    )} /> //End Route using redirect
); //End PrivateRoute class //6292a9bb828f4cfbd5b16ba4a3c1228b6db7f188996a20c2c89998ea49ae6a48311add05e3b89b1f616afdeb7b32dc004cce351bdbd6ec9c6dcda57071e25513



