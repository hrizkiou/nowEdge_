import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  GET_ALL_QUIZ,
  GET_QUIZ,
  SAVE_QUIZ,
  GET_ALL_QUIZ_MODERATOR,
  ADD_QUIZ_MODERATOR,
  DELETE_QUIZ_MODERATOR,
  EDIT_QUIZ_MODERATOR,
  ADD_QUESTION_QUIZ_MODERATOR,
  DELETE_QUESTION_QUIZ_MODERATOR,
  EDIT_QUESTION_QUIZ_MODERATOR
} from "../../constants/actionTypes";

import {
  getAllQuizFailed,
  getAllQuizSuccess,
  getQuizFailed,
  getQuizSuccess,
  getQuizzesModuleByIDSuccess,
  getQuizzesModuleByIDFailed,
  addQuizModuleByIDSuccess,
  addQuizModuleByIDFailed,
  deleteQuizModuleByIDSuccess,
  deleteQuizModuleByIDFailed,
  editQuizModuleByIDSuccess,
  editQuizModuleByIDFailed,
  addQuestionQuizModuleByIDSuccess,
  addQuestionQuizModuleByIDFailed,
  deleteQuestionQuizModuleByIDSuccess,
  deleteQuestionQuizModuleByIDFailed,
  editQuestionQuizModuleByIDSuccess,
  editQuestionQuizModuleByIDFailed,
  saveQuizSuccess,
  saveQuizFailed,
  // getAllQuiz as getAllQuiz_
} from "./actions";

import {
  getAllQuizService,
  getQuizService,
  saveQuizResultsService,
  getAllQuizModeratorService,
  addQuizModeratorService,
  deleteQuizModeratorService,
  editQuizModeratorService,
  addQuestionQuizModeratorService,
  deleteQuestionQuizModeratorService,
  editQuestionQuizModeratorService
} from "./service";

function* getAllQuiz({ payload: { trainingSessionId } }) {
  try {
    const response = yield call(getAllQuizService, trainingSessionId);
    yield put(getAllQuizSuccess(response));
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
    yield put(getAllQuizFailed(message));
  }
}

function* getQuiz({ payload: { quizCompetitionId, quizId } }) {
  try {
    const response = yield call(getQuizService, quizCompetitionId, quizId);
    yield put(getQuizSuccess(response));
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
    yield put(getQuizFailed(message));
  }
}

function* saveQuizResults({ payload: { results, trainingSessionId } }) {
  try {

    const response =   yield call(saveQuizResultsService, results);
    
    yield put(saveQuizSuccess(response));

  } catch (error) {

    yield put(saveQuizFailed(error));
    
  }
}

function* getQuizzesModuleModerator({ payload: { moduleInstanceId } }) {
  try {
    const response = yield call(getAllQuizModeratorService, moduleInstanceId);
    yield put(getQuizzesModuleByIDSuccess(response));
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
    yield put(getQuizzesModuleByIDFailed(message));
  }
}

function* addQuizModuleModerator({
  payload: { moduleInstanceId, name, estimatedTime },
}) {
  try {
    const response = yield call(addQuizModeratorService, {
      moduleInstanceId,
      name,
      estimatedTime,
    });
    yield put(addQuizModuleByIDSuccess(response));
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
    yield put(addQuizModuleByIDFailed(message));
  }
}

function* deleteQuizModuleModerator({ payload: { quizId } }) {
  try {
    yield call(deleteQuizModeratorService, {
      quizId,
    });
    yield put(deleteQuizModuleByIDSuccess(quizId));
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
    yield put(deleteQuizModuleByIDFailed(message));
  }
}

function* editQuizModuleModerator({
  payload: {
    id,
    name,
    estimatedTime,
    moduleInstanceId,
  },
}) {
  try {
    const response = yield call(editQuizModeratorService, {
      id,
      name,
      estimatedTime,
      moduleInstanceId,
    });
    yield put(editQuizModuleByIDSuccess(response));
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
    yield put(editQuizModuleByIDFailed(message));
  }
}

function* addQuestionQuizModuleModerator({
  payload:{
    title,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer,
    quizId,
  },
}) {
  try {
    const response = yield call(addQuestionQuizModeratorService, {
      title,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer,
      quizId,
    });
    yield put(addQuestionQuizModuleByIDSuccess(response));
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
    yield put(addQuestionQuizModuleByIDFailed(message));
  }
}


function* editQuestionQuizModuleModerator({
  payload:{
    questionId,
    title,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer,
    quizId,
  },
}) {
  try {
    const response = yield call(editQuestionQuizModeratorService, {
      questionId,
      title,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer,
      quizId,
    });
    yield put(editQuestionQuizModuleByIDSuccess(response));
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
    yield put(editQuestionQuizModuleByIDFailed(message));
  }
}

function* deleteQuestionQuizModuleModerator({
  payload:{
    quizId,
    moduleInstanceId,
    questionId
  },
}) {
  try {
    yield call(deleteQuestionQuizModeratorService, {
      moduleInstanceId,
      questionId
    });
    yield put(deleteQuestionQuizModuleByIDSuccess({quizId, questionId}));
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
    yield put(deleteQuestionQuizModuleByIDFailed(message));
  }
}



export function* watchGetQuiz() {
  yield takeEvery(GET_QUIZ, getQuiz);
}
export function* watchGetAllQuiz() {
  yield takeEvery(GET_ALL_QUIZ, getAllQuiz);
}
export function* watchSaveGuiz() {
  yield takeEvery(SAVE_QUIZ, saveQuizResults);
}
export function* watchGetAllQuizModerator() {
  yield takeEvery(GET_ALL_QUIZ_MODERATOR, getQuizzesModuleModerator);
}
export function* watchAddQuizModerator() {
  yield takeEvery(ADD_QUIZ_MODERATOR, addQuizModuleModerator);
}
export function* watchDeleteQuizModerator() {
  yield takeEvery(DELETE_QUIZ_MODERATOR, deleteQuizModuleModerator);
}
export function* watchEditQuizModerator() {
  yield takeEvery(EDIT_QUIZ_MODERATOR, editQuizModuleModerator);
}
export function* watchAddQuestionQuizModerator() {
  yield takeEvery(ADD_QUESTION_QUIZ_MODERATOR, addQuestionQuizModuleModerator);
}
export function* watchDeleteQuestionQuizModerator() {
  yield takeEvery(DELETE_QUESTION_QUIZ_MODERATOR, deleteQuestionQuizModuleModerator);
}

export function* watchEditQuestionQuizModerator() {
  yield takeEvery(EDIT_QUESTION_QUIZ_MODERATOR, editQuestionQuizModuleModerator);
}

function* quizSaga() {
  yield all([
    fork(watchGetAllQuiz),
    fork(watchGetQuiz),
    fork(watchSaveGuiz),
    fork(watchGetAllQuizModerator),
    fork(watchAddQuizModerator),
    fork(watchDeleteQuizModerator),
    fork(watchEditQuizModerator),
    fork(watchAddQuestionQuizModerator),
    fork(watchDeleteQuestionQuizModerator),
    fork(watchEditQuestionQuizModerator),
  ]);
}

export default quizSaga;
