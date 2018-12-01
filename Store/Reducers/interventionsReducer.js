import ActionTypes from '../actionTypes';

const initialState = {
    isLoading: false,
    list: [],
    current: null
};

export default function interventions(state = initialState, action) {
    let nextState
    switch (action.type) {
        case ActionTypes.GET_ALL_INTERVENTIONS_REQ:
            nextState = {
                ...state,
                isLoading:true,
            }
            return nextState || state;

        case ActionTypes.GET_ALL_INTERVENTIONS_OK:
            nextState = {
                ...state,
                isLoading:false,
                list: action.list
            }
            return nextState || state;

        case ActionTypes.GET_ALL_INTERVENTIONS_ERR:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

            case ActionTypes.GET_INTERVENTION_BY_ID_REQ:
            nextState = {
                ...state,
                isLoading:true,
            }
            return nextState || state;

        case ActionTypes.GET_INTERVENTION_BY_ID_OK:
            nextState = {
                ...state,
                isLoading:false,
                current: action.current
            }
            return nextState || state;

        case ActionTypes.GET_INTERVENTION_BY_ID_ERR:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.SET_CURRENT_INTERVENTION:
            nextState = {
                ...state,
                current:action.current,
            }
            return nextState || state;

        case ActionTypes.RESET_CURRENT_INTERVENTION:
            nextState = {
                ...state,
                current:null,
            }
            return nextState || state;

        case ActionTypes.CREATE_INTERVENTION_REQ:
            nextState = {
                ...state,
                isLoading: true,
            }
            return nextState || state;

        case ActionTypes.CREATE_INTERVENTION_OK:
            nextState = {
                ...state,
                isLoading: false,
            }
            return nextState || state;

        case ActionTypes.CREATE_INTERVENTION_ERR:
            nextState = {
                ...state,
                isLoading: false,
            }
            return nextState || state;

        case ActionTypes.UPDATE_INTERVENTION_REQ:
            nextState = {
                ...state,
                isLoading:true,
            }
            return nextState || state;

        case ActionTypes.UPDATE_INTERVENTION_OK:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.UPDATE_INTERVENTION_ERR:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.DELETE_INTERVENTION_REQ:
            nextState = {
                ...state,
                isLoading:true,
            }
            return nextState || state;

        case ActionTypes.DELETE_INTERVENTION_OK:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.DELETE_INTERVENTION_ERR:
            nextState = {
                ...state,
                isLoading:false,
            }
            return nextState || state;

        case ActionTypes.RESET_INTERVENTION_REDUCER:
            nextState = initialState
            return nextState || state;

        default:
            return state;
    }
}