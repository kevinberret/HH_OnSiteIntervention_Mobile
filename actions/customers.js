import ActionTypes from '../Store/actionTypes';

import SERVER_URL from '../config/config'

export const get_all_customers_REQ = () => (
    {
        type: ActionTypes.GET_ALL_CUSTOMERS_REQ,
    }
);

export const get_all_customers_OK = (list) => (
    {
        type: ActionTypes.GET_ALL_CUSTOMERS_OK,
        list: list
    }
);

export const get_all_customers_ERR = () => (
    {
        type: ActionTypes.GET_ALL_CUSTOMERS_ERR,
    }
);

export const get_customer_by_id_REQ = () => (
    {
        type: ActionTypes.GET_CUSTOMER_BY_ID_REQ,
    }
);

export const get_customer_by_id_OK = (customer) => (
    {
        type: ActionTypes.GET_CUSTOMER_BY_ID_OK,
        current: customer
    }
);

export const get_customer_by_id_ERR = () => (
    {
        type: ActionTypes.GET_CUSTOMER_BY_ID_ERR,
    }
);

export const set_current_customer = (customer) => (
    {
        type: ActionTypes.SET_CURRENT_CUSTOMER,
        current: customer
    }
);

export const create_customer_REQ = () => (
    {
        type: ActionTypes.CREATE_CUSTOMER_REQ,
    }
);

export const create_customer_OK = (customer) => (
    {
        type: ActionTypes.CREATE_CUSTOMER_OK,
    }
);

export const create_customer_ERR = () => (
    {
        type: ActionTypes.CREATE_CUSTOMER_ERR,
    }
);

export const update_customer_REQ = () => (
    {
        type: ActionTypes.UPDATE_CUSTOMER_REQ,
    }
);

export const update_customer_OK = () => (
    {
        type: ActionTypes.UPDATE_CUSTOMER_OK,
    }
);

export const update_customer_ERR = () => (
    {
        type: ActionTypes.UPDATE_CUSTOMER_ERR,
    }
);

export const delete_customer_REQ = () => (
    {
        type: ActionTypes.DELETE_CUSTOMER_REQ,
    }
);

export const delete_customer_OK = () => (
    {
        type: ActionTypes.DELETE_CUSTOMER_OK,
    }
);

export const delete_customer_ERR = () => (
    {
        type: ActionTypes.DELETE_CUSTOMER_ERR,
    }
);

// functions
export const getAllCustomers = () => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.customers.isLoading){
            dispatch(get_all_customers_REQ());

            fetch(
                SERVER_URL+'api/customers',
                {
                    headers:{'Authorization':state.auth.token}
                }
            ).then(response => response.json())
            .then(responseData => {
                dispatch(get_all_customers_OK(responseData._embedded.customers))
            })
            .catch((error) => {
                dispatch(get_all_customers_ERR());
            });
        }
    }
}

export const getCustomerById = (link) => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.customers.isLoading){
            dispatch(get_customer_by_id_REQ());

            fetch(
                link,
                {
                    headers:{'Authorization':state.auth.token}
                }
            ).then(response => response.json())
            .then(responseData => {
                dispatch(get_customer_by_id_OK(responseData._embedded.customers))
            })
            .catch((error) => {
                dispatch(get_customer_by_id_ERR());
            });
        }
    }
}

export const setCurrentCustomer = (customer) => {
    return async(dispatch, getState) => {
        dispatch(set_current_customer(customer));
    }
}

export const createCustomer = (customer) => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.customers.isLoading){
            dispatch(create_customer_REQ());

            fetch(
                SERVER_URL + 'api/customers',
                {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization':state.auth.token,
                        'Content-Type':'application/json'
                    }),
                    body: JSON.stringify(customer)
                }
            ).then(response => {
                if(response.ok){
                    dispatch(create_customer_OK());
                    getAllCustomers();
                }else{
                    dispatch(create_customer_ERR());
                }
            })
            .catch((error) => {
                dispatch(create_customer_ERR());
            });
        }
    }
}

export const updateCustomer = (link, customer) => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.customers.isLoading){
            dispatch(update_customer_REQ());

            fetch(
                link,
                {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization':state.auth.token,
                        'Content-Type':'application/json'
                    }),
                    body: JSON.stringify(customer)
                }
            ).then(response => {
                if(response.ok){
                    dispatch(update_customer_OK());
                    getAllCustomers();
                }else{
                    dispatch(update_customer_ERR());
                }
            })
            .catch((error) => {
                dispatch(update_customer_ERR());
            });
        }
    }
}

export const deleteCustomer = (link) => {
    return async(dispatch, getState) => {
        const state = getState();

        if(!state.customers.isLoading){
            dispatch(delete_customer_REQ());

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
                    dispatch(delete_customer_OK());
                    getAllCustomers();
                }else{
                    dispatch(delete_customer_ERR());
                }
            })
            .catch((error) => {
                dispatch(delete_customer_ERR());
            });
        }
    }
}