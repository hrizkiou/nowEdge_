// @flow
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILED,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    CLEAR_ERROR
} from '../../constants/actionTypes';

import { getLoggedInUser } from '../../helpers/authUtils';


const INIT_STATE = {
    user: getLoggedInUser(),
    loading: false
};


const Auth = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };
        case LOGIN_USER_FAILED:
            return { ...state, error: action.payload, loading: false };
        case REGISTER_USER:
            return { ...state, loading: true };
        case REGISTER_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };
        case REGISTER_USER_FAILED:
            return { ...state, error: action.payload, loading: false };
        case LOGOUT_USER:
            return { ...state, user: null };
        case FORGET_PASSWORD:
            return { ...state, loading: true };
        case FORGET_PASSWORD_SUCCESS:
            return { ...state, passwordResetStatus: true, loading: false, error: null };
        case FORGET_PASSWORD_FAILED:
            return { ...state, error: action.payload, loading: false };

        case UPDATE_USER:
            return { ...state, loading: true ,success:false};
        case UPDATE_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null ,success:true};
        case UPDATE_USER_FAILED:
            return { ...state, error: action.payload, loading: false };
        case CLEAR_ERROR:
            return { ...state ,error:null ,passwordResetStatus:null};   

        default: return { ...state };
    }
}

export default Auth;