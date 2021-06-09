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
  SET_ASSET_CLASS_CONCENTRATION,
  SET_ASSET_CONCENTRATION,
  GET_GLOBAL_STATISTIC,
  GET_GLOBAL_STATISTIC_SUCCESS,
  GET_GLOBAL_STATISTIC_FAILED,
  SET_SECTOR_CONCENTRATION,
  SET_RANKING_CHART_DATA,
  SET_YIELDS_AND_PERFS,
  SET_COMPARISON_PTF_BENCH,SET_COMPARISON_YIELD
} from "../../constants/actionTypes";
import { REHYDRATE } from "redux-persist";

const INIT_STATE = {
  initialData: {},
  portfolioIndicator: [],
  variationVolatilityBetaRisk: [],
  volatilityValueRisk: [],
  betaValueRisk: [],
  analyseRisk: [],
  globalRiskData: {},
  globalStatisticData: {},
  assetClassConcentrationStatisticData: {},
  assetConcentrationStatisticData: {},
  sectorConcentrationStatisticData: {},
  comparisonPtfBench: {},
  comparisonYield: {},
  rankings: [],
  rankingChartData: [],
  yieldsAndPerfsArray: [],
  loading: false,
  error: {},
};

const FinEdge = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INITIAL_DATA:
      return { ...state, loading: true };

    case GET_INITIAL_DATA_SUCCESS:
      return { ...state, initialData: action.payload, loading: false };

    case GET_INITIAL_DATA_FAILED:
      return { ...state, error: action.payload.error, loading: false };
    case ADD_ORDER:
      return { ...state, loading: true };

    case ADD_ORDER_SUCCESS:
      return { ...state, loading: false };

    case ADD_ORDER_FAILED:
      return { ...state, error: action.payload.error, loading: false };
    case GET_RANKINGS:
      return { ...state, loading: true };

    case GET_RANKINGS_SUCCESS:
      return { ...state, rankings: action.payload, loading: false };

    case GET_RANKINGS_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case GET_INDICATORS:
      return { ...state, loading: true };

    case GET_INDICATORS_SUCCESS:
      return { ...state, portfolioIndicator: action.payload, loading: false };

    case GET_INDICATORS_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case GET_GLOBAL_RISK:
      return { ...state, loading: true };

    case GET_GLOBAL_RISK_SUCCESS:
      return { ...state, globalRiskData: action.payload, loading: false };

    case GET_GLOBAL_STATISTIC:
      return { ...state, loading: true };

    case GET_GLOBAL_STATISTIC_SUCCESS:
      return { ...state, globalStatisticData: action.payload, loading: false };

    case SET_VARIATION_VOLATILITY_AND_BETA:
      return {
        ...state,
        variationVolatilityBetaRisk: action.payload,
        loading: false,
      };

    case GET_ANALYSE_RISK:
      return {
        ...state,
        analyseRisk: action.payload,
        loading: false,
      };

    case SET_ASSET_CLASS_CONCENTRATION:
      return {
        ...state,
        assetClassConcentrationStatisticData: action.payload,
        loading: false,
      };
    case SET_ASSET_CONCENTRATION:
      return {
        ...state,
        assetConcentrationStatisticData: action.payload,
        loading: false,
      };
    case SET_SECTOR_CONCENTRATION:
      return {
        ...state,
        sectorConcentrationStatisticData: action.payload,
        loading: false,
      };

    case SET_VOLATILITY_VALUE_RISK:
      return {
        ...state,
        volatilityValueRisk: action.payload,
        loading: false,
      };

    case SET_BETA_VALUE_RISK:
      return {
        ...state,
        betaValueRisk: action.payload,
        loading: false,
      };

    case SET_YIELDS_AND_PERFS:
      return {
        ...state,
        yieldsAndPerfsArray: action.payload,
        loading: false,
      };
    case SET_COMPARISON_PTF_BENCH:
      return {
        ...state,
         comparisonPtfBench: action.payload,
        loading: false,
      };
    case SET_COMPARISON_YIELD:
      return {
        ...state,
         comparisonYield: action.payload,
        loading: false,
      };

    case GET_GLOBAL_RISK_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case GET_GLOBAL_STATISTIC_FAILED:
      return { ...state, error: action.payload.error, loading: false };
    case SET_RANKING_CHART_DATA:
      return { ...state, rankingChartData: action.payload, loading: false };

    case REHYDRATE:
      return action.payload
        ? {
            ...state,
            ...action.payload.FinEdge,
          }
        : {
            ...state,
          };
    default:
      return { ...state };
  }
};

export default FinEdge;
