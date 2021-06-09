import { httpClient_get, httpClient_post } from "../../helpers/api";

const getAllConfigurationService = (moduleAffectationId) => {
  return httpClient_get(
    `/moderator/getconfigurations?moduleAffectationId=${moduleAffectationId}`
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const createConfigurationService = ({
  moduleAffectationId,
  moduleInstanceName,
}) => {
  return httpClient_post(`/moderator/addmoduleinstance`, {
    moduleAffectationId,
    moduleInstanceName,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const deleteConfigurationService = (moduleInstanceId) => {
  return httpClient_post(
    `/moderator/deletemoduleinstance?moduleInstanceId=${moduleInstanceId}`,
    null
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const editConfigurationService = ({ moduleInstanceId, moduleInstanceName }) => {
  return httpClient_post(
    `/moderator/updatemoduleinstance?moduleInstanceId=${moduleInstanceId}&moduleInstanceName=${moduleInstanceName}`,
    null
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const duplicateConfigurationService = ({
  moduleInstanceId,
  moduleInstanceName,
  notions,
  quizzes,
  games,
}) => {
  return httpClient_post(
    `/moderator/duplicatemoduleinstance?moduleInstanceId=${moduleInstanceId}&moduleInstanceName=${moduleInstanceName}&withNotions=${notions}&withQuizzes=${quizzes}&withBusinessGame=${games}`,
    null
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export {
  getAllConfigurationService,
  createConfigurationService,
  deleteConfigurationService,
  editConfigurationService,
  duplicateConfigurationService,
};
