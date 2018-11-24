import ActionTypes from '../actionTypes';

const initialState = {
    isLoading:false,
    list:[]    
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

        default:
            return state;
    }
}