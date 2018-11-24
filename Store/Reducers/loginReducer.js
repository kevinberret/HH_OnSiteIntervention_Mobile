import ActionTypes from '../actionTypes';

const initialState = {
    token: null,
    loginAttempt: false,
    loginFailed: false,
    user: null,
};

export default function login(state = initialState, action) {
    let nextState
    switch (action.type) {
        // LOGIN ACTIONS
        case ActionTypes.LOGIN_REQ:
            nextState = {
                ...state,
                loginFailed: false,
                loginAttempt: true,
            }
            return nextState || state;

        case ActionTypes.LOGIN_OK:
            nextState = {
                ...state,
                token: action.token,
                user: action.user,
                loginAttempt: false,
                loginFailed: false,
            }
            return nextState || state;

        case ActionTypes.LOGIN_ERR:
            nextState = {
                ...state,
                loginAttempt: false,
                loginFailed: true,
            }
            return nextState || state;

        // LOGOUT ACTIONS
        case ActionTypes.LOGOUT_REQ:
            nextState = {
                ...state,
                token: null,
                user: null
            }
            return nextState || state;

        default:
            return state;
    }
}