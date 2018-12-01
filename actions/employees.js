import ActionTypes from '../Store/actionTypes';

import { showFlashMessage } from './utils';

import SERVER_URL from '../config/config'

export const get_all_employees_REQ = () => (
    {
        type: ActionTypes.GET_ALL_EMPLOYEES_REQ,
    }
);

export const get_all_employees_OK = (list) => (
    {
        type: ActionTypes.GET_ALL_EMPLOYEES_OK,
        list: list
    }
);

export const get_all_employees_ERR = () => (
    {
        type: ActionTypes.GET_ALL_EMPLOYEES_ERR,
    }
);

export const get_employee_by_id_REQ = () => (
    {
        type: ActionTypes.GET_EMPLOYEE_BY_ID_REQ,
    }
);

export const get_employee_by_id_OK = (employee) => (
    {
        type: ActionTypes.GET_EMPLOYEE_BY_ID_OK,
        current: employee
    }
);

export const get_employee_by_id_ERR = () => (
    {
        type: ActionTypes.GET_EMPLOYEE_BY_ID_ERR,
    }
);

export const set_current_employee = (employee) => (
    {
        type: ActionTypes.SET_CURRENT_EMPLOYEE,
        current: employee
    }
);

export const update_employee_REQ = () => (
    {
        type: ActionTypes.UPDATE_EMPLOYEE_REQ,
    }
);

export const update_employee_OK = () => (
    {
        type: ActionTypes.UPDATE_EMPLOYEE_OK,
    }
);

export const update_employee_ERR = () => (
    {
        type: ActionTypes.UPDATE_EMPLOYEE_ERR,
    }
);

export const reset_employee_reducer = () => (
    {
        type: ActionTypes.RESET_EMPLOYEE_REDUCER
    }
);


// functions
export const getAllEmployees = () => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.employees.isLoading){
            dispatch(get_all_employees_REQ());

            fetch(
                SERVER_URL+'api/employees',
                {
                    headers:{'Authorization':state.auth.token}
                }
            ).then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                dispatch(get_all_employees_OK(responseData._embedded.employees))
            })
            .catch((error) => {
                dispatch(get_all_employees_ERR());
            });
        }
    }
}

export const getEmployeeById = (link) => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.employees.isLoading){
            dispatch(get_employee_by_id_REQ());

            fetch(
                link,
                {
                    headers:{'Authorization':state.auth.token}
                }
            ).then(response => response.json())
            .then(responseData => {
                dispatch(get_employee_by_id_OK(responseData))
            })
            .catch((error) => {
                console.log(error)
                dispatch(get_employee_by_id_ERR());
            });
        }
    }
}

export const setCurrentEmployee = (employee) => {
    return async(dispatch, getState) => {
        dispatch(set_current_employee(employee));
    }
}

export const updateEmployee = (link, employee) => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.employees.isLoading){
            dispatch(update_employee_REQ());

            fetch(
                link,
                {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization':state.auth.token,
                        'Content-Type':'application/json'
                    }),
                    body: JSON.stringify(employee)
                }
            ).then(response => {
                if(response.ok){
                    dispatch(update_employee_OK());
                    dispatch(getAllEmployees());
                    showFlashMessage('Success', 'Your profile has successfully been updated. Please log in again to have your modifications.', 'success');
                }else{
                    dispatch(update_employee_ERR());
                    showFlashMessage('Error', 'Impossible to update your profile.', 'danger');
                }
            })
            .catch((error) => {
                dispatch(update_employee_ERR());
                showFlashMessage('Error', 'Impossible to update your profile.', 'danger');
            });
        }
    }
}

export const resetEmployeeReducer = () => {
    return async(dispatch, getState) => {
        dispatch(reset_employee_reducer());
    }    
}