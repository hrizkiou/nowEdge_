import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  ADD_ORDER,
  GET_GLOBAL_RISK,
  GET_GLOBAL_STATISTIC,
  GET_INDICATORS,
  GET_INITIAL_DATA,
  GET_RANKINGS,
} from "../../constants/actionTypes";

import {
  addOrderService,
  getGlobalRiskViewService,
  getGlobalStatisticService,
  getInitialDataService,
  getLastPortfolioIndicatorsDataService,
  getRankingsService,
} from "./service";
import {
  getInitialDataSuccess,
  getInitialDataFailed,
  getRankingsSuccess,
  getRankingsFailed,
  addOrderSuccess,
  addOrderFailed,
  getPortfolioIndicatorsFailed,
  getPortfolioIndicatorsSuccess,
  getGlobalRiskViewSuccess,
  getGlobalRiskViewFailed,
  setVariationVolatilityAndBeta,
  setVolatilityValueRiskData,
  setBetaValueRiskData,
  getAnalyseRisk,
  getGlobalStatisticViewSuccess,
  getGlobalStatisticViewFailed,
  setAssetClassConcentrationData,
  setAssetConcentrationData,
  setSectorConcentrationData,
  setRankingChartData,
  setYieldsAndPerfsData,
  setComparisonPtfBenchChart,
  setComparisonYieldChart
} from "./actions";
import store from "../store";
import {
  extractBetaValueRiskData,
  extractHistoricalVolatilityAndBetaData,
  extractLastPositionsData,
  extractVolatilityValueRiskData,
  extractAssetClassConcentrationData,
  extractAssetConcentrationData,
  extractSectorConcentrationData,
  extractRankingChart,
  extractAnalyseRiskData,
  extractYieldsAndPerfsData,
  extractComparisonPtfBenchChart,
  extractComparisonYieldChart
} from "../../helpers/loops";

function* getInitialDataSaga({ payload: { gameSessionId } }) {
  try {
    const response = yield call(getInitialDataService, gameSessionId);
    yield put(getInitialDataSuccess(response));
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
    yield put(getInitialDataFailed(message));
  }
}

function* getRankingsSaga({ payload: { gameSessionId } }) {
  try {
    const response = yield call(getRankingsService, gameSessionId);

    yield put(
      setRankingChartData(extractRankingChart(response))
    );
    yield put(getRankingsSuccess(response.sort((a, b)=> a.ranking > b.ranking ? 1 : -1)));

  } catch (error) {
    // console.log("error ................", error);
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
    yield put(getRankingsFailed(error));
  }
}

function* addOrderSaga({
  payload: {
    portfolio_id,
    asset_id,
    direction,
    quantity,
    order_type,
    price,
    callback,
  },
}) {
  try {
    const response = yield call(addOrderService, {
      portfolio_id,
      asset_id,
      direction,
      quantity,
      order_type,
      price,
    });
    yield put(addOrderSuccess(response));
    callback();
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
    yield put(addOrderFailed(message));
  }
}

function* getLastPortfolioIndicatorsSaga({ payload: { portfolioId } }) {
  try {
    let response = yield call(
      getLastPortfolioIndicatorsDataService,
      portfolioId
    );

    yield put(getPortfolioIndicatorsSuccess(response));
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
    yield put(getPortfolioIndicatorsFailed(message));
  }
}

function* getGlobalStatisticDataSaga({ payload: { portfolioId } }) {
  try {
    let response = yield call(getGlobalStatisticService, portfolioId);


    yield put(
      setAssetClassConcentrationData(
        extractAssetClassConcentrationData(response.asset_class_concentration, store?.store?.getState().FinEdge.initialData.asset_classes,)
      )
    );
    yield put(
      setAssetConcentrationData(
        extractAssetConcentrationData(response.asset_concentration, store?.store?.getState().FinEdge.initialData.assets,)
      )
    );
    yield put(
      setSectorConcentrationData(
        extractSectorConcentrationData(response.sector_concentration)
      )
    );

    yield put(
      setYieldsAndPerfsData(
        extractYieldsAndPerfsData(response.yields_and_perfs)
      )
    );

    yield put(
      setComparisonPtfBenchChart(
        extractComparisonPtfBenchChart(response.yields_and_perfs)
      )
    );

    yield put(
      setComparisonYieldChart(
        extractComparisonYieldChart(response.yields_and_perfs)
      )
    );



    yield put(getGlobalStatisticViewSuccess(response));
  } catch (error) {
    console.log("error ................", error);
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
    yield put(getGlobalStatisticViewFailed(message));
  }
}

function* getGlobalRiskDataSaga({ payload: { portfolioId } }) {
  try {
    let response = yield call(getGlobalRiskViewService, portfolioId);

    yield put(getGlobalRiskViewSuccess(response));

    // yield put(getGlobalRiskViewSuccess(response));

    yield put(
      setVariationVolatilityAndBeta(
        extractHistoricalVolatilityAndBetaData(
          response.historical_volatility_and_beta
        )
      )
    );
    yield put(
      setBetaValueRiskData(
        extractBetaValueRiskData(response.historical_volatility_and_beta)
      )
    );
    yield put(
      setVolatilityValueRiskData(
        extractVolatilityValueRiskData(response.historical_volatility_and_beta)
      )
    );

    const last_positions = response.last_positions.map((r) => {
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
      getAnalyseRisk(
        extractAnalyseRiskData(
          last_positions,
          store?.store?.getState().FinEdge.initialData.asset_classes,
          store?.store?.getState().Wallet.lastPerformancesDataAPI
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
    yield put(getGlobalRiskViewFailed(message));
  }
}

export function* watchGetGlobalStatisticDataSaga() {
  yield takeEvery(GET_GLOBAL_STATISTIC, getGlobalStatisticDataSaga);
}

export function* watchGetGlobalRiskDataSaga() {
  yield takeEvery(GET_GLOBAL_RISK, getGlobalRiskDataSaga);
}

export function* watchGetLastPortfolioIndicatorsSaga() {
  yield takeEvery(GET_INDICATORS, getLastPortfolioIndicatorsSaga);
}

export function* watchGetInitialDataSaga() {
  yield takeEvery(GET_INITIAL_DATA, getInitialDataSaga);
}

export function* watchAddOrderSaga() {
  yield takeEvery(ADD_ORDER, addOrderSaga);
}

export function* watchGetRankingsSaga() {
  yield takeEvery(GET_RANKINGS, getRankingsSaga);
}

function* FinEdgeSaga() {
  yield all([
    fork(watchGetInitialDataSaga),
    fork(watchGetRankingsSaga),
    fork(watchAddOrderSaga),
    fork(watchGetLastPortfolioIndicatorsSaga),
    fork(watchGetGlobalRiskDataSaga),
    fork(watchGetGlobalStatisticDataSaga),
  ]);
}

export default FinEdgeSaga;
