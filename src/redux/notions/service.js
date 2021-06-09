import { httpClient_get, httpClient_post } from "../../helpers/api";

function getNotionsModuleByIDService(moduleInstanceId) {
  return httpClient_get(
    `/moderator/getnotions?moduleInstanceId=${moduleInstanceId}`
  )
    .then((response) => {
      //console.log("response.data ********************** \n", response.data);
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

function addNotionsModuleService({
  moduleInstanceId,
  notionOrder,
  title,
  content,
  mediaPath,
}) {
  return httpClient_post(`/moderator/addnotion`, {
    moduleInstanceId,
    notionOrder,
    title,
    content,
    mediaPath,
  })
    .then((response) => {
      //console.log("response.data ********************** \n", response.data);
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

function editNotionsModuleService({
  notionId,
  moduleInstanceId,
  notionOrder,
  title,
  content,
  mediaPath,
}) {
  return httpClient_post(`/moderator/updatenotion`, {
    moduleInstanceId,
    notionId,
    notionOrder,
    title,
    content,
    mediaPath,
  })
    .then((response) => {
      //console.log("response.data ********************** \n", response.data);
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

function deleteNotionsModuleService(notionId) {
  return httpClient_post(`/moderator/deletenotion?notionId=${notionId}`, null)
    .then((response) => {
      //console.log("response.data ********************** \n", response.data);
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

function orderNotionsModuleService(moduleInstanceId, data) {
  return httpClient_post(
    `/moderator/updatenotionsorder?moduleInstanceId=${moduleInstanceId}`,
    data
  )
    .then((response) => {
      //console.log("response.data ********************** \n", response.data);
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export {
  getNotionsModuleByIDService,
  addNotionsModuleService,
  editNotionsModuleService,
  deleteNotionsModuleService,
  orderNotionsModuleService,
};
