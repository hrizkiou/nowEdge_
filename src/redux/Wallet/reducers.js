import {
  GET_ORDERS_DATA,
  GET_ORDERS_DATA_SUCCESS,
  GET_ORDERS_DATA_FAILED,
  GET_LAST_PERFORMANCES_DATA,
  GET_LAST_PERFORMANCES_DATA_SUCCESS,
  GET_LAST_PERFORMANCES_DATA_FAILED,
  GET_LAST_POSITIONS_DATA,
  GET_LAST_PERFORMANCES_DATA_API_SUCCESS,
  GET_LAST_POSITIONS_DATA_SUCCESS,
  GET_LAST_POSITIONS_DATA_FAILED,
  GET_LAST_POSITIONS_DATA_API_SUCCESS
} from "../../constants/actionTypes";
import { REHYDRATE } from "redux-persist";

const INIT_STATE = {
  orders: [],
  lastPerformancesDataAPI: [],
  lastPositionsDataAPI: [],
  lastPerformances: [],
  lastPositions: [],
  loading: false,
  error: {},
};

const Wallet = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS_DATA:
      return { ...state, loading: true };

    case GET_ORDERS_DATA_SUCCESS:
      return { ...state, orders: action.payload, loading: false };

    case GET_ORDERS_DATA_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case GET_LAST_PERFORMANCES_DATA:
      return { ...state, loading: true };

    case GET_LAST_PERFORMANCES_DATA_SUCCESS:
      return { ...state, lastPerformances: action.payload, loading: false };

    case GET_LAST_PERFORMANCES_DATA_API_SUCCESS:
      return {
        ...state,
        lastPerformancesDataAPI: action.payload,
        loading: false,
      };

    case GET_LAST_PERFORMANCES_DATA_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case GET_LAST_POSITIONS_DATA:
      return { ...state, loading: true };

    case GET_LAST_POSITIONS_DATA_SUCCESS:
      return { ...state, lastPositions: action.payload, loading: false };

    case GET_LAST_POSITIONS_DATA_API_SUCCESS:
      return { ...state, lastPositionsDataAPI: action.payload, loading: false };

    case GET_LAST_POSITIONS_DATA_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case REHYDRATE:
      return action.payload
        ? {
            ...state,
            ...action.payload.Wallet,
          }
        : {
            ...state,
          };
    default:
      return { ...state };
  }
};

export default Wallet;
