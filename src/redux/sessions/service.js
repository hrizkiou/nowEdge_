import { httpClient_get, httpClient_post } from "../../helpers/api";

function getSessionsModuleByIDService(moduleInstanceId) {
  //return sessionsModule;

  return httpClient_get(
    `/moderator/gettrainingsessions?moduleAffectationId=${moduleInstanceId}`
  )
    .then((response) => {
      //console.log("response.data ********************** \n", response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function addSessionModuleService({
  moduleInstanceId,
  trainingSessionName,
  startDate,
  endDate,
}) {
  const data = { moduleInstanceId, trainingSessionName, startDate, endDate };
  return httpClient_post(`/moderator/addtrainingsession`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function deleteSessionModuleService({ trainingSessionId }) {
  return httpClient_post(
    `/moderator/deletetrainingsession?trainingSessionId=${trainingSessionId}`,
    null
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function archiveSessionModuleService({ trainingSessionId }) {
  return httpClient_post(
    `/moderator/archivetrainingsession?trainingSessionId=${trainingSessionId}`,
    null
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function editSessionModuleService({
  trainingSessionId,
  moduleInstanceId,
  trainingSessionName,
  startDate,
  endDate,
}) {
  const data = {
    trainingSessionId,
    moduleInstanceId,
    trainingSessionName,
    startDate,
    endDate,
  };

//console.log('object', data, )
  return httpClient_post(`/moderator/updatetrainingsession`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export {
  getSessionsModuleByIDService,
  addSessionModuleService,
  deleteSessionModuleService,
  editSessionModuleService,
  archiveSessionModuleService
};
