import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  GET_CENTER_INFO,
  GET_SCORE,
  GET_SCORE_GLOBAL,
  GET_SCORE_GLOBAL_MODERATOR,
  UPDATE_CENTER_INFO,
} from "../../constants/actionTypes";

import { 
  getCenterInfoService, 
  getScoreService, 
  updateCenterInfoService,
  getScoreGlobalService,
  getScoreGlobalModeratorService
 } from "./service";
import {
  getCenterInfoSuccess,
  getCenterInfoFailed,
  updateCenterInfoSuccess,
  updateCenterInfoFailed,
  getscoreSuccess,
  getscoreFailed,
  getScoreGlobalSuccess,
  getScoreGlobalFailed,
  getScoreGlobalModeratorSuccess,
  getScoreGlobalModeratorFailed,
} from "./actions";

function* updateCenterInfoSaga({
  payload: { gameSessionId, name, avatarId, countryId, responsibilityId },
}) {
  try {
    const response = yield call(
      updateCenterInfoService,
      gameSessionId,
      name,
      avatarId,
      countryId,
      responsibilityId
    );
    yield put(updateCenterInfoSuccess(response));
  } catch (error) {
    //console.log("error ................", error);
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
    yield put(updateCenterInfoFailed(message));
  }
}

function* getCenterInfoSaga({ payload: { gameSessionId } }) {
  try {
    const response = yield call(getCenterInfoService, gameSessionId);
    yield put(getCenterInfoSuccess(response));
  } catch (error) {
    //console.log("error ................", error);
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
    yield put(getCenterInfoFailed(message));
  }
}

function* getScore({ payload: { centerId } }) {
  try {
    const response = yield call(getScoreService, centerId);
    yield put(getscoreSuccess(response));
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
    yield put(getscoreFailed(message));
  }
}

function* getScoreGlobalModerator({ payload: { gameSessionId } }) {
  try {
    const response = yield call(getScoreGlobalModeratorService, gameSessionId);
    yield put(getScoreGlobalModeratorSuccess(response));
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
    yield put(getScoreGlobalModeratorFailed(message));
  }
}

function* getScoreGlobal({ payload: { gameSessionId } }) {
  try {
    const response = yield call(getScoreGlobalService, gameSessionId);
    yield put(getScoreGlobalSuccess(response));
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
    yield put(getScoreGlobalFailed(message));
  }
}

export function* watchGetCenterInfoSaga() {
  yield takeEvery(GET_CENTER_INFO, getCenterInfoSaga);
}
export function* watchGetScore() {
  yield takeEvery(GET_SCORE, getScore);
}
export function* watchGetScoreGlobal() {
  yield takeEvery(GET_SCORE_GLOBAL, getScoreGlobal);
}
export function* watchGetScoreGlobalModerator() {
  yield takeEvery(GET_SCORE_GLOBAL_MODERATOR, getScoreGlobalModerator);
}
export function* watchUpdateCenterInfoSaga() {
  yield takeEvery(UPDATE_CENTER_INFO, updateCenterInfoSaga);
}

function* PvGameSaga() {
  yield all([fork(watchGetCenterInfoSaga), 
    fork(watchUpdateCenterInfoSaga),
    fork(watchGetScore),
    fork(watchGetScoreGlobal),
    fork(watchGetScoreGlobalModerator),

  ]);
}

export default PvGameSaga;
