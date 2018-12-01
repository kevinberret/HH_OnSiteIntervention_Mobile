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

export const reset_current_intervention = () => (
    {
        type: ActionTypes.RESET_CURRENT_INTERVENTION        
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

export const reset_intervention_reducer = () => (
    {
        type: ActionTypes.RESET_INTERVENTION_REDUCER
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
                console.log(responseData)
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
                dispatch(get_intervention_by_id_OK(responseData))
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

export const resetCurrentIntervention = () => {
    return async(dispatch, getState) => {
        dispatch(reset_current_intervention());
    }
}

export const createIntervention = (intervention) => {
    return async(dispatch, getState) => {
        const state = getState();
        const employeeId = state.auth.user.id;

        if(!state.interventions.isLoading){
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
                if(response.ok){
                    dispatch(create_intervention_OK());
                    dispatch(getAllInterventions(employeeId));
                    showFlashMessage('Success', 'Creation of the intervention successfull.', 'success');
                }else{
                    dispatch(create_intervention_ERR());
                    showFlashMessage('Error', 'Impossible to create the intervention.', 'danger');
                }
            })
            .catch((error) => {
                dispatch(create_intervention_ERR());
                showFlashMessage('Error', 'Impossible to create the intervention.', 'danger');
            });
        }
    }
}

export const updateIntervention = (link, intervention) => {
    return async(dispatch, getState) => {
        const state = getState();
        const employeeId = state.auth.user.id;

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
                    dispatch(getAllInterventions(employeeId));
                    showFlashMessage('Success', 'Intervention successfully updated.', 'success');                    
                }else{
                    dispatch(update_intervention_ERR());
                    showFlashMessage('Error', 'Impossible to update the intervention.', 'danger');
                }
            })
            .catch((error) => {
                dispatch(update_intervention_ERR());
                showFlashMessage('Error', 'Impossible to update the intervention.', 'danger');
            });
        }
    }
}

export const toggleInterventionStatus = (link, intervention) => {
    return async(dispatch, getState) => {
        const state = getState();
        const employeeId = state.auth.user.id;
        intervention.done = !intervention.done;

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
                    dispatch(getAllInterventions(employeeId));
                    showFlashMessage('Success', 'Intervention successfully updated.', 'success');                    
                }else{
                    dispatch(update_intervention_ERR());
                    showFlashMessage('Error', 'Impossible to update the intervention.', 'danger');
                }
            })
            .catch((error) => {
                dispatch(update_intervention_ERR());
                showFlashMessage('Error', 'Impossible to update the intervention.', 'danger');
            });
        }
    }
}

export const deleteIntervention = (link) => {
    return async(dispatch, getState) => {
        const state = getState();
        const employeeId = state.auth.user.id;

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
                    dispatch(getAllInterventions(employeeId));
                    showFlashMessage('Success', 'Intervention successfully deleted.', 'success');                    
                }else{
                    dispatch(delete_intervention_ERR());
                    showFlashMessage('Error', 'Impossible to delete the intervention.', 'danger');
                }
            })
            .catch((error) => {
                dispatch(delete_intervention_ERR());
                showFlashMessage('Error', 'Impossible to delete the intervention.', 'danger');
            });
        }
    }
}

export const resetInterventionReducer = () => {
    return async(dispatch, getState) => {
        dispatch(reset_intervention_reducer());
    }    
}