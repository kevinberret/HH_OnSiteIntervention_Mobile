import ActionTypes from '../Store/actionTypes';

import SERVER_URL from '../config/config';

import { showFlashMessage } from './utils';

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

export const get_intervention_by_id_REQ = () => (
    {
        type: ActionTypes.GET_INTERVENTION_BY_ID_REQ,
    }
);

export const get_intervention_by_id_OK = (intervention) => (
    {
        type: ActionTypes.GET_INTERVENTION_BY_ID_OK,
        current: intervention
    }
);

export const get_intervention_by_id_ERR = () => (
    {
        type: ActionTypes.GET_INTERVENTION_BY_ID_ERR,
    }
);

export const set_current_intervention = (intervention) => (
    {
        type: ActionTypes.SET_CURRENT_INTERVENTION,
        current: intervention
    }
);

export const create_intervention_REQ = () => (
    {
        type: ActionTypes.CREATE_INTERVENTION_REQ,
    }
);

export const create_intervention_OK = () => (
    {
        type: ActionTypes.CREATE_INTERVENTION_OK,
    }
);

export const create_intervention_ERR = () => (
    {
        type: ActionTypes.CREATE_INTERVENTION_ERR,
    }
);

export const update_intervention_REQ = () => (
    {
        type: ActionTypes.UPDATE_INTERVENTION_REQ,
    }
);

export const update_intervention_OK = () => (
    {
        type: ActionTypes.UPDATE_INTERVENTION_OK,
    }
);

export const update_intervention_ERR = () => (
    {
        type: ActionTypes.UPDATE_INTERVENTION_ERR,
    }
);

export const delete_intervention_REQ = () => (
    {
        type: ActionTypes.DELETE_INTERVENTION_REQ,
    }
);

export const delete_intervention_OK = () => (
    {
        type: ActionTypes.DELETE_INTERVENTION_OK,
    }
);

export const delete_intervention_ERR = () => (
    {
        type: ActionTypes.DELETE_INTERVENTION_ERR,
    }
);

// functions
export const getAllInterventions = (employeeId) => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.interventions.isLoading){
            dispatch(get_all_interventions_REQ());
            
            fetch(
                SERVER_URL+`api/employees/${employeeId}/interventions`,
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

export const getInterventionById = (link) => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.interventions.isLoading){
            dispatch(get_intervention_by_id_REQ());

            fetch(
                link,
                {
                    headers:{'Authorization':state.auth.token}
                }
            ).then(response => response.json())
            .then(responseData => {
                dispatch(get_intervention_by_id_OK(responseData._embedded.interventions))
            })
            .catch((error) => {
                dispatch(get_intervention_by_id_ERR());
            });
        }
    }
}

export const setCurrentIntervention = (intervention) => {
    return async(dispatch, getState) => {
        dispatch(set_current_intervention(intervention));
    }
}

export const createIntervention = (intervention) => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.interventions.isLoading){
            console.log(intervention);
            dispatch(create_intervention_REQ());

            fetch(
                SERVER_URL + 'api/interventions',
                {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': state.auth.token,
                        'Content-Type':'application/json'
                    }),
                    body: JSON.stringify(intervention)
                }
            ).then(response => {
                console.log(response);
                if(response.ok){
                    dispatch(create_intervention_OK());
                    getAllInterventions();
                }else{
                    dispatch(create_intervention_ERR());
                }
            })
            .catch((error) => {
                dispatch(create_intervention_ERR());
            });
        }
    }
}

export const updateIntervention = (link, intervention) => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.interventions.isLoading){
            dispatch(update_intervention_REQ());

            fetch(
                link,
                {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization':state.auth.token,
                        'Content-Type':'application/json'
                    }),
                    body: JSON.stringify(intervention)
                }
            ).then(response => {
                if(response.ok){
                    dispatch(update_intervention_OK());
                    showFlashMessage('Success', 'Intervention successfully updated.', 'success');
                    getAllInterventions();
                }else{
                    dispatch(update_intervention_ERR());
                }
            })
            .catch((error) => {
                dispatch(update_intervention_ERR());
            });
        }
    }
}

export const deleteIntervention = (link) => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.interventions.isLoading){
            dispatch(delete_intervention_REQ());

            fetch(
                link,
                {
                    method: 'DELETE',
                    headers: new Headers({
                        'Authorization':state.auth.token,
                    })
                }
            ).then(response => {
                if(response.ok){
                    dispatch(delete_intervention_OK());
                    showFlashMessage('Success', 'Intervention successfully deleted.', 'success');
                    getAllInterventions();
                }else{
                    dispatch(delete_intervention_ERR());
                }
            })
            .catch((error) => {
                dispatch(delete_intervention_ERR());
            });
        }
    }
}