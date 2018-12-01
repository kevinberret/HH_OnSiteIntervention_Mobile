import ActionTypes from '../actionTypes';

const initialState = {
    isLoading: false,
    list: [],
    current: null,
};

export default function customers(state = initialState, action) {
    let nextState
    switch (action.type) {
        case ActionTypes.GET_ALL_CUSTOMERS_REQ:
            nextState = {
                ...state,
                isLoading:true,
            }
            return nextState || state;

        case ActionTypes.GET_ALL_CUSTOMERS_OK:
            nextState = {
                ...state,
                isLoading:false,
                list: action.list
            }
            return nextState || state;

        case ActionTypes.GET_ALL_CUSTOMERS_ERR:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.GET_CUSTOMER_BY_ID_REQ:
            nextState = {
                ...state,
                isLoading:true,
            }
            return nextState || state;

        case ActionTypes.GET_CUSTOMER_BY_ID_OK:
            nextState = {
                ...state,
                isLoading:false,
                current: action.current
            }
            return nextState || state;

        case ActionTypes.GET_CUSTOMER_BY_ID_ERR:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.SET_CURRENT_CUSTOMER:
            nextState = {
                ...state,
                current:action.current,
            }
            return nextState || state;

        case ActionTypes.RESET_CURRENT_CUSTOMER:
            nextState = {
                ...state,
                current:null,
            }
            return nextState || state;

        case ActionTypes.CREATE_CUSTOMER_REQ:
            nextState = {
                ...state,
                isLoading: true,
            }
            return nextState || state;

        case ActionTypes.CREATE_CUSTOMER_OK:
            nextState = {
                ...state,
                isLoading: false,
            }
            return nextState || state;

        case ActionTypes.CREATE_CUSTOMER_ERR:
            nextState = {
                ...state,
                isLoading: false,
            }
            return nextState || state;

        case ActionTypes.UPDATE_CUSTOMER_REQ:
            nextState = {
                ...state,
                isLoading:true,
            }
            return nextState || state;

        case ActionTypes.UPDATE_CUSTOMER_OK:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.UPDATE_CUSTOMER_ERR:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.DELETE_CUSTOMER_REQ:
            nextState = {
                ...state,
                isLoading:true,
            }
            return nextState || state;

        case ActionTypes.DELETE_CUSTOMER_OK:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.DELETE_CUSTOMER_ERR:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.RESET_CUSTOMER_REDUCER:
            nextState = initialState
            return nextState || state;
        
        default:
            return state;
    }
}