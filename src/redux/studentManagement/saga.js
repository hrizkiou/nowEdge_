import {all, call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';

import {
  GET_PARTICIPANTS_MODERATOR,
  CHANGE_STATUS_PARTICIPANT_MODERATOR,
  GET_QUIZ_STATISTICS_MODERATOR,
  GET_TEAMS,
  ASSIGNMENT_TEAMS,
} from '../../constants/actionTypes';
import {
  getParticipantsService,
  changeStatusParticipantService,
  getQuizStatisticsService,
  getTeamsService,
  assignmentTeamsService,
} from './service';
import {
  getParticipantsSuccess,
  getParticipantsFailed,
  changeStatusParticipantSuccess,
  changeStatusParticipantFailed,
  getQuizStatisticsSuccess,
  getQuizStatisticsFailed,
  getTeamsSuccess,
  getTeamsFailed,
  assignmentTeamsSuccess,
  assignmentTeamsFailed,
} from './actions';

function* getParticipants({payload: {trainingSessionId}}) {
  try {
    const response = yield call(getParticipantsService, trainingSessionId);
    //console.log('response', response);
    yield put(getParticipantsSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(getParticipantsFailed(message));
  }
}

function* getQuizStatistics({payload: {trainingSessionId}}) {
  try {
    const response = yield call(getQuizStatisticsService, trainingSessionId);
    //console.log('response', response);
    yield put(getQuizStatisticsSuccess(response));
  } catch (error) {
    yield put(getQuizStatisticsFailed(error));
  }
}

function* changeStatusParticipant({
  payload: {trainingSessionId, userId, status},
}) {
  try {
    const response = yield call(changeStatusParticipantService, {
      trainingSessionId,
      userId,
      status,
    });
    yield put(
      changeStatusParticipantSuccess({trainingSessionId, userId, status}),
    );
  } catch (error) {
    yield put(changeStatusParticipantFailed(error));
  }
}

function* getTeams({payload: {trainingSessionId}}) {
  try {
    const response = yield call(getTeamsService, trainingSessionId);
    yield put(getTeamsSuccess(response));
  } catch (error) {
    yield put(getTeamsFailed(error));
  }
}

function* assignmentTeams({payload: {listAssignment,callback}}) {
  try {
    const response = yield call(assignmentTeamsService, listAssignment);
    yield put(assignmentTeamsSuccess(response));
    callback();
  } catch (error) {
    //console.log('-----error-----',error);
    yield put(assignmentTeamsFailed(error));
  }
}

export function* watchGetParticipants() {
  yield takeEvery(GET_PARTICIPANTS_MODERATOR, getParticipants);
}

export function* watchGetQuizStatistics() {
  yield takeEvery(GET_QUIZ_STATISTICS_MODERATOR, getQuizStatistics);
}

export function* watchChangeStatusParticipant() {
  yield takeLatest(
    CHANGE_STATUS_PARTICIPANT_MODERATOR,
    changeStatusParticipant,
  );
}
export function* watchGetTimes() {
  yield takeLatest(GET_TEAMS, getTeams);
}

export function* watchAssignmentTeams() {
  yield takeLatest(ASSIGNMENT_TEAMS, assignmentTeams);
}

function* StudentManagementSaga() {
  yield all([
    fork(watchGetParticipants),
    fork(watchChangeStatusParticipant),
    fork(watchGetQuizStatistics),
    fork(watchGetTimes),
    fork(watchAssignmentTeams),
  ]);
}

export default StudentManagementSaga;
