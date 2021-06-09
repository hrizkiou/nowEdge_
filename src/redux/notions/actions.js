import {
  GET_NOTIONS_MODULE_BY_ID_SUCCESS,
  GET_NOTIONS_MODULE_BY_ID,
  GET_NOTIONS_MODULE_BY_ID_FAILED,
  ADD_NOTIONS_MODULE_SUCCESS,
  ADD_NOTIONS_MODULE,
  ADD_NOTIONS_MODULE_FAILED,
  INIT_SUCCESS_NOTION,
  EDIT_NOTIONS_MODULE_SUCCESS,
  EDIT_NOTIONS_MODULE,
  EDIT_NOTIONS_MODULE_FAILED,
  DELETE_NOTIONS_MODULE_SUCCESS,
  DELETE_NOTIONS_MODULE,
  DELETE_NOTIONS_MODULE_FAILED,
  ORDER_NOTIONS_MODULE_SUCCESS,
  ORDER_NOTIONS_MODULE,
  ORDER_NOTIONS_MODULE_FAILED,
  INIT_ERROR_NOTION
} from "../../constants/actionTypes";

export const getNotionsModuleByIDSuccess = (notions) => ({
  type: GET_NOTIONS_MODULE_BY_ID_SUCCESS,
  payload: notions,
});

export const getNotionsModuleByID = (moduleInstanceId) => ({
  type: GET_NOTIONS_MODULE_BY_ID,
  payload: { moduleInstanceId },
});

export const getNotionsModuleByIDFailed = (error) => ({
  type: GET_NOTIONS_MODULE_BY_ID_FAILED,
  payload: error,
});

export const addNotionsModuleSuccess = (notion) => ({
  type: ADD_NOTIONS_MODULE_SUCCESS,
  payload: notion,
});

export const addNotionsModule = (
  moduleInstanceId,
  notionOrder,
  title,
  content,
  mediaPath
) => ({
  type: ADD_NOTIONS_MODULE,
  payload: { moduleInstanceId, notionOrder, title, content, mediaPath },
});

export const addNotionsModuleFailed = (error) => ({
  type: ADD_NOTIONS_MODULE_FAILED,
  payload: error,
});

export const editNotionsModuleSuccess = (notion) => ({
  type: EDIT_NOTIONS_MODULE_SUCCESS,
  payload: notion,
});

export const editNotionsModule = (
  notionId,
  moduleInstanceId,
  notionOrder,
  title,
  content,
  mediaPath
) => ({
  type: EDIT_NOTIONS_MODULE,
  payload: {
    notionId,
    moduleInstanceId,
    notionOrder,
    title,
    content,
    mediaPath,
  },
});

export const editNotionsModuleFailed = (error) => ({
  type: EDIT_NOTIONS_MODULE_FAILED,
  payload: error,
});

export const deleteNotionsModuleSuccess = (notionId) => ({
  type: DELETE_NOTIONS_MODULE_SUCCESS,
  payload: notionId,
});

export const deleteNotionsModule = (notionId) => ({
  type: DELETE_NOTIONS_MODULE,
  payload: { notionId },
});

export const deleteNotionsModuleFailed = (error) => ({
  type: DELETE_NOTIONS_MODULE_FAILED,
  payload: error,
});
export const orderNotionsModuleSuccess = (notions) => ({
  type: ORDER_NOTIONS_MODULE_SUCCESS,
  payload: notions,
});

export const orderNotionsModule = (moduleInstanceId, data) => ({
  type: ORDER_NOTIONS_MODULE,
  payload: {moduleInstanceId, data},
});

export const orderNotionsModuleFailed = (error) => ({
  type: ORDER_NOTIONS_MODULE_FAILED,
  payload: error,
});

export const initSuccessNotion = () => ({
  type: INIT_SUCCESS_NOTION,
  payload: {},
});
export const initErrorNotion = () => ({
  type: INIT_ERROR_NOTION,
  payload: {},
});
