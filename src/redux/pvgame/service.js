import { httpClient_get, httpClient_post } from "../../helpers/api";

const getCenterInfoService = (gameSessionId) => {
  return httpClient_get(
    `/participant/pvgame/getcenter?gameSessionId=${gameSessionId}`
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export { getCenterInfoService };

const updateCenterInfoService = (
  gameSessionId,
  name,
  avatarId,
  countryId,
  responsibilityId
) => {
  return httpClient_post(`/participant/pvgame/updatecenter`, {
    gameSessionId,
    name,
    avatarId,
    countryId,
    responsibilityId,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getScoreService = (centerId) => {
  return httpClient_get(`/participant/pvgame/getscore?centerId=${centerId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getScoreGlobalService = (gameSessionId) => {
  return httpClient_get(`/participant/pvgame/getscores?gameSessionId=${gameSessionId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getScoreGlobalModeratorService = (gameSessionId) => {
  return httpClient_get(`/moderator/pvgame/getscores?gameSessionId=${gameSessionId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export { updateCenterInfoService , getScoreService , getScoreGlobalService, getScoreGlobalModeratorService};
