import {
  INIT_SUCCESS_STUDENT,
  GET_PARTICIPANTS_MODERATOR_FAILED,
  GET_PARTICIPANTS_MODERATOR_SUCCESS,
  GET_PARTICIPANTS_MODERATOR,
  SELECT_PARTICIPANTS_MODERATOR,
  CHANGE_STATUS_PARTICIPANT_MODERATOR,
  CHANGE_STATUS_PARTICIPANT_MODERATOR_SUCCESS,
  CHANGE_STATUS_PARTICIPANT_MODERATOR_FAILED,
  GET_QUIZ_STATISTICS_MODERATOR,
  GET_QUIZ_STATISTICS_MODERATOR_SUCCESS,
  GET_QUIZ_STATISTICS_MODERATOR_FAILED,
  SELECT_QUIZ_STATISTICS_MODERATOR,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILED,
  GET_TEAMS,
  ASSIGNMENT_TEAMS,
  ASSIGNMENT_TEAMS_SUCCESS,
  ASSIGNMENT_TEAMS_FAILED,
} from '../../constants/actionTypes';

export const getParticipants = (trainingSessionId) => ({
  type: GET_PARTICIPANTS_MODERATOR,
  payload: {trainingSessionId},
});

export const getParticipantsSuccess = (participants) => ({
  type: GET_PARTICIPANTS_MODERATOR_SUCCESS,
  payload: participants,
});

export const getParticipantsFailed = (error) => ({
  type: GET_PARTICIPANTS_MODERATOR_FAILED,
  payload: error,
});

export const getTeams = (trainingSessionId) => ({
  type: GET_TEAMS,
  payload: {trainingSessionId},
});

export const getTeamsSuccess = (teams) => ({
  type: GET_TEAMS_SUCCESS,
  payload: teams,
});

export const getTeamsFailed = (error) => ({
  type: GET_TEAMS_FAILED,
  payload: error,
});

export const changeStatusParticipant = (trainingSessionId, userId, status) => ({
  type: CHANGE_STATUS_PARTICIPANT_MODERATOR,
  payload: {trainingSessionId, userId, status},
});

export const changeStatusParticipantSuccess = (data) => ({
  type: CHANGE_STATUS_PARTICIPANT_MODERATOR_SUCCESS,
  payload: data,
});

export const changeStatusParticipantFailed = (error) => ({
  type: CHANGE_STATUS_PARTICIPANT_MODERATOR_FAILED,
  payload: error,
});

export const getQuizStatistics = (trainingSessionId) => ({
  type: GET_QUIZ_STATISTICS_MODERATOR,
  payload: {trainingSessionId},
});

export const getQuizStatisticsSuccess = (quizStatistics) => ({
  type: GET_QUIZ_STATISTICS_MODERATOR_SUCCESS,
  payload: quizStatistics,
});

export const getQuizStatisticsFailed = (error) => ({
  type: GET_QUIZ_STATISTICS_MODERATOR_FAILED,
  payload: error,
});

export const selectParticipant = (participant) => ({
  type: SELECT_PARTICIPANTS_MODERATOR,
  payload: participant,
});

export const selectQuizStatistics = (quizStatistics) => ({
  type: SELECT_QUIZ_STATISTICS_MODERATOR,
  payload: quizStatistics,
});

export const initSuccessStudent = () => ({
  type: INIT_SUCCESS_STUDENT,
  payload: {},
});

export const assignmentTeams = (listAssignment,callback) => ({
  type: ASSIGNMENT_TEAMS,
  payload: {listAssignment,callback},
});

export const assignmentTeamsSuccess = (list) => ({
  type: ASSIGNMENT_TEAMS_SUCCESS,
  payload: list,
});

export const assignmentTeamsFailed = (error) => ({
  type: ASSIGNMENT_TEAMS_FAILED,
  payload: error,
});
