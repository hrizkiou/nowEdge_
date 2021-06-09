import {
    GET_ALL_QUIZ,
    GET_ALL_QUIZ_SUCCESS,
    GET_ALL_QUIZ_FAILED,
    GET_ALL_QUIZ_MODERATOR,
    GET_ALL_QUIZ_MODERATOR_SUCCESS,
    GET_ALL_QUIZ_MODERATOR_FAILED, 
    GET_QUIZ,
    GET_QUIZ_SUCCESS,
    GET_QUIZ_FAILED,   
    ADD_QUIZ_MODERATOR,
    ADD_QUIZ_MODERATOR_SUCCESS,
    ADD_QUIZ_MODERATOR_FAILED,
    SELECT_QUIZ,
    DELETE_QUIZ_MODERATOR,
    DELETE_QUIZ_MODERATOR_SUCCESS,
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
    INIT_SUCCESS_QUIZ,
    SAVE_QUIZ,
    SAVE_QUIZ_SUCCESS,
    SAVE_QUIZ_FAILED
} from '../../constants/actionTypes';
import { REHYDRATE } from 'redux-persist';


const INIT_STATE = {
    quizzes: [],
    quizzesModule: [],
    quiz: {},
    selectQuiz: {},
    loading: false
};

const Quiz = (state = INIT_STATE, action) => {

    let quizzesModule;
    let quizSelected;
    switch (action.type) {
        case GET_ALL_QUIZ:
            return { ...state, loading: true };
        case GET_ALL_QUIZ_SUCCESS:
            return { ...state, quizzes: action.payload, loading: false, error: null };
        case GET_ALL_QUIZ_FAILED:
            return { ...state, error: action.payload, loading: false };
        case GET_QUIZ:
            return { ...state, loading: true };
        case GET_QUIZ_SUCCESS:
            return { ...state, quiz: action.payload, loading: false, error: null  };
        case GET_QUIZ_FAILED:
            return { ...state, error: action.payload, loading: false };
        case GET_ALL_QUIZ_MODERATOR:
            return { ...state, loading: true };
        case GET_ALL_QUIZ_MODERATOR_SUCCESS:
            return { ...state, quizzesModule: action.payload, selectQuiz: action.payload.length > 0 ? action.payload[0] : {questions: []},  loading: false, error: null };
        case GET_ALL_QUIZ_MODERATOR_FAILED:
            return { ...state, error: action.payload, loading: false };
        case ADD_QUIZ_MODERATOR:
            return { ...state, loading: true };
        case ADD_QUIZ_MODERATOR_SUCCESS:
            quizzesModule = state.quizzesModule;
            quizzesModule.push(action.payload);
            return { ...state, quizzesModule, selectQuiz: action.payload,  loading: false,  addSuccess: true, error: null };
        case ADD_QUIZ_MODERATOR_FAILED:
            return { ...state, error: action.payload, loading: false };
        case DELETE_QUIZ_MODERATOR:
            return { ...state, loading: true };
        case DELETE_QUIZ_MODERATOR_SUCCESS:
            quizzesModule = state.quizzesModule;
            quizzesModule = quizzesModule.filter((quiz) => {
                return quiz.id !== action.payload;
            });
            return { ...state, quizzesModule, selectQuiz: {},  loading: false,  deleteSuccess: true, error: null };
        case DELETE_QUIZ_MODERATOR_FAILED:
            return { ...state, error: action.payload, loading: false };

        case EDIT_QUIZ_MODERATOR:
            return { ...state, loading: true };
        case EDIT_QUIZ_MODERATOR_SUCCESS:
            quizzesModule = state.quizzesModule;
            quizzesModule = quizzesModule.map((quiz) => {
              if (quiz.id === action.payload.id) {
                quiz = { ...action.payload };
              }
              return quiz;
            });

            return { ...state, quizzesModule, selectQuiz: action.payload,  loading: false,  editSuccess: true, error: null };
        case EDIT_QUIZ_MODERATOR_FAILED:
            return { ...state, error: action.payload, loading: false };

        case ADD_QUESTION_QUIZ_MODERATOR:
            return { ...state, loading: true };
        case ADD_QUESTION_QUIZ_MODERATOR_SUCCESS:
            quizzesModule = state.quizzesModule;
            quizzesModule = quizzesModule.map((quiz) => {
              if (quiz.id === action.payload.quizId) {
                quiz.questions.push(action.payload);
              }
              return quiz;
            });

            return { ...state, quizzesModule, loading: false,  addQuestionSuccess: true, error: null };
        case ADD_QUESTION_QUIZ_MODERATOR_FAILED:
            return { ...state, error: action.payload, loading: false };


        case DELETE_QUESTION_QUIZ_MODERATOR:
            return { ...state, loading: true };
        case DELETE_QUESTION_QUIZ_MODERATOR_SUCCESS:
            quizzesModule = state.quizzesModule;
            quizzesModule = quizzesModule.map((quiz) => {
              if (quiz.id === action.payload.quizId) {
                const questions = quiz.questions.filter((question) => {
                    return question.questionId !== action.payload.questionId;
                });
                quiz.questions = questions;
                quizSelected = quiz;
              }

              return quiz;
            });

            return { ...state, quizzesModule: quizzesModule, selectQuiz: quizSelected,  loading: false,  deleteQuestionSuccess: true, error: null };
        case DELETE_QUESTION_QUIZ_MODERATOR_FAILED:
            return { ...state, error: action.payload, loading: false };

        case EDIT_QUESTION_QUIZ_MODERATOR:
            return { ...state, loading: true };
        case EDIT_QUESTION_QUIZ_MODERATOR_SUCCESS:
            quizzesModule = state.quizzesModule;
            quizzesModule = quizzesModule.map((quiz) => {
              if (quiz.id === action.payload.quizId) {
                const questions = quiz.questions.map((question) => {
                    if(question.questionId === action.payload.questionId)
                    {
                        question = action.payload
                    }
                    return question;
                });
                quiz.questions = questions;
                quizSelected = quiz;
              }

              return quiz;
            });

            return { ...state, quizzesModule: quizzesModule, selectQuiz: quizSelected,  loading: false,  editQuestionSuccess: true, error: null };
        case EDIT_QUESTION_QUIZ_MODERATOR_FAILED:
            return { ...state, error: action.payload, loading: false };



        case SELECT_QUIZ:
            return { ...state, selectQuiz: action.payload, loading: false };

        case INIT_SUCCESS_QUIZ:
            return {
            ...state,
            addSuccess: false,
            deleteSuccess: false,
            editSuccess: false,
            addQuestionSuccess: false,
            editQuestionSuccess: false,
            deleteQuestionSuccess: false,
            };
        
        case REHYDRATE:
        
                return action.payload  ? {
                        ...state,
                        ...action.payload.Quiz
                } : {
                    ...state,
                    
                }

        case SAVE_QUIZ:
            return { ...state, loading: true };
        case SAVE_QUIZ_SUCCESS:
            return { ...state, resultsQuiz: action.payload, loading: false, error: null };
        case SAVE_QUIZ_FAILED:
            return { ...state, error: action.payload, loading: false };

        default: return { ...state };
    }
}

export default Quiz;