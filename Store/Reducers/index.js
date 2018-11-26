import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './loginReducer';
import interventions from './interventionsReducer';
import customers from './customersReducer';
import employees from './employeesReducer';

const rootReducer = combineReducers({
    auth,
    interventions,
    customers,
    employees,

    form: formReducer,
})

export default rootReducer;