import {
  GET_ALL_CONFIGURATION,
  GET_ALL_CONFIGURATION_SUCCESS,
  GET_ALL_CONFIGURATION_FAILED,
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

export const getAllConfiguration = (moduleAffectationId) => ({
  type: GET_ALL_CONFIGURATION,
  payload: { moduleAffectationId },
});

export const getAllConfigurationFailed = (error) => ({
  type: GET_ALL_CONFIGURATION_FAILED,
  payload: error,
});

export const getAllConfigurationSuccess = (configurations) => ({
  type: GET_ALL_CONFIGURATION_SUCCESS,
  payload: configurations,
});

export const createConfiguration = ({
  moduleAffectationId,
  moduleInstanceName,
}) => ({
  type: CREATE_CONFIGURATION,
  payload: { moduleAffectationId, moduleInstanceName },
});

export const createConfigurationFailed = (error) => ({
  type: CREATE_CONFIGURATION_FAILED,
  payload: error,
});

export const createConfigurationSuccess = (configuration) => ({
  type: CREATE_CONFIGURATION_SUCCESS,
  payload: configuration,
});

export const duplicateConfiguration = ({
  moduleInstanceId,
  moduleInstanceName,
  notions,
  quizzes,
  games,
}) => ({
  type: DUPLICATE_CONFIGURATION,
  payload: { moduleInstanceId, moduleInstanceName, notions, quizzes, games },
});

export const duplicateConfigurationFailed = (error) => ({
  type: DUPLICATE_CONFIGURATION_FAILED,
  payload: error,
});

export const duplicateConfigurationSuccess = (configuration) => ({
  type: DUPLICATE_CONFIGURATION_SUCCESS,
  payload: configuration,
});

export const deleteConfiguration = (moduleInstanceId) => ({
  type: DELETE_CONFIGURATION,
  payload: { moduleInstanceId },
});

export const deleteConfigurationFailed = (error) => ({
  type: DELETE_CONFIGURATION_FAILED,
  payload: error,
});

export const deleteConfigurationSuccess = (moduleInstanceId) => ({
  type: DELETE_CONFIGURATION_SUCCESS,
  payload: moduleInstanceId,
});

export const editConfiguration = ({
  moduleInstanceId,
  moduleInstanceName,
}) => ({
  type: EDIT_CONFIGURATION,
  payload: { moduleInstanceId, moduleInstanceName },
});

export const editConfigurationFailed = (error) => ({
  type: EDIT_CONFIGURATION_FAILED,
  payload: error,
});

export const editConfigurationSuccess = (configuration) => ({
  type: EDIT_CONFIGURATION_SUCCESS,
  payload: configuration,
});

export const selectConfiguration = (configuration) => ({
  type: SELECT_CONFIGURATION,
  payload: configuration,
});

export const initSuccess = () => ({
  type: INIT_SUCCESS,
  payload: {},
});
