import {
  GET_CENTER_INFO,
  GET_CENTER_INFO_SUCCESS,
  GET_CENTER_INFO_FAILED,
  UPDATE_CENTER_INFO,
  UPDATE_CENTER_INFO_SUCCESS,
  UPDATE_CENTER_INFO_FAILED,
  GET_SCORE,
  GET_SCORE_SUCCESS,
  GET_SCORE_FAILED,
  GET_SCORE_GLOBAL,
  GET_SCORE_GLOBAL_SUCCESS,
  GET_SCORE_GLOBAL_FAILED,
  CLOSE_DAY,
  CLOSE_DAY_CLEAR,
  GET_SCORE_GLOBAL_MODERATOR,
  GET_SCORE_GLOBAL_MODERATOR_SUCCESS,
  GET_SCORE_GLOBAL_MODERATOR_FAILED,
} from "../../constants/actionTypes";
import { REHYDRATE } from "redux-persist";

const INIT_STATE = {
  center: {},
  score: {},
  loading: false,
  closeDay: null,
  scoreGlobal: [],
  scoreGlobalModerator: [],
};

const PvGame = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CENTER_INFO:
      return { ...state, loading: true };

    case GET_CENTER_INFO_SUCCESS:
      return { ...state, center: action.payload.center, loading: false };

    case GET_CENTER_INFO_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case UPDATE_CENTER_INFO:
      return { ...state, loading: true };

    case UPDATE_CENTER_INFO_SUCCESS:
      return { ...state, center: action.payload.center, loading: false };

    case UPDATE_CENTER_INFO_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case GET_SCORE:
      return { ...state, loading: true };

    case GET_SCORE_SUCCESS:
      return { ...state, score: action.payload.score, loading: false };

    case GET_SCORE_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case GET_SCORE_GLOBAL:
      return { ...state, loading: true };

    case GET_SCORE_GLOBAL_SUCCESS:
      return {
        ...state,
        scoreGlobal: action.payload.scoreGlobal,
        loading: false,
      };

    case GET_SCORE_GLOBAL_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case GET_SCORE_GLOBAL_MODERATOR:
      return { ...state, loading: true };

    case GET_SCORE_GLOBAL_MODERATOR_SUCCESS:
      return {
        ...state,
        scoreGlobalModerator: action.payload.scoreGlobalModerator,
        loading: false,
      };

    case GET_SCORE_GLOBAL_MODERATOR_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case CLOSE_DAY:
      return { ...state, closeDay: action.payload };

    case CLOSE_DAY_CLEAR:
      return { ...state, closeDay: null };

    case REHYDRATE:
      return action.payload
        ? {
            ...state,
            ...action.payload.PvGame,
          }
        : {
            ...state,
          };
    default:
      return { ...state };
  }
};

export default PvGame;
