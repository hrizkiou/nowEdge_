import { httpClient_get, httpClient_post } from "../../helpers/api";
import { getLoggedInUser } from "../../helpers/authUtils";

function getAllQuizService(trainingSessionId) {

  const { id } = getLoggedInUser().role;

  // let url = `/${name.toLowerCase()}/getquizzes?trainingSessionId=${trainingSessionId}`;

  const url = id !== 3 ?
                          `/moderator/showquizzes?trainingSessionId=${trainingSessionId}`
                       :
                          `/participant/getquizzes?trainingSessionId=${trainingSessionId}`;


  return httpClient_get(url)
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function getQuizService(quizCompetitionId, quizId) {
  const { id } = getLoggedInUser().role;

  const url = id !== 3 ?
                          `/moderator/showquiz?quizCompetitionId=${quizCompetitionId}&quizId=${quizId}`
                       :
                          `/participant/getquiz?quizCompetitionId=${quizCompetitionId}&quizId=${quizId}`;

  return httpClient_get(url)
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function saveQuizResultsService(results) {
  return httpClient_post(`/participant/postquiz`, results)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function getAllQuizModeratorService(moduleInstanceId) {
  return httpClient_get(
    `/moderator/getquizzes?moduleInstanceId=${moduleInstanceId}`
  )
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function addQuizModeratorService({ moduleInstanceId, name, estimatedTime }) {
  return httpClient_post(`/moderator/addquiz`, {
    moduleInstanceId,
    name,
    estimatedTime,
  })
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function deleteQuizModeratorService({ quizId }) {
  return httpClient_post(`/moderator/deletequiz?quizId=${quizId}`, null)
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function editQuizModeratorService({
  id,
  name,
  estimatedTime,
  moduleInstanceId,
}) {
  return httpClient_post(`/moderator/updatequiz`, {
    id,
    name,
    estimatedTime,
    moduleInstanceId,
  })
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function addQuestionQuizModeratorService({
  title,
  answer1,
  answer2,
  answer3,
  answer4,
  correctAnswer,
  quizId,
}) {

  console.log(`{
    title,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer,
    quizId,
  } :>> `, {
    title,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer,
    quizId,
  });
  return httpClient_post(`/moderator/addquestion`, {
    title,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer,
    quizId,
  })
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}


function editQuestionQuizModeratorService({
  questionId,
  title,
  answer1,
  answer2,
  answer3,
  answer4,
  correctAnswer,
  quizId,
}) {
  return httpClient_post(`/moderator/updatequestion`, {
    questionId,
    title,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer,
    quizId,
  })
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}


function deleteQuestionQuizModeratorService({
  moduleInstanceId,
  questionId
}) {
  return httpClient_post(`/moderator/deletequestion?moduleInstanceId=${moduleInstanceId}&questionId=${questionId}`, null)
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export {
  getAllQuizService,
  getQuizService,
  saveQuizResultsService,
  getAllQuizModeratorService,
  addQuizModeratorService,
  deleteQuizModeratorService,
  editQuizModeratorService,
  addQuestionQuizModeratorService,
  deleteQuestionQuizModeratorService,
  editQuestionQuizModeratorService
};
