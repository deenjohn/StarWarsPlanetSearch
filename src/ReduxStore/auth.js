import { combineReducers } from 'redux';
import {
    CHANGE_AUTH
} from '../Actions/actionTypes';

function authenticationReducer(state=false, action) {
    switch(action.type) {
        case CHANGE_AUTH:
            return action.payload
    }

    return state;
};

const rootReducer = combineReducers({
  authenticated: authenticationReducer
});

export default rootReducer;