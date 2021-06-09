import {
  GET_SESSIONS_MODULE_BY_ID,
  GET_SESSIONS_MODULE_BY_ID_SUCCESS,
  GET_SESSIONS_MODULE_BY_ID_FAILED,
  ADD_SESSION_MODULE,
  ADD_SESSION_MODULE_SUCCESS,
  ADD_SESSION_MODULE_FAILED,
  INIT_SUCCESS,
  DELETE_SESSION_MODULE,
  DELETE_SESSION_MODULE_SUCCESS,
  DELETE_SESSION_MODULE_FAILED,
  EDIT_SESSION_MODULE,
  EDIT_SESSION_MODULE_SUCCESS,
  EDIT_SESSION_MODULE_FAILED,
  ARCHIVE_SESSION_MODULE_FAILED,
  ARCHIVE_SESSION_MODULE_SUCCESS,
  SELECT_SESSION,
  ARCHIVE_SESSION_MODULE
} from "../../constants/actionTypes";

export const getSessionsModuleByIDSuccess = (moduleSessions) => ({
  type: GET_SESSIONS_MODULE_BY_ID_SUCCESS,
  payload: moduleSessions,
});

export const deleteSessionModule = (trainingSessionId) => ({
  type: DELETE_SESSION_MODULE,
  payload: { trainingSessionId },
});

export const deleteSessionModuleFailed = (error) => ({
  type: DELETE_SESSION_MODULE_FAILED,
  payload: error,
});

export const deleteSessionModuleSuccess = (trainingSessionId) => ({
  type: DELETE_SESSION_MODULE_SUCCESS,
  payload: trainingSessionId,
});

export const getSessionsModuleByID = (moduleInstanceId) => ({
  type: GET_SESSIONS_MODULE_BY_ID,
  payload: { moduleInstanceId },
});

export const getSessionsModuleByIDFailed = (error) => ({
  type: GET_SESSIONS_MODULE_BY_ID_FAILED,
  payload: error,
});

export const addSessionModuleSuccess = (moduleSession) => ({
  type: ADD_SESSION_MODULE_SUCCESS,
  payload: moduleSession,
});

export const addSessionModule = (
  moduleInstanceId,
  trainingSessionName,
  startDate,
  endDate
) => ({
  type: ADD_SESSION_MODULE,
  payload: { moduleInstanceId, trainingSessionName, startDate, endDate },
});

export const addSessionModuleFailed = (error) => ({
  type: ADD_SESSION_MODULE_FAILED,
  payload: error,
});

export const editSessionModuleSuccess = (session) => ({
  type: EDIT_SESSION_MODULE_SUCCESS,
  payload: session,
});

export const editSessionModule = (
  trainingSessionId,
  moduleInstanceId,
  trainingSessionName,
  startDate,
  endDate
) => ({
  type: EDIT_SESSION_MODULE,
  payload: {
    trainingSessionId,
    moduleInstanceId,
    trainingSessionName,
    startDate,
    endDate,
  },
});

export const archiveSessionModuleFailed = (error) => ({
  type: ARCHIVE_SESSION_MODULE_FAILED,
  payload: error,
});

export const archiveSessionModuleSuccess = (trainingSessionId) => ({
  type: ARCHIVE_SESSION_MODULE_SUCCESS,
  payload: trainingSessionId,
});

export const archiveSessionModule = (trainingSessionId) => ({
  type: ARCHIVE_SESSION_MODULE,
  payload: {trainingSessionId},
});

export const editSessionModuleFailed = (error) => ({
  type: EDIT_SESSION_MODULE_FAILED,
  payload: error,
});

export const initSuccess = () => ({
  type: INIT_SUCCESS,
  payload: {},
});

export const selectSession = (session) => ({
  type: SELECT_SESSION,
  payload: session,
});
