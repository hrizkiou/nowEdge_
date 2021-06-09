import {
  GET_ALL_QUIZ,
  GET_ALL_QUIZ_SUCCESS,
  GET_ALL_QUIZ_FAILED,
  GET_ALL_QUIZ_MODERATOR,
  GET_ALL_QUIZ_MODERATOR_SUCCESS,
  GET_ALL_QUIZ_MODERATOR_FAILED,
  GET_QUIZ,
  GET_QUIZ_SUCCESS,
  SELECT_QUIZ,
  GET_QUIZ_FAILED,
  ADD_QUIZ_MODERATOR_SUCCESS,
  ADD_QUIZ_MODERATOR_FAILED,
  ADD_QUIZ_MODERATOR,
  INIT_SUCCESS_QUIZ,
  DELETE_QUIZ_MODERATOR_SUCCESS,
  DELETE_QUIZ_MODERATOR,
  DELETE_QUIZ_MODERATOR_FAILED,
  EDIT_QUIZ_MODERATOR,
  EDIT_QUIZ_MODERATOR_SUCCESS,
  EDIT_QUIZ_MODERATOR_FAILED,
  ADD_QUESTION_QUIZ_MODERATOR,
  ADD_QUESTION_QUIZ_MODERATOR_SUCCESS,
  ADD_QUESTION_QUIZ_MODERATOR_FAILED,
  DELETE_QUESTION_QUIZ_MODERATOR,
  DELETE_QUESTION_QUIZ_MODERATOR_SUCCESS,
  DELETE_QUESTION_QUIZ_MODERATOR_FAILED,
  EDIT_QUESTION_QUIZ_MODERATOR,
  EDIT_QUESTION_QUIZ_MODERATOR_SUCCESS,
  EDIT_QUESTION_QUIZ_MODERATOR_FAILED,
  SAVE_QUIZ,
  SAVE_QUIZ_SUCCESS,
  SAVE_QUIZ_FAILED,
} from "../../constants/actionTypes";

export const getAllQuizSuccess = (quiz) => ({
  type: GET_ALL_QUIZ_SUCCESS,
  payload: quiz,
});

export const getAllQuiz = (trainingSessionId) => {
  return {
    type: GET_ALL_QUIZ,
    payload: { trainingSessionId },
  };
};

export const getAllQuizFailed = (error) => ({
  type: GET_ALL_QUIZ_FAILED,
  payload: error,
});

export const getQuizSuccess = (quiz) => ({
  type: GET_QUIZ_SUCCESS,
  payload: quiz,
});

export const getQuiz = (quizCompetitionId, quizId) => ({
  type: GET_QUIZ,
  payload: { quizCompetitionId, quizId },
});

export const getQuizFailed = (error) => ({
  type: GET_QUIZ_FAILED,
  payload: error,
});

export const saveQuiz = (results, trainingSessionId) => ({
  type: SAVE_QUIZ,
  payload: { results, trainingSessionId },
});

export const getQuizzesModuleByIDSuccess = (quizzesModule) => ({
  type: GET_ALL_QUIZ_MODERATOR_SUCCESS,
  payload: quizzesModule,
});

export const getQuizzesModuleByID = (moduleInstanceId) => ({
  type: GET_ALL_QUIZ_MODERATOR,
  payload: { moduleInstanceId },
});

export const getQuizzesModuleByIDFailed = (error) => ({
  type: GET_ALL_QUIZ_MODERATOR_FAILED,
  payload: error,
});

export const addQuizModuleByIDSuccess = (quizModule) => ({
  type: ADD_QUIZ_MODERATOR_SUCCESS,
  payload: quizModule,
});

export const addQuizModuleByID = ({
  moduleInstanceId,
  name,
  estimatedTime,
}) => ({
  type: ADD_QUIZ_MODERATOR,
  payload: {
    moduleInstanceId,
    name,
    estimatedTime,
  },
});

export const addQuizModuleByIDFailed = (error) => ({
  type: ADD_QUIZ_MODERATOR_FAILED,
  payload: error,
});

export const deleteQuizModuleByIDSuccess = (quizModule) => ({
  type: DELETE_QUIZ_MODERATOR_SUCCESS,
  payload: quizModule,
});

export const editQuizModuleByID = ({
  id,
  name,
  estimatedTime,
  moduleInstanceId,
}) => ({
  type: EDIT_QUIZ_MODERATOR,
  payload: {
    id,
    name,
    estimatedTime,
    moduleInstanceId,
  },
});


export const editQuizModuleByIDSuccess = (quizModule) => ({
  type: EDIT_QUIZ_MODERATOR_SUCCESS,
  payload: quizModule,
});

export const editQuizModuleByIDFailed = (error) => ({
  type: EDIT_QUIZ_MODERATOR_FAILED,
  payload: error,
});

export const deleteQuizModuleByID = (quizId) => ({
  type: DELETE_QUIZ_MODERATOR,
  payload: {quizId},
});

export const deleteQuizModuleByIDFailed = (error) => ({
  type: DELETE_QUIZ_MODERATOR_FAILED,
  payload: error,
});

export const selectQuiz = (quiz) => ({
  type: SELECT_QUIZ,
  payload: quiz,
});


export const initSuccessQuiz = () => ({
  type: INIT_SUCCESS_QUIZ,
  payload: {},
});


export const addQuestionQuizModuleByID = ({
  title,
  answer1,
  answer2,
  answer3,
  answer4,
  correctAnswer,
  quizId,
}) => ({
  type: ADD_QUESTION_QUIZ_MODERATOR,
  payload: {
    title,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer,
    quizId,  
  },
});


export const addQuestionQuizModuleByIDSuccess = (questionQuizModule) => ({
  type: ADD_QUESTION_QUIZ_MODERATOR_SUCCESS,
  payload: questionQuizModule,
});

export const addQuestionQuizModuleByIDFailed = (error) => ({
  type: ADD_QUESTION_QUIZ_MODERATOR_FAILED,
  payload: error,
});

export const editQuestionQuizModuleByID = ({
  questionId,
  title,
  answer1,
  answer2,
  answer3,
  answer4,
  correctAnswer,
  quizId,
}) => ({
  type: EDIT_QUESTION_QUIZ_MODERATOR,
  payload: {
    questionId,
    title,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer,
    quizId,  
  },
});


export const editQuestionQuizModuleByIDSuccess = (questionQuizModule) => ({
  type: EDIT_QUESTION_QUIZ_MODERATOR_SUCCESS,
  payload: questionQuizModule,
});

export const editQuestionQuizModuleByIDFailed = (error) => ({
  type: EDIT_QUESTION_QUIZ_MODERATOR_FAILED,
  payload: error,
});


export const deleteQuestionQuizModuleByID = ({
  quizId,
  moduleInstanceId,
  questionId
}) => ({
  type: DELETE_QUESTION_QUIZ_MODERATOR,
  payload: {
    quizId,
    moduleInstanceId,
    questionId
  },
});


export const deleteQuestionQuizModuleByIDSuccess = (questionQuizModule) => ({
  type: DELETE_QUESTION_QUIZ_MODERATOR_SUCCESS,
  payload: questionQuizModule,
});

export const deleteQuestionQuizModuleByIDFailed = (error) => ({
  type: DELETE_QUESTION_QUIZ_MODERATOR_FAILED,
  payload: error,
});


export const saveQuizSuccess = (results) => ({
  type: SAVE_QUIZ_SUCCESS,
  payload: results,
});

export const saveQuizFailed = (error) => ({
  type: SAVE_QUIZ_FAILED,
  payload: error,
});