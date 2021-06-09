import { all, call, fork, put, takeEvery, takeLatest} from "redux-saga/effects";

import {
  GET_MARKET_VIEWS_DATA,
  GET_HISTORICAL_DATA,
} from "../../constants/actionTypes";

import { getHistoricalDataService, getMarketViewsDataService } from "./service";
import {
  getMarketViewsDataSuccess,
  getMarketViewsDataFailed,
  setMarketViewsChartColumnData,
  setMarketViewsChartLineData,
  setMarketViewsPerformanceArray,
  getHistoricalDataSuccess,
  getHistoricalDataFailed,
  setHistoricalChartColumnData,
  setHistoricalChartLineData,
} from "./actions";
import {
  extractMarketHistoricalVolumeChart,
  extractMarketHistoricalPriceData,
  extractMarketViewsPerformanceArray,
  extractAssetHistoricalVolumeChart,
  extractAssetHistoricalPriceData,
} from "../../helpers/loops";
import store from "../store";

function* getMarketViewsDataSaga() {
  try {
    const response = yield call(getMarketViewsDataService);
    yield put(getMarketViewsDataSuccess(response));
    yield put(
      setMarketViewsChartColumnData(
        extractMarketHistoricalVolumeChart(response)
      )
    );
    yield put(
      setMarketViewsChartLineData(extractMarketHistoricalPriceData(response))
    );
    yield put(
      setMarketViewsPerformanceArray(
        extractMarketViewsPerformanceArray(
          response,
          store?.store?.getState().FinEdge.initialData.assets
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
    yield put(getMarketViewsDataFailed(message));
  }
}

function* getHistoricalDataSaga({ payload: { assetId } }) {
  try {
    const response = yield call(getHistoricalDataService, assetId);
    yield put(getHistoricalDataSuccess(response));
    yield put(
      setHistoricalChartColumnData(extractAssetHistoricalVolumeChart(response))
    );
    yield put(
      setHistoricalChartLineData(extractAssetHistoricalPriceData(response))
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
    yield put(getHistoricalDataFailed(message));
  }
}

export function* watchGetMarketViewsDataSaga() {
  yield takeEvery(GET_MARKET_VIEWS_DATA, getMarketViewsDataSaga);
}

export function* watchGetHistoricalDataSaga() {
  yield takeLatest(GET_HISTORICAL_DATA, getHistoricalDataSaga);
}

function* MarketViewsSaga() {
  yield all([fork(watchGetMarketViewsDataSaga)]);
  yield all([fork(watchGetHistoricalDataSaga)]);
}

export default MarketViewsSaga;
