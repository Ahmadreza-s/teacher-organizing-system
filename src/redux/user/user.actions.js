import {LOGIN_USER_FAIL, LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGOUT_USER} from './user.types';
import {loginRequest} from '../../apis/auth';

const loginStart = () => ({type: LOGIN_USER_START});
const loginFail = error => ({type: LOGIN_USER_FAIL, error});
const loginSuccess = user => ({type: LOGIN_USER_SUCCESS, user});

export const login = (code_personeli, password) => async dispatch => {
    dispatch(loginStart());
    try {
        const response = await loginRequest(code_personeli, password);
        dispatch(loginSuccess(response.data));
    } catch (e) {
        dispatch(loginFail('اطلاعات وارد شده، اشتباه است.'));
    }
};
export const logout = () => {
    localStorage.clear();
    return {type: LOGOUT_USER};
};
