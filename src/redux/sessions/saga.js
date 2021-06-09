import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { ADD_SESSION_MODULE, ARCHIVE_SESSION_MODULE, DELETE_SESSION_MODULE, EDIT_SESSION_MODULE, GET_SESSIONS_MODULE_BY_ID } from "../../constants/actionTypes";
import { getAllConfiguration } from "../configuration/actions";
import { addSessionModuleFailed, addSessionModuleSuccess, archiveSessionModuleFailed, archiveSessionModuleSuccess, deleteSessionModuleFailed, deleteSessionModuleSuccess, editSessionModuleFailed, editSessionModuleSuccess, getSessionsModuleByIDFailed, getSessionsModuleByIDSuccess } from "./actions";
import { addSessionModuleService, archiveSessionModuleService, deleteSessionModuleService, editSessionModuleService, getSessionsModuleByIDService } from "./service";

function* getSessionsModuleByID({ payload: { moduleInstanceId } }) {
  try {
    //console.log("jjjjjjjjjjjjjjjjj", moduleInstanceId);
    const response = yield call(getSessionsModuleByIDService, moduleInstanceId);
    //console.log("response", response);
    yield put(getAllConfiguration(moduleInstanceId));

    yield put(getSessionsModuleByIDSuccess(response));
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
    yield put(getSessionsModuleByIDFailed(message));
  }
}

function* addSessionModule({
  payload: { moduleInstanceId, trainingSessionName, startDate, endDate },
}) {
  try {
    //console.log("jjjjjjjjjjjjjjjjj", {
    //   moduleInstanceId,
    //   trainingSessionName,
    //   startDate,
    //   endDate,
    // });

    const response = yield call(addSessionModuleService, {
      moduleInstanceId,
      trainingSessionName,
      startDate,
      endDate,
    });
    //console.log("response", response);

    yield put(addSessionModuleSuccess(response));
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
    yield put(addSessionModuleFailed(message));
  }
}

function* deleteSessionModule({ payload: { trainingSessionId } }) {
  try {
    //console.log("jjjjjjjjjjjjjjjjj", {
    //   trainingSessionId,s
    // });

    const response = yield call(deleteSessionModuleService, {
      trainingSessionId,
    });
    //console.log("response", response);

    yield put(deleteSessionModuleSuccess(trainingSessionId));
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
    yield put(deleteSessionModuleFailed(message));
  }
}

function* archiveSessionModule({ payload: { trainingSessionId } }) {
  try {
    //console.log("jjjjjjjjjjjjjjjjj", {
    //   trainingSessionId,
    // });

    const response = yield call(archiveSessionModuleService, {
      trainingSessionId,
    });
    //console.log("response", response);

    yield put(archiveSessionModuleSuccess(trainingSessionId));
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
    yield put(archiveSessionModuleFailed(message));
  }
}

function* editSessionModule({ payload: {  trainingSessionId,
  moduleInstanceId,
  trainingSessionName,
  startDate,
  endDate } }) {
  try {
    //console.log("jjjjjjjjjjjjjjjjj", {
    //   trainingSessionId,
    // });

    const response = yield call(editSessionModuleService, {
      trainingSessionId,
      moduleInstanceId,
      trainingSessionName,
      startDate,
      endDate
    });
    //console.log("response", response);

    yield put(editSessionModuleSuccess(response));
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
    yield put(editSessionModuleFailed(message));
  }
}

export function* watchDeleteSessionModule() {
  yield takeEvery(DELETE_SESSION_MODULE, deleteSessionModule);
}

export function* watchEditSessionModule() {
  yield takeEvery(EDIT_SESSION_MODULE, editSessionModule);
}

export function* watchAddSessionModule() {
  yield takeEvery(ADD_SESSION_MODULE, addSessionModule);
}

export function* watchGetSessionsModuleByID() {
  yield takeEvery(GET_SESSIONS_MODULE_BY_ID, getSessionsModuleByID);
}

export function* watchArchiveSessionModule() {
  yield takeEvery(ARCHIVE_SESSION_MODULE, archiveSessionModule);
}

function* SessionSaga() {
  yield all([
    fork(watchGetSessionsModuleByID), 
    fork(watchAddSessionModule),
    fork(watchDeleteSessionModule),
    fork(watchEditSessionModule),
    fork(watchArchiveSessionModule),
  ]);
}

export default SessionSaga;
