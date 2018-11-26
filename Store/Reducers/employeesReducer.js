import ActionTypes from '../actionTypes';

const initialState = {
    isLoading:false,
    list:[],
    current: null,  
};

export default function employees(state = initialState, action) {
    let nextState
    switch (action.type) {
        case ActionTypes.GET_ALL_EMPLOYEES_REQ:
            nextState = {
                ...state,
                isLoading:true,
            }
            return nextState || state;

        case ActionTypes.GET_ALL_EMPLOYEES_OK:
            nextState = {
                ...state,
                isLoading:false,
                list: action.list
            }
            return nextState || state;

        case ActionTypes.GET_ALL_EMPLOYEES_ERR:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.GET_EMPLOYEE_BY_ID_REQ:
            nextState = {
                ...state,
                isLoading:true,
            }
            return nextState || state;

        case ActionTypes.GET_EMPLOYEE_BY_ID_OK:
            nextState = {
                ...state,
                isLoading:false,
                current: action.current
            }
            return nextState || state;

        case ActionTypes.GET_EMPLOYEE_BY_ID_ERR:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.SET_CURRENT_EMPLOYEE:
            nextState = {
                ...state,
                current:action.current,
            }
            return nextState || state;

        case ActionTypes.RESET_CURRENT_EMPLOYEE:
            nextState = {
                ...state,
                current:null,
            }
            return nextState || state;

        case ActionTypes.CREATE_EMPLOYEE_REQ:
            nextState = {
                ...state,
                isLoading: true,
            }
            return nextState || state;

        case ActionTypes.CREATE_EMPLOYEE_OK:
            nextState = {
                ...state,
                isLoading: false,
            }
            return nextState || state;

        case ActionTypes.CREATE_EMPLOYEE_ERR:
            nextState = {
                ...state,
                isLoading: false,
            }
            return nextState || state;

        case ActionTypes.UPDATE_EMPLOYEE_REQ:
            nextState = {
                ...state,
                isLoading:true,
            }
            return nextState || state;

        case ActionTypes.UPDATE_EMPLOYEE_OK:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.UPDATE_EMPLOYEE_ERR:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.DELETE_EMPLOYEE_REQ:
            nextState = {
                ...state,
                isLoading:true,
            }
            return nextState || state;

        case ActionTypes.DELETE_EMPLOYEE_OK:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.DELETE_EMPLOYEE_ERR:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        default:
            return state;
    }
}