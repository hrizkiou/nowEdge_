import {
  GET_ORDERS_DATA,
  GET_ORDERS_DATA_SUCCESS,
  GET_ORDERS_DATA_FAILED,
  GET_LAST_PERFORMANCES_DATA,
  GET_LAST_PERFORMANCES_DATA_SUCCESS,
  GET_LAST_PERFORMANCES_DATA_FAILED,
  GET_LAST_POSITIONS_DATA,
  GET_LAST_POSITIONS_DATA_SUCCESS,
  GET_LAST_POSITIONS_DATA_FAILED,
  GET_LAST_PERFORMANCES_DATA_API_SUCCESS,
  GET_LAST_POSITIONS_DATA_API_SUCCESS
} from "../../constants/actionTypes";

export const getOrdersData = (portfolioId) => ({
  type: GET_ORDERS_DATA,
  payload: { portfolioId },
});

export const getOrdersDataSuccess = (orders) => ({
  type: GET_ORDERS_DATA_SUCCESS,
  payload: orders,
});

export const getOrdersDataFailed = (error) => ({
  type: GET_ORDERS_DATA_FAILED,
  payload: { error },
});

export const getLastPerformancesData = (assetId) => ({
  type: GET_LAST_PERFORMANCES_DATA,
  payload: { assetId },
});

export const getLastPerformancesDataSuccess = (lastPerformances) => ({
  type: GET_LAST_PERFORMANCES_DATA_SUCCESS,
  payload: lastPerformances,
});

export const getLastPerformancesDataAPISuccess = (lastPerformances) => ({
  type: GET_LAST_PERFORMANCES_DATA_API_SUCCESS,
  payload: lastPerformances,
});

export const getLastPositionDataAPISuccess = (lastPositions) => ({
  type: GET_LAST_POSITIONS_DATA_API_SUCCESS,
  payload: lastPositions,
});

export const getLastPerformancesDataFailed = (error) => ({
  type: GET_LAST_PERFORMANCES_DATA_FAILED,
  payload: { error },
});

export const getLastPositionData = (portfolioId) => ({
  type: GET_LAST_POSITIONS_DATA,
  payload: { portfolioId },
});

export const getLastPositionDataSuccess = (lastPositions) => ({
  type: GET_LAST_POSITIONS_DATA_SUCCESS,
  payload: lastPositions,
});

export const getLastPositionDataFailed = (error) => ({
  type: GET_LAST_POSITIONS_DATA_FAILED,
  payload: { error },
});
