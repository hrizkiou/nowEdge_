import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  GET_NOTIONS_MODULE_BY_ID,
  ADD_NOTIONS_MODULE,
  EDIT_NOTIONS_MODULE,
  DELETE_NOTIONS_MODULE,
  ORDER_NOTIONS_MODULE,
} from "../../constants/actionTypes";
import {
  getNotionsModuleByIDService,
  addNotionsModuleService,
  editNotionsModuleService,
  deleteNotionsModuleService,
  orderNotionsModuleService,
} from "./service";
import {
  getNotionsModuleByIDSuccess,
  addNotionsModuleSuccess,
  getNotionsModuleByIDFailed,
  addNotionsModuleFailed,
  editNotionsModuleSuccess,
  editNotionsModuleFailed,
  deleteNotionsModuleSuccess,
  deleteNotionsModuleFailed,
  orderNotionsModuleSuccess,
  orderNotionsModuleFailed
} from "./actions";

function* getNotionsModuleByID({ payload: { moduleInstanceId } }) {
  try {
    //console.log("jjjjjjjjjjjjjjjjj", moduleInstanceId);
    const response = yield call(getNotionsModuleByIDService, moduleInstanceId);
    //console.log("response", response);
    yield put(getNotionsModuleByIDSuccess(response));
  } catch (error) {
    yield put(getNotionsModuleByIDFailed(error));
  }
}

function* addNotionsModule({
  payload: { moduleInstanceId, notionOrder, title, content, mediaPath },
}) {
  try {
    const response = yield call(addNotionsModuleService, {
      moduleInstanceId,
      notionOrder,
      title,
      content,
      mediaPath,
    });
    //console.log("response", response);
    yield put(addNotionsModuleSuccess(response));
  } catch (error) {
    yield put(addNotionsModuleFailed(error));
  }
}

function* editNotionsModule({
  payload: {
    notionId,
    moduleInstanceId,
    notionOrder,
    title,
    content,
    mediaPath,
  },
}) {
  try {
    const response = yield call(editNotionsModuleService, {
      notionId,
      moduleInstanceId,
      notionOrder,
      title,
      content,
      mediaPath,
    });
    //console.log("response", response);
    yield put(editNotionsModuleSuccess(response));
  } catch (error) {
    yield put(editNotionsModuleFailed(error));
  }
}

function* deleteNotionsModule({ payload: { notionId } }) {
  try {
    yield call(deleteNotionsModuleService, notionId);
    yield put(deleteNotionsModuleSuccess(notionId));
  } catch (error) {
    yield put(deleteNotionsModuleFailed(error));
  }
}

function* orderNotionsModule({ payload: { moduleInstanceId, data } }) {
  try {
    const response = yield call(orderNotionsModuleService, moduleInstanceId, data);
    yield put(orderNotionsModuleSuccess(response));
  } catch (error) {
    yield put(orderNotionsModuleFailed(error));
  }
}

export function* watchOrderNotionsModule() {
  yield takeEvery(ORDER_NOTIONS_MODULE, orderNotionsModule);
}

export function* watchDeleteNotionsModule() {
  yield takeEvery(DELETE_NOTIONS_MODULE, deleteNotionsModule);
}

export function* watchEditNotionsModule() {
  yield takeEvery(EDIT_NOTIONS_MODULE, editNotionsModule);
}

export function* watchAddNotionsModule() {
  yield takeEvery(ADD_NOTIONS_MODULE, addNotionsModule);
}

export function* watchGetNotionsModuleByID() {
  yield takeEvery(GET_NOTIONS_MODULE_BY_ID, getNotionsModuleByID);
}

function* NotionSaga() {
  yield all([
    fork(watchGetNotionsModuleByID),
    fork(watchAddNotionsModule),
    fork(watchEditNotionsModule),
    fork(watchDeleteNotionsModule),
    fork(watchOrderNotionsModule),
  ]);
}

export default NotionSaga;
