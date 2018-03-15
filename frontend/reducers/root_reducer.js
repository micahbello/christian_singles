import { combineReducers } from 'redux';
import errorsReducer from './errors_reducer';
import sessionReducer from './session_reducer';
import uiReducer from './ui_reducer';
import usersReducer from './users_reducer';

const rootReducer = combineReducers({
    users: usersReducer,
    session: sessionReducer,
    errors: errorsReducer,
    ui: uiReducer
});

export default rootReducer;
