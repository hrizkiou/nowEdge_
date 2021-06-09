import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  GET_ALL_CONFIGURATION,
  CREATE_CONFIGURATION,
  DELETE_CONFIGURATION,
  EDIT_CONFIGURATION,
  DUPLICATE_CONFIGURATION,
} from "../../constants/actionTypes";
import {
  getAllConfigurationService,
  createConfigurationService,
  deleteConfigurationService,
  editConfigurationService,
  duplicateConfigurationService,
} from "./service";
import {
  getAllConfigurationSuccess,
  getAllConfigurationFailed,
  createConfigurationSuccess,
  createConfigurationFailed,
  deleteConfigurationSuccess,
  deleteConfigurationFailed,
  editConfigurationSuccess,
  editConfigurationFailed,
  duplicateConfigurationFailed,
  duplicateConfigurationSuccess,
} from "./actions";

function* getAllConfiguration({ payload: { moduleAffectationId } }) {
  try {
    const response = yield call(
      getAllConfigurationService,
      moduleAffectationId
    );
    yield put(getAllConfigurationSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(getAllConfigurationFailed(message));
  }
}

function* createConfiguration({
  payload: { moduleAffectationId, moduleInstanceName },
}) {
  try {
    const response = yield call(createConfigurationService, {
      moduleAffectationId,
      moduleInstanceName,
    });
    yield put(createConfigurationSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(createConfigurationFailed(message));
  }
}

function* deleteConfiguration({ payload: { moduleInstanceId } }) {
  try {
    yield call(deleteConfigurationService, moduleInstanceId);
    yield put(deleteConfigurationSuccess(moduleInstanceId));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(deleteConfigurationFailed(message));
  }
}

function* editConfiguration({
  payload: { moduleInstanceId, moduleInstanceName },
}) {
  try {
    const response = yield call(editConfigurationService, {
      moduleInstanceId,
      moduleInstanceName,
    });
    yield put(editConfigurationSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(editConfigurationFailed(message));
  }
}

function* duplicateConfiguration({
  payload: { moduleInstanceId, moduleInstanceName, notions, quizzes, games },
}) {
  try {
    const response = yield call(duplicateConfigurationService, {
      moduleInstanceId,
      moduleInstanceName,
      notions,
      quizzes,
      games,
    });
    yield put(duplicateConfigurationSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(duplicateConfigurationFailed(message));
  }
}

export function* watchDuplicateConfigurations() {
  yield takeEvery(DUPLICATE_CONFIGURATION, duplicateConfiguration);
}

export function* watchEditConfigurations() {
  yield takeEvery(EDIT_CONFIGURATION, editConfiguration);
}

export function* watchGetAllConfigurations() {
  yield takeEvery(GET_ALL_CONFIGURATION, getAllConfiguration);
}

export function* watchCreateConfiguration() {
  yield takeEvery(CREATE_CONFIGURATION, createConfiguration);
}

export function* watchDeleteConfiguration() {
  yield takeEvery(DELETE_CONFIGURATION, deleteConfiguration);
}

function* ConfigurationSaga() {
  yield all([
    fork(watchEditConfigurations),
    fork(watchGetAllConfigurations),
    fork(watchCreateConfiguration),
    fork(watchDeleteConfiguration),
    fork(watchDuplicateConfigurations),
  ]);
}

export default ConfigurationSaga;
