import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";

import { GET_LAST_PERFORMANCES_DATA, GET_LAST_POSITIONS_DATA, GET_ORDERS_DATA } from "../../constants/actionTypes";
import { extractLastPerformancesData, extractLastPositionsData, extractOrderData } from "../../helpers/loops";
import store from "../store";
import { getLastPerformancesDataAPISuccess, getLastPerformancesDataFailed, getLastPerformancesDataSuccess, getLastPositionDataAPISuccess, getLastPositionDataFailed, getLastPositionDataSuccess, getOrdersDataFailed, getOrdersDataSuccess } from "./actions";
import { getLastPerformancesDataService, getLastPositionsDataService, getOrdersDataService } from "./service";

function* getOrdersDataSaga({ payload: { portfolioId } }) {
  try {
    const response = yield call(getOrdersDataService, portfolioId);

    yield put(
      getOrdersDataSuccess(
        extractOrderData(
          response,
          store?.store?.getState().FinEdge.initialData.assets,
          store?.store?.getState().FinEdge.initialData.asset_classes
        )
      )
    );
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
    yield put(getOrdersDataFailed(message));
  }
}

function* getLastPerformancesDataSaga({ payload: { assetId } }) {
  try {
    let response = yield call(getLastPerformancesDataService, assetId);
    yield put(getLastPerformancesDataAPISuccess(response));
    response = response.map((r) => {
      const asset = store?.store
        ?.getState()
        .FinEdge.initialData.assets?.find((a) => a.id === r.asset_id);
      const asset_classes = store?.store
        ?.getState()
        .FinEdge.initialData.asset_classes?.find(
          (a) => a.id === asset.asset_class_id
        );
      r.asset = asset;
      r.asset_classes = asset_classes;
      return r;
    });

    yield put(
      getLastPerformancesDataSuccess(
        extractLastPerformancesData(
          response,
          store?.store?.getState().FinEdge.initialData.asset_classes
        )
      )
    );
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
    yield put(getLastPerformancesDataFailed(message));
  }
}

function* getLastPositionsDataSaga({ payload: { portfolioId } }) {
  try {
    let response = yield call(getLastPositionsDataService, portfolioId);

    yield put(getLastPositionDataAPISuccess(response));


    response = response.map((r) => {
      const asset = store?.store
        ?.getState()
        .FinEdge.initialData.assets?.find((a) => a.id === r.asset_id);
      const asset_classes = store?.store
        ?.getState()
        .FinEdge.initialData.asset_classes?.find(
          (a) => a.id === asset.asset_class_id
        );
      r.asset = asset;
      r.asset_classes = asset_classes;
      return r;
    });

    yield put(getLastPositionDataSuccess(response));
    yield put(
      getLastPositionDataSuccess(
        extractLastPositionsData(
          response,
          store?.store?.getState().FinEdge.initialData.asset_classes,
          store?.store?.getState().Wallet.lastPerformancesDataAPI,
        )
      )
    );
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
    yield put(getLastPositionDataFailed(message));
  }
}

export function* watchGetLastPositionsDataSaga() {
  yield takeEvery(GET_LAST_POSITIONS_DATA, getLastPositionsDataSaga);
}

export function* watchGetOrdersDataSaga() {
  yield takeEvery(GET_ORDERS_DATA, getOrdersDataSaga);
}

export function* watchGetLastPerformancesDataSaga() {
  yield takeEvery(GET_LAST_PERFORMANCES_DATA, getLastPerformancesDataSaga);
}

function* WalletSaga() {
  yield all([
    fork(watchGetOrdersDataSaga),
    fork(watchGetLastPerformancesDataSaga),
    fork(watchGetLastPositionsDataSaga),
  ]);
}

export default WalletSaga;
