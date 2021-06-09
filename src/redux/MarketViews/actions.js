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
  SET_ASSET_CHART_LINE_DATA,
} from "../../constants/actionTypes";

export const getMarketViewsData = () => ({
  type: GET_MARKET_VIEWS_DATA,
  payload: null,
});

export const getMarketViewsDataSuccess = (marketViewsData) => ({
  type: GET_MARKET_VIEWS_DATA_SUCCESS,
  payload: marketViewsData,
});

export const getMarketViewsDataFailed = (error) => ({
  type: GET_MARKET_VIEWS_DATA_FAILED,
  payload: { error },
});

export const setMarketViewsChartColumnData = (data) => ({
  type: SET_MARKET_VIEWS_CHART_COLUMN_DATA,
  payload: data,
});

export const setMarketViewsChartLineData = (data) => ({
  type: SET_MARKET_VIEWS_CHART_LINE_DATA,
  payload: data,
});

export const setMarketViewsPerformanceArray = (data) => ({
  type: SET_MARKET_VIEWS_PERFORMANCE_ARRAY,
  payload: data,
});

export const getHistoricalData = (assetId) => ({
  type: GET_HISTORICAL_DATA,
  payload: {assetId},
});

export const getHistoricalDataSuccess = (historicalData) => ({
  type: GET_HISTORICAL_DATA_SUCCESS,
  payload: historicalData,
});

export const getHistoricalDataFailed = (error) => ({
  type: GET_HISTORICAL_DATA_FAILED,
  payload: { error },
});

export const setHistoricalChartColumnData = (data) => ({
  type: SET_ASSET_CHART_COLUMN_DATA,
  payload: data,
});

export const setHistoricalChartLineData = (data) => ({
  type: SET_ASSET_CHART_LINE_DATA,
  payload: data,
});
 
