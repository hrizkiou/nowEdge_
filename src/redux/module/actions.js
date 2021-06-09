import {
  GET_ALL_MODULES,
  GET_ALL_MODULES_SUCCESS,
  GET_ALL_MODULES_FAILED,
  GET_MODULE_BY_ID,
  GET_MODULE_BY_ID_SUCCESS,
  GET_MODULE_BY_ID_FAILED,
  GET_FIELDS,
  GET_CONFIGURATIONS_MODULE_BY_ID,
  GET_CONFIGURATIONS_MODULE_BY_ID_SUCCESS,
  GET_CONFIGURATIONS_MODULE_BY_ID_FAILED,
  SUBSCRIBE_TO_TRAININGSESSION,
  SUBSCRIBE_TO_TRAININGSESSION_SUCCESS,
  SUBSCRIBE_TO_TRAININGSESSION_FAILED,
  DELETE_ERROR
} from "../../constants/actionTypes";

export const getAllModulesSuccess = (modules) => ({
  type: GET_ALL_MODULES_SUCCESS,
  payload: modules,
});

export const getAllModules = (participantUserId) => ({
  type: GET_ALL_MODULES,
  payload: {participantUserId},
});

export const getAllModulesFailed = (error) => ({
  type: GET_ALL_MODULES_FAILED,
  payload: error,
});

export const getModuleByIDSuccess = (module,notions) => ({
  type: GET_MODULE_BY_ID_SUCCESS,
  payload: {
    module,
    notions
  },
});

export const getModuleByID = (module) => ({
  type: GET_MODULE_BY_ID,
  payload: {module},
});

export const getModuleByIDFailed = (error) => ({
  type: GET_MODULE_BY_ID_FAILED,
  payload: error,
});

export const getFields = () => ({
  type: GET_FIELDS,
  payload: {},
});

export const getConfigurationsModuleByIDSuccess = (moduleConfigurations) => ({
  type: GET_CONFIGURATIONS_MODULE_BY_ID_SUCCESS,
  payload: moduleConfigurations,
});

export const getConfigurationModuleByID = (moduleInstanceId) => ({
  type: GET_CONFIGURATIONS_MODULE_BY_ID,
  payload: {moduleInstanceId},
});

export const getConfigurationsModuleByIDFailed = (error) => ({
  type: GET_CONFIGURATIONS_MODULE_BY_ID_FAILED,
  payload: error,
});

export const subscribeToTrainingSession = (code) => ({
  type: SUBSCRIBE_TO_TRAININGSESSION,
  payload: {code},
});

export const subscribeToTrainingSessionSuccess = (module) => ({
  type: SUBSCRIBE_TO_TRAININGSESSION_SUCCESS,
  payload: module,
});

export const subscribeToTrainingSessionFailed = (error) => ({
  type: SUBSCRIBE_TO_TRAININGSESSION_FAILED,
  payload: error,
});

export const deleteError = () => ({
  type: DELETE_ERROR,
  payload: {},
});
