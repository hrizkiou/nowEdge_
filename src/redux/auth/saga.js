import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    FORGET_PASSWORD,
    UPDATE_USER,
} from '../../constants/actionTypes';


import {
    loginUserSuccess,
    loginUserFailed,
    registerUserSuccess,
    registerUserFailed,
    forgetPasswordSuccess,
    forgetPasswordFailed,
    updateUserSuccess,
    updateUserFailed
} from './actions';

import { loginService, registerService, forgetPasswordService, UpdateUserService } from "./service";



/**
 * Sets the session
 * @param {*} user 
 */
const setSession = (user) => {
    let cookies = new Cookies();
    if (user)
        cookies.set("user", JSON.stringify(user), { path: "/" });
    else
        cookies.remove("user",{ path: "/" });
};

const setRememberMe = ({username, password}, rememberMe) => {
    if (rememberMe)
        localStorage.setItem('credentials', JSON.stringify({username, password})); 
    else
        localStorage.removeItem('credentials');
};
/**
 * Login the user
 * @param {*} payload - username and password 
 */
function* login({ payload: { username, password, rememberMe } }) {
    try {
        const response = yield call(loginService, username, password);
        //console.log('response', response)
         if(!response.isError){
            setSession(response);
            setRememberMe({ username, password }, rememberMe)  
            yield put(loginUserSuccess(response));
        } else {
            // eslint-disable-next-line no-throw-literal
            throw "loginIn.invalidCredential"
        }
        
        
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(loginUserFailed(message));
        setSession(null);
    }
}


/**
 * Logout the user
 * @param {*} param0 
 */
function* logout({ payload: { history } }) {
    try {
        setSession(null);
        setRememberMe({}, false);
        
        localStorage.removeItem("persist:root");
        yield call(() => {
            history.push("/login");
        });
    } catch (error) { }
}

/**
 * Register the user
 */
function* register({ payload: { fullName, email, password, role, username, firstName, lastName, avatarPath } }) {
    
    try {
        const response = yield call(registerService, email, password, role, username, firstName, lastName);
        //console.log('response', response)
        if(!response.isError){
            yield put(registerUserSuccess(response));
        }else {
            throw response.error.message
        }
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(registerUserFailed(message));
    }
}

/**
 * forget password
 */
function* forgetPassword({ payload: { username } }) {

    try {
        const response = yield call(forgetPasswordService,username );
        yield put(forgetPasswordSuccess(response.message));
    } catch (error) {
        //console.log('-------010-----',error);
        // let message;
        // switch (error.status) {
        //     case 500: message = 'Internal Server Error'; break;
        //     case 401: message = 'Invalid credentials'; break;
        //     default: message = error;
        // }
        yield put(forgetPasswordFailed({message:`User not found username : ${username}`}));
    }
}
/**
 * forget password 
 */
// eslint-disable-next-line require-yield
function* updateUser({ payload: { user } }) {
    try {
        const response = yield call(UpdateUserService,user);
        yield put(updateUserSuccess(response));
        setSession(response)
    } catch (error) {
        yield put(updateUserFailed(error));
    }
}


export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

export function* watchUpdateUser() {
    yield takeEvery(UPDATE_USER, updateUser);
}

function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
        fork(watchUpdateUser),
    ]);
}

export default authSaga;