import {
  GET_INITIAL_DATA,
  GET_INITIAL_DATA_SUCCESS,
  GET_INITIAL_DATA_FAILED,
  GET_RANKINGS,
  GET_RANKINGS_SUCCESS,
  GET_RANKINGS_FAILED,
  ADD_ORDER,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILED,
  GET_INDICATORS,
  GET_INDICATORS_SUCCESS,
  GET_INDICATORS_FAILED,
  GET_GLOBAL_RISK,
  GET_GLOBAL_RISK_SUCCESS,
  GET_GLOBAL_RISK_FAILED,
  SET_VARIATION_VOLATILITY_AND_BETA,
  SET_VOLATILITY_VALUE_RISK,
  SET_BETA_VALUE_RISK,
  GET_ANALYSE_RISK,
  GET_GLOBAL_STATISTIC,
  GET_GLOBAL_STATISTIC_SUCCESS,
  GET_GLOBAL_STATISTIC_FAILED,
  SET_ASSET_CLASS_CONCENTRATION,
  SET_ASSET_CONCENTRATION,
  SET_SECTOR_CONCENTRATION,
  SET_RANKING_CHART_DATA,
  SET_YIELDS_AND_PERFS,
  SET_COMPARISON_PTF_BENCH,
  SET_COMPARISON_YIELD
} from "../../constants/actionTypes";

export const getInitialData = (gameSessionId) => ({
  type: GET_INITIAL_DATA,
  payload: { gameSessionId },
});

export const getInitialDataSuccess = (initialData) => ({
  type: GET_INITIAL_DATA_SUCCESS,
  payload: initialData,
});

export const getInitialDataFailed = (error) => ({
  type: GET_INITIAL_DATA_FAILED,
  payload: { error },
});

export const addOrder = (
  { portfolio_id, asset_id, direction, quantity, order_type, price },
  callback
) => ({
  type: ADD_ORDER,
  payload: {
    portfolio_id,
    asset_id,
    direction,
    quantity,
    order_type,
    price,
    callback,
  },
});

export const addOrderSuccess = (initialData) => ({
  type: ADD_ORDER_SUCCESS,
  payload: initialData,
});

export const addOrderFailed = (error) => ({
  type: ADD_ORDER_FAILED,
  payload: { error },
});

export const getRankings = (gameSessionId) => ({
  type: GET_RANKINGS,
  payload: { gameSessionId },
});

export const getRankingsSuccess = (rankings) => ({
  type: GET_RANKINGS_SUCCESS,
  payload: rankings,
});

export const getRankingsFailed = (error) => ({
  type: GET_RANKINGS_FAILED,
  payload: { error },
});

export const getPortfolioIndicators = (portfolioId) => ({
  type: GET_INDICATORS,
  payload: { portfolioId },
});

export const getPortfolioIndicatorsSuccess = (portfolioIndicator) => ({
  type: GET_INDICATORS_SUCCESS,
  payload: portfolioIndicator,
});

export const getPortfolioIndicatorsFailed = (error) => ({
  type: GET_INDICATORS_FAILED,
  payload: { error },
});

export const getGlobalRiskView = (portfolioId) => ({
  type: GET_GLOBAL_RISK,
  payload: { portfolioId },
});

export const getGlobalRiskViewSuccess = (globalRiskData) => ({
  type: GET_GLOBAL_RISK_SUCCESS,
  payload: globalRiskData,
});

export const getGlobalRiskViewFailed = (error) => ({
  type: GET_GLOBAL_RISK_FAILED,
  payload: { error },
});

export const getGlobalStatisticView = (portfolioId) => ({
  type: GET_GLOBAL_STATISTIC,
  payload: { portfolioId },
});

export const getGlobalStatisticViewSuccess = (globalStatisticData) => ({
  type: GET_GLOBAL_STATISTIC_SUCCESS,
  payload: globalStatisticData,
});

export const getGlobalStatisticViewFailed = (error) => ({
  type: GET_GLOBAL_STATISTIC_FAILED,
  payload: { error },
});

export const setVariationVolatilityAndBeta = (array) => ({
  type: SET_VARIATION_VOLATILITY_AND_BETA,
  payload: array,
});

export const setVolatilityValueRiskData = (array) => ({
  type: SET_VOLATILITY_VALUE_RISK,
  payload: array,
});

export const setBetaValueRiskData = (array) => ({
  type: SET_BETA_VALUE_RISK,
  payload: array,
});

export const getAnalyseRisk = (array) => ({
  type: GET_ANALYSE_RISK,
  payload: array,
});


export const setAssetClassConcentrationData = (array) => ({
  type: SET_ASSET_CLASS_CONCENTRATION,
  payload: array,
});
export const setAssetConcentrationData = (array) => ({
  type: SET_ASSET_CONCENTRATION,
  payload: array,
});

export const setSectorConcentrationData = (array) => ({
  type: SET_SECTOR_CONCENTRATION,
  payload: array,
});

export const setYieldsAndPerfsData = (array) => ({
  type: SET_YIELDS_AND_PERFS,
  payload: array,
});

export const setComparisonPtfBenchChart = (array) => ({
  type: SET_COMPARISON_PTF_BENCH,
  payload: array,
});

export const setComparisonYieldChart = (array) => ({
  type: SET_COMPARISON_YIELD,
  payload: array,
});

export const setRankingChartData = (array) => ({
  type: SET_RANKING_CHART_DATA,
  payload: array,
});
