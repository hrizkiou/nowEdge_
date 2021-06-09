import {
  GET_ALL_CONFIGURATION,
  GET_ALL_CONFIGURATION_FAILED,
  GET_ALL_CONFIGURATION_SUCCESS,
  CREATE_CONFIGURATION,
  CREATE_CONFIGURATION_FAILED,
  CREATE_CONFIGURATION_SUCCESS,
  DELETE_CONFIGURATION,
  DELETE_CONFIGURATION_FAILED,
  DELETE_CONFIGURATION_SUCCESS,
  EDIT_CONFIGURATION,
  EDIT_CONFIGURATION_FAILED,
  EDIT_CONFIGURATION_SUCCESS,
  DUPLICATE_CONFIGURATION,
  DUPLICATE_CONFIGURATION_FAILED,
  DUPLICATE_CONFIGURATION_SUCCESS,
  SELECT_CONFIGURATION,
  INIT_SUCCESS,
} from "../../constants/actionTypes";
import { REHYDRATE } from "redux-persist";

const INIT_STATE = {
  configurations: [],
  selectedConfig: {},
  loading: false,
};

const Configuration = (state = INIT_STATE, action) => {
  let configurations;
  switch (action.type) {
    case GET_ALL_CONFIGURATION:
      return { ...state, loading: true };
    case GET_ALL_CONFIGURATION_SUCCESS:
      return {
        ...state,
        configurations: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_CONFIGURATION_FAILED:
      return { ...state, error: action.payload, loading: false };
    case CREATE_CONFIGURATION:
      return { ...state, loading: true };
    case CREATE_CONFIGURATION_FAILED:
      return { ...state, error: action.payload, loading: false };
    case CREATE_CONFIGURATION_SUCCESS:
      configurations = state.configurations;
      configurations.push(action.payload);
      return {
        ...state,
        configurations,
        loading: false,
        addSuccess: true,
        error: null,
      };
    case DUPLICATE_CONFIGURATION:
      return { ...state, loading: true };
    case DUPLICATE_CONFIGURATION_FAILED:
      return { ...state, error: action.payload, loading: false };
    case DUPLICATE_CONFIGURATION_SUCCESS:
      configurations = state.configurations;
      configurations.push(action.payload);
      return {
        ...state,
        configurations,
        loading: false,
        duplicateSuccess: true,
        error: null,
      };
    case DELETE_CONFIGURATION:
      return { ...state, loading: true };
    case DELETE_CONFIGURATION_FAILED:
      return { ...state, error: action.payload, loading: false };
    case DELETE_CONFIGURATION_SUCCESS:
      configurations = state.configurations;
      configurations = configurations.filter((configuration) => {
        return configuration.moduleInstanceId !== action.payload;
      });
      return {
        ...state,
        configurations,
        loading: false,
        deleteSuccess: true,
        error: null,
      };
    case EDIT_CONFIGURATION:
      return { ...state, loading: true };
    case EDIT_CONFIGURATION_FAILED:
      return { ...state, error: action.payload, loading: false };
    case EDIT_CONFIGURATION_SUCCESS:
      configurations = state.configurations;
      configurations = configurations.map((configuration) => {
        if (
          configuration.moduleInstanceId === action.payload.moduleInstanceId
        ) {
          configuration = { ...action.payload };
        }
        return configuration;
      });

      return {
        ...state,
        configurations,
        loading: false,
        editSuccess: true,
        error: null,
      };

    case INIT_SUCCESS:
      return {
        ...state,
        addSuccess: false,
        deleteSuccess: false,
        editSuccess: false,
        duplicateSuccess: false,
      };

    case SELECT_CONFIGURATION:
      return { ...state, selectedConfig: action.payload };
    case REHYDRATE:
      return action.payload
        ? {
            ...state,
            ...action.payload.Configuration,
          }
        : {
            ...state,
          };
    default:
      return { ...state };
  }
};

export default Configuration;
