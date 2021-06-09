import {
  GET_MARKET_VIEWS_DATA,
  GET_MARKET_VIEWS_DATA_SUCCESS,
  GET_MARKET_VIEWS_DATA_FAILED,
  SET_MARKET_VIEWS_CHART_COLUMN_DATA,
  SET_MARKET_VIEWS_CHART_LINE_DATA,
  SET_MARKET_VIEWS_PERFORMANCE_ARRAY,
  GET_HISTORICAL_DATA,
GET_HISTORICAL_DATA_SUCCESS,
GET_HISTORICAL_DATA_FAILED,
SET_ASSET_CHART_COLUMN_DATA,
SET_ASSET_CHART_LINE_DATA
} from "../../constants/actionTypes";
import { REHYDRATE } from "redux-persist";

const INIT_STATE = {
  marketViewsData: [],
  marketViewsChartColumnData: [],
  marketViewsChartLineData: [],
  marketViewsPerformanceArray: [],
  historicalData: [],
  historicalDataChartLineData: [],
  historicalDataColumnData: [],
  loading: false,
  error: {},
};

const MarketViews = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MARKET_VIEWS_DATA:
      return { ...state, loading: true };

    case GET_MARKET_VIEWS_DATA_SUCCESS:
      return { ...state, marketViewsData: action.payload, loading: false };

    case GET_MARKET_VIEWS_DATA_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case SET_MARKET_VIEWS_CHART_COLUMN_DATA:
      return { ...state, marketViewsChartColumnData: action.payload, loading: false };
    case SET_MARKET_VIEWS_CHART_LINE_DATA:
      return { ...state, marketViewsChartLineData: action.payload, loading: false };
    case SET_MARKET_VIEWS_PERFORMANCE_ARRAY:
      return { ...state, marketViewsPerformanceArray: action.payload, loading: false };



    case GET_HISTORICAL_DATA:
      return { ...state, loading: true };

    case GET_HISTORICAL_DATA_SUCCESS:
      return { ...state, historicalData: action.payload, loading: false };

    case GET_HISTORICAL_DATA_FAILED:
      return { ...state, error: action.payload.error, loading: false };

      case SET_ASSET_CHART_COLUMN_DATA:
        return { ...state, historicalDataColumnData: action.payload, loading: false };
      case SET_ASSET_CHART_LINE_DATA:
        return { ...state, historicalDataChartLineData: action.payload, loading: false };
   
    case REHYDRATE:
      return action.payload
        ? {
            ...state,
            ...action.payload.MarketViews,
          }
        : {
            ...state,
          };
    default:
      return { ...state };
  }
};

export default MarketViews;
