/**
 * @api {JANELA} USERSERVICE userService 
 * @apiName eleicoesSegurasuserService
 * @apiGroup userService
 *
 * @apiDescription userService
 * - Gestão de acessos
 * - Login
 * - Logout
 */
/*
In this file we have the logic to contact the rest server in order tyo get back
all the data the users will need to be authenticated or not
*/
const hosts= require('../hosts');
const host_api = hosts.ango_restapi;
//const auxiliaryFunctions = require ('./utils'); //Auxiliary functions

export const userService = {
    login,
    logout,
};


function login(username, password, keepConnected) {
    //console.log (keepConnected)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
   
    var user = undefined 
    return fetch(host_api+'/users/login/', requestOptions)
        .then(response => response.json()) //Accepts only json responses
        .then(responseJson => {
            // login successful if there's a user in the response
            if ('user' in responseJson) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user = responseJson.user[0];
                //The JWT (Jason Web Token) is used to give the user the authentication card
                console.log ("User -> ", JSON.stringify(user))
                localStorage.setItem('token_eleicoes_seguras', JSON.stringify(user)); //convert to a json string
                localStorage.setItem('permissions_eleicoes_seguras', JSON.stringify(responseJson.permissions)); //convert to a json string
                if (keepConnected){
                    localStorage.setItem('keepConnected', JSON.stringify ({"username": username, "password": password})); //convert to a json string
                }
            }
            else
                logout();
            return user;
        })
        .catch((error) =>{  //Handle any other exception during GET
            console.error(error);
            logout();
        });  
}

function logout() {
    localStorage.removeItem('token_eleicoes_seguras');
    localStorage.removeItem('permissions_eleicoes_seguras');
}
//6292a9bb828f4cfbd5b16ba4a3c1228b6db7f188996a20c2c89998ea49ae6a48311add05e3b89b1f616afdeb7b32dc004cce351bdbd6ec9c6dcda57071e25513
