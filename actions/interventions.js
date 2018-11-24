import ActionTypes from '../Store/actionTypes';

import SERVER_URL from '../config/config'

export const get_all_interventions_REQ = () => (
    {
        type: ActionTypes.GET_ALL_INTERVENTIONS_REQ,
    }
);

export const get_all_interventions_OK = (list) => (
    {
        type: ActionTypes.GET_ALL_INTERVENTIONS_OK,
        list: list
    }
);

export const get_all_interventions_ERR = () => (
    {
        type: ActionTypes.GET_ALL_INTERVENTIONS_ERR,
    }
);

// functions
export const getAllInterventions = () => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.interventions.isLoading){
            dispatch(get_all_interventions_REQ());

            fetch(
                SERVER_URL+'api/interventions',
                {
                    headers:{'Authorization':state.auth.token}
                }
            ).then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                dispatch(get_all_interventions_OK(responseData._embedded.interventions))
            })
            .catch((error) => {
                dispatch(get_all_interventions_ERR());
            });
        }
    }
}