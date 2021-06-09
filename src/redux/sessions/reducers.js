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
  ARCHIVE_SESSION_MODULE,
  SELECT_SESSION
} from "../../constants/actionTypes";
import { REHYDRATE } from "redux-persist";

const INIT_STATE = {
  moduleSessions: [],
  selectedSession: {},
  loading: false,
};

const Session = (state = INIT_STATE, action) => {
  let moduleSessions;
  switch (action.type) {
    case GET_SESSIONS_MODULE_BY_ID:
      return { ...state, loading: true, error: null };
    case GET_SESSIONS_MODULE_BY_ID_SUCCESS:
      return {
        ...state,
        moduleSessions: action.payload,
        loading: false,
        error: null,
      };
    case GET_SESSIONS_MODULE_BY_ID_FAILED:
      return { ...state, error: action.payload, loading: false };

    case DELETE_SESSION_MODULE:
      return { ...state, loading: true, error: null };
    case DELETE_SESSION_MODULE_SUCCESS:
      moduleSessions = state.moduleSessions;
      moduleSessions = moduleSessions.filter((session) => {
        return session.trainingSessionId !== action.payload;
      });
      return {
        ...state,
        moduleSessions,
        loading: false,
        error: null,
        deleteSuccess: true,
      };

    case DELETE_SESSION_MODULE_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
        deleteSuccess: false,
      };

    case ADD_SESSION_MODULE:
      return { ...state, loading: true, error: null };
    case ADD_SESSION_MODULE_SUCCESS:
      moduleSessions = state.moduleSessions;
      moduleSessions.push(action.payload);
      //console.log("moduleSessions", moduleSessions);
      return {
        ...state,
        moduleSessions,
        loading: false,
        error: null,
        addSuccess: true,
      };
    case ADD_SESSION_MODULE_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
        addSuccess: false,
      };

    case EDIT_SESSION_MODULE:
      return { ...state, loading: true, error: null };
    case EDIT_SESSION_MODULE_SUCCESS:
      moduleSessions = state.moduleSessions;
      moduleSessions = moduleSessions.map((session) => {
        if (session.trainingSessionId === action.payload.trainingSessionId) {
          session = { ...action.payload };
        }
        return session;
      });

      return {
        ...state,
        moduleSessions,
        loading: false,
        error: null,
        editSuccess: true,
      };
    case EDIT_SESSION_MODULE_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
        editSuccess: false,
      };

    case ARCHIVE_SESSION_MODULE:
      return { ...state, loading: true, error: null };
    case ARCHIVE_SESSION_MODULE_SUCCESS:
      moduleSessions = state.moduleSessions;
      moduleSessions = moduleSessions.filter((session) => {
        return session.trainingSessionId !== action.payload;
      });
      return {
        ...state,
        moduleSessions,
        loading: false,
        error: null,
        archiveSuccess: true,
      };
    case ARCHIVE_SESSION_MODULE_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
        archiveSuccess: false,
      };

    case SELECT_SESSION:
      return { ...state, selectedSession: action.payload };
    case INIT_SUCCESS:
      return {
        ...state,
        addSuccess: false,
        deleteSuccess: false,
        editSuccess: false,
        archiveSuccess: false,
      };

    case REHYDRATE:
      return action.payload
        ? {
            ...state,
            ...action.payload.Session,
          }
        : {
            ...state,
          };
    default:
      return { ...state };
  }
};

export default Session;
