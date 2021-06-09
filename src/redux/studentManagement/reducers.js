import { REHYDRATE } from 'redux-persist';

import { ASSIGNMENT_TEAMS, ASSIGNMENT_TEAMS_FAILED, ASSIGNMENT_TEAMS_SUCCESS, CHANGE_STATUS_PARTICIPANT_MODERATOR, CHANGE_STATUS_PARTICIPANT_MODERATOR_FAILED, CHANGE_STATUS_PARTICIPANT_MODERATOR_SUCCESS, GET_PARTICIPANTS_MODERATOR, GET_PARTICIPANTS_MODERATOR_FAILED, GET_PARTICIPANTS_MODERATOR_SUCCESS, GET_QUIZ_STATISTICS_MODERATOR, GET_QUIZ_STATISTICS_MODERATOR_FAILED, GET_QUIZ_STATISTICS_MODERATOR_SUCCESS, GET_TEAMS, GET_TEAMS_FAILED, GET_TEAMS_SUCCESS, INIT_SUCCESS_STUDENT, SELECT_PARTICIPANTS_MODERATOR, SELECT_QUIZ_STATISTICS_MODERATOR } from '../../constants/actionTypes';

const INIT_STATE = {
  participants: [],
  selectedParticipant: {},
  quizStatistics: [],
  selectedQuizStatistics: {},
  loading: false,
  teams: [],
};

const StudentManagement = (state = INIT_STATE, action) => {
  let selectedParticipant, participants, selectedQuizStatistics;
  switch (action.type) {
    case GET_PARTICIPANTS_MODERATOR:
      return {...state, loading: true, error: null};
    case GET_PARTICIPANTS_MODERATOR_SUCCESS:
      if (action.payload && action.payload.length > 0) {
        selectedParticipant = action.payload[0];
      }
      return {
        ...state,
        participants: action.payload,
        selectedParticipant,
        loading: false,
        error: null,
      };
    case GET_PARTICIPANTS_MODERATOR_FAILED:
      return {...state, error: action.payload, loading: false};

    case GET_QUIZ_STATISTICS_MODERATOR:
      return {...state, loading: true, error: null};
    case GET_QUIZ_STATISTICS_MODERATOR_SUCCESS:
      if (
        action.payload &&
        action.payload.quizStatisticsSet &&
        action.payload.quizStatisticsSet.length > 0
      ) {
        //console.log(
        //   'action.payload.questionStatisticsSet',
        //   action.payload.quizStatisticsSet[0],
        // );
        selectedQuizStatistics = action.payload.quizStatisticsSet[0];
      }
      return {
        ...state,
        quizStatistics: action.payload,
        selectedQuizStatistics,
        loading: false,
        error: null,
      };
    case GET_QUIZ_STATISTICS_MODERATOR_FAILED:
      return {...state, error: action.payload, loading: false};

    case SELECT_PARTICIPANTS_MODERATOR:
      return {...state, selectedParticipant: action.payload, loading: false};

    case SELECT_QUIZ_STATISTICS_MODERATOR:
      return {...state, selectedQuizStatistics: action.payload, loading: false};

    case CHANGE_STATUS_PARTICIPANT_MODERATOR:
      return {...state, loading: true, error: null};

    case CHANGE_STATUS_PARTICIPANT_MODERATOR_SUCCESS:
      participants = state.participants;
      selectedParticipant = state.selectedParticipant;
      participants = participants.map((participant) => {
        if (participant.user.id === action.payload.userId) {
          participant = {...participant, active: action.payload.status};
          selectedParticipant = participant;
        }
        return participant;
      });
      return {
        ...state,
        loading: false,
        error: null,
        participants,
        selectedParticipant,
      };

    case CHANGE_STATUS_PARTICIPANT_MODERATOR_FAILED:
      return {...state, error: action.payload, loading: false};

    case INIT_SUCCESS_STUDENT:
      return {
        ...state,
        addSuccess: false,
        deleteSuccess: false,
        editSuccess: false,
        archiveSuccess: false,
      };

    case GET_TEAMS:
      return {...state, loading: true, error: null};
    case GET_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.payload,
        loading: false,
        error: null,
      };
    case GET_TEAMS_FAILED:
      return {...state, error: action.payload, loading: false};

    case ASSIGNMENT_TEAMS:
      return {...state, loading: true, error: null};
    case ASSIGNMENT_TEAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ASSIGNMENT_TEAMS_FAILED:
      return {...state, error: action.payload, loading: false};

    case REHYDRATE:
      return action.payload
        ? {
            ...state,
            ...action.payload.StudentManagement,
          }
        : {
            ...state,
          };
    default:
      return {...state};
  }
};

export default StudentManagement;
