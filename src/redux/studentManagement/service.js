import {httpClient_get, httpClient_post} from '../../helpers/api';

function getParticipantsService(trainingSessionId) {
  return httpClient_get(
    `/moderator/getparticipants?trainingSessionId=${trainingSessionId}`,
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function getQuizStatisticsService(trainingSessionId) {
  // return quizStatistics;
  return httpClient_get(
    `/moderator/getquizstatistics?trainingSessionId=${trainingSessionId}`,
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function changeStatusParticipantService({trainingSessionId, userId, status}) {
  return httpClient_post(
    `/moderator/activateparticipant?trainingSessionId=${trainingSessionId}&userId=${userId}&status=${status}`,
    null,
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function getTeamsService(trainingSessionId) {
  return httpClient_get(
    `/moderator/stratedge/getteams?trainingSessionId=${trainingSessionId}`,
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function assignmentTeamsService(list) {
  return httpClient_post(`/moderator/stratedge/updateteamaffectations`, list)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export {
  getParticipantsService,
  changeStatusParticipantService,
  getQuizStatisticsService,
  getTeamsService,
  assignmentTeamsService,
};
