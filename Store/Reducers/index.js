import { combineReducers } from 'redux'

import auth from './loginReducer';
import interventions from './interventionsReducer';

const rootReducer = combineReducers({
    auth,
    interventions
})

export default rootReducer