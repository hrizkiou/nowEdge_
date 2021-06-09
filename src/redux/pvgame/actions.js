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

export const getCenterInfo = (gameSessionId) => ({
  type: GET_CENTER_INFO,
  payload: { gameSessionId },
});

export const getCenterInfoSuccess = (center) => ({
  type: GET_CENTER_INFO_SUCCESS,
  payload: { center },
});

export const getCenterInfoFailed = (error) => ({
  type: GET_CENTER_INFO_FAILED,
  payload: { error },
});

export const updateCenterInfo = (
  gameSessionId,
  name,
  avatarId,
  countryId,
  responsibilityId
) => ({
  type: UPDATE_CENTER_INFO,
  payload: { gameSessionId, name, avatarId, countryId, responsibilityId },
});

export const updateCenterInfoSuccess = (center) => ({
  type: UPDATE_CENTER_INFO_SUCCESS,
  payload: { center },
});

export const updateCenterInfoFailed = (error) => ({
  type: UPDATE_CENTER_INFO_FAILED,
  payload: { error },
});

export const getscore = (centerId) => ({
  type: GET_SCORE,
  payload: { centerId },
});

export const getscoreSuccess = (score) => ({
  type: GET_SCORE_SUCCESS,
  payload: { score },
});

export const getscoreFailed = (error) => ({
  type: GET_SCORE_FAILED,
  payload: { error },
});

export const getScoreGlobal = (gameSessionId) => ({
  type: GET_SCORE_GLOBAL,
  payload: { gameSessionId },
});

export const getScoreGlobalSuccess = (scoreGlobal) => ({
  type: GET_SCORE_GLOBAL_SUCCESS,
  payload: { scoreGlobal },
});

export const getScoreGlobalFailed = (error) => ({
  type: GET_SCORE_GLOBAL_FAILED,
  payload: { error },
});

export const getScoreGlobalModerator = (gameSessionId) => ({
  type: GET_SCORE_GLOBAL_MODERATOR,
  payload: { gameSessionId },
});

export const getScoreGlobalModeratorSuccess = (scoreGlobalModerator) => ({
  type: GET_SCORE_GLOBAL_MODERATOR_SUCCESS,
  payload: { scoreGlobalModerator },
});

export const getScoreGlobalModeratorFailed = (error) => ({
  type: GET_SCORE_GLOBAL_MODERATOR_FAILED,
  payload: { error },
});

export const closeDaySuccess = (closeDay) => ({
  type: CLOSE_DAY,
  payload: closeDay,
});

export const closeDayClear = () => ({
  type: CLOSE_DAY_CLEAR,
  payload: null,
});
