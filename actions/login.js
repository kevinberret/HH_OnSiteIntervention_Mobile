import ActionTypes from '../Store/actionTypes';

import SERVER_URL from '../config/config';

import { showFlashMessage } from './utils';
import { resetCustomerReducer } from './customers';
import { resetEmployeeReducer } from './employees';
import { resetInterventionReducer } from './interventions';

export const login_REQ = (username, password) => (
    {
        type: ActionTypes.LOGIN_REQ,
        username:username,
        password:password,
    }
);

export const login_OK = (token, user) => (
    {
        type: ActionTypes.LOGIN_OK,
        token: token,
        user: user
    }
);

export const login_ERR = () => (
    {
        type: ActionTypes.LOGIN_ERR,
    }
);

export const logout_REQ = () => (
    {
        type: ActionTypes.LOGOUT_REQ
    }
)

// functions
export const login = (username, password) => {
    return async(dispatch, getState) => {
        const auth = getState();
        console.log(username)
        if(!auth.loginAttempt){
            dispatch(login_REQ(username, password));
            console.log(SERVER_URL); 
            fetch(
                SERVER_URL+'api/login',
                {
                    method: 'POST',
                    body:JSON.stringify({
                        username:username,
                        password:password
                    })
                }
            )
            // nice way to parse the response from fetch found here: https://stackoverflow.com/a/37099629
            .then(response =>
                response.json().then(json => ({
                    headers: response.headers,
                    status: response.status,
                    json
                })
            ))
            .then(
                // Both fetching and parsing succeeded!
                ({ headers, status, json }) => {
                    if(status >= 500){
                        // error occured
                        showFlashMessage('Error', 'Server error. Please try again.', 'danger');
                        dispatch(login_ERR());
                    }
                    else if(status >= 400){
                        // error occured
                        showFlashMessage('Error', 'Authentication error. Check your username/password.', 'danger');
                        dispatch(login_ERR());
                    }else{
                        // Status looks good
                        const token = headers.get('Authorization');
                        const user = json;

                        if(token !== null){
                            showFlashMessage('Success', 'Welcome.', 'success');
                            dispatch(login_OK(token, user));
                        }
                    }
                },
                // Either fetching or parsing failed!
                err => {
                    showFlashMessage('Error', 'Server error. Please try again.', 'danger');
                    dispatch(login_ERR());
                }
            );
        }
    }
}

export const logout = () => {
    return async(dispatch, getState) => {
        dispatch(logout_REQ());

        // reset the store
        dispatch(resetCustomerReducer());
        dispatch(resetEmployeeReducer());
        dispatch(resetInterventionReducer());
    }
}