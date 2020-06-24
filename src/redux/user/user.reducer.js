import {LOGIN_USER_FAIL, LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGOUT_USER} from './user.types';

const initialState = {
    user   : null,
    loading: false,
    error  : null
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_START:
            return {
                ...state,
                error  : null,
                loading: true
            };
        case LOGIN_USER_FAIL:
            return {
                ...state,
                user   : null,
                error  : action.error,
                loading: false
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user   : action.user
            };
        case LOGOUT_USER:
            return {
                ...state,
                user   : null,
                error  : null,
                loading: false
            };
        default:
            return state;
    }
};
export default user;
