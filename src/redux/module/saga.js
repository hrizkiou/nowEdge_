import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    GET_ALL_MODULES,
    GET_MODULE_BY_ID,
    GET_CONFIGURATIONS_MODULE_BY_ID,
    SUBSCRIBE_TO_TRAININGSESSION
} from '../../constants/actionTypes';


import {
    getAllModulesSuccess,
    getModuleByIDSuccess,
    getConfigurationsModuleByIDFailed,
    getModuleByIDFailed,
    getAllModulesFailed,
    getFields,
    getConfigurationsModuleByIDSuccess,
    subscribeToTrainingSessionSuccess,
    subscribeToTrainingSessionFailed,
} from './actions';

import { getAllModulesService, getModuleByIDService, getConfigurationModuleByIDService, subscribeToTrainingSessioService } from './service';


function* getAllModules({ payload:{participantUserId}}) {
   
    try {
        const response = yield call(getAllModulesService,participantUserId);
        yield put(getAllModulesSuccess(response));
        yield put(getFields());
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(getAllModulesFailed(message));
    }
}

function* getModuleByID({ payload: {module}}) {
  
    try {
        const response = yield call(getModuleByIDService,module.trainingSessionId,module.moduleInstanceId);
        //console.log('response', response)
        yield put(getModuleByIDSuccess(module,response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(getModuleByIDFailed(message));
    }
}


function* getConfigurationsModuleByID({ payload: {moduleInstanceId}}) {

    try {
        //console.log("jjjjjjjjjjjjjjjjj", moduleInstanceId);
        const response = yield call(getConfigurationModuleByIDService, moduleInstanceId);
        //console.log('response', response)
        yield put(getConfigurationsModuleByIDSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(getConfigurationsModuleByIDFailed(message));
    }
}

function* subscribeToTrainingSession({ payload: {code}}) {
    try {
        
        const response = yield call(subscribeToTrainingSessioService, code);
   
        yield put(subscribeToTrainingSessionSuccess(response));
    } catch (error) {
        let message;
        switch (error.status) {
            case 500: message = 'Internal Server Error'; break;
            case 401: message = 'Invalid credentials'; break;
            default: message = error;
        }
        yield put(subscribeToTrainingSessionFailed(message));
    }
}



export function* watchGetAllModules() {
    yield takeEvery(GET_ALL_MODULES, getAllModules);
}

export function* watchGetModuleByID() {
    yield takeEvery(GET_MODULE_BY_ID, getModuleByID);
}

export function* watchGetConfigurationsModuleByID() {
    yield takeEvery(GET_CONFIGURATIONS_MODULE_BY_ID, getConfigurationsModuleByID);
}

export function* watchSubscribeToTrainingSession() {
    yield takeEvery(SUBSCRIBE_TO_TRAININGSESSION, subscribeToTrainingSession);
}


function* moduleSaga() {
    yield all([
        fork(watchGetAllModules),
        fork(watchGetModuleByID),
        fork(watchGetConfigurationsModuleByID),
        fork(watchSubscribeToTrainingSession),
    ]);
}

export default moduleSaga;