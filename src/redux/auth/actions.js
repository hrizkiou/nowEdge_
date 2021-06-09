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
    UPDATE_USER_FAILED,
    UPDATE_USER_SUCCESS,
    CLEAR_ERROR
} from '../../constants/actionTypes';


export const loginUser = (username , password, rememberMe) => ({
    type: LOGIN_USER,
    payload: { username, password, rememberMe}
});

export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
});

export const loginUserFailed = (error) => ({
    type: LOGIN_USER_FAILED,
    payload: error
});

export const registerUser = (fullName, email, password, role , username, firstName, lastName, avatarPath) => ({
    type: REGISTER_USER,
    payload: { fullName, email, password, role, username, firstName, lastName, avatarPath }
});

export const registerUserSuccess = (user) => ({
    type: REGISTER_USER_SUCCESS,
    payload: user
});

export const registerUserFailed = (error) => ({
    type: REGISTER_USER_FAILED,
    payload: error
});

export const logoutUser = (history) => ({
    type: LOGOUT_USER,
    payload: { history }
});

export const forgetPassword = (username) => ({
    type: FORGET_PASSWORD,
    payload: { username }
});

export const forgetPasswordSuccess = (passwordResetStatus) => ({
    type: FORGET_PASSWORD_SUCCESS,
    payload: passwordResetStatus
});

export const forgetPasswordFailed = (error) => ({
    type: FORGET_PASSWORD_FAILED,
    payload: error
});


export const updateUser = (user) =>({
    type: UPDATE_USER,
    payload: {user}
})

export const updateUserSuccess = (user) =>({
    type: UPDATE_USER_SUCCESS,
    payload: user
})

export const updateUserFailed = (error) =>({
    type: UPDATE_USER_FAILED,
    payload: error
})

export const clearError = () =>({
    type: CLEAR_ERROR,
    payload: {}
})