import {
  GET_STRAT_EDGE_CONFIGURATION,
  GET_STRAT_EDGE_CONFIGURATION_SUCCESS,
  GET_STRAT_EDGE_CONFIGURATION_FAILED,
  GET_STRAT_EDGE_CONFIGURATION_PARTICIPANT,
  GET_STRAT_EDGE_CONFIGURATION_PARTICIPANT_SUCCESS,
  GET_STRAT_EDGE_CONFIGURATION_PARTICIPANT_FAILED,
  UPDATE_STRAT_EDGE_PRODUCT,
  UPDATE_STRAT_EDGE_PRODUCT_SUCCESS,
  UPDATE_STRAT_EDGE_PRODUCT_FAILED,
  UPDATE_STRAT_EDGE_COMPETITOR,
  UPDATE_STRAT_EDGE_COMPETITOR_SUCCESS,
  UPDATE_STRAT_EDGE_COMPETITOR_FAILED,
  UPDATE_STRAT_EDGE_STRATEGIC_DECISION,
  UPDATE_STRAT_EDGE_STRATEGIC_DECISION_SUCCESS,
  UPDATE_STRAT_EDGE_STRATEGIC_DECISION_FAILED,
  START_SIMULATION,
  UPDATE_STRAT_EDGE_MARKET,
  UPDATE_STRAT_EDGE_MARKET_FAILED,
  UPDATE_STRAT_EDGE_MARKET_SUCCESS,
  GET_STRAT_EDGE_RESULT,
  GET_STRAT_EDGE_RESULT_SUCCESS,
  GET_STRAT_EDGE_RESULT_FAILED,
  GET_STRAT_EDGE_RESULT_PARTICIPANT,
  GET_STRAT_EDGE_RESULT_PARTICIPANT_SUCCESS,
  GET_STRAT_EDGE_RESULT_PARTICIPANT_FAILED,
  START_OR_STOP_ROUND,
  START_OR_STOP_ROUND_SUCCESS,
  START_OR_STOP_ROUND_FAILED,
  INIT_SIMULATION,
  INIT_SIMULATION_SUCCESS,
  INIT_SIMULATION_FAILED,
  RUN_SIMULATION,
  RUN_SIMULATION_SUCCESS,
  RUN_SIMULATION_FAILED,
  ADD_DECISION_SIMULATION,
  SAVE_SCENARIO,
  SAVE_SCENARIO_SUCCESS,
  SAVE_SCENARIO_FAILED,
  INIT_SAVE_SCENARIO_SUCCESS,
  GET_SCENARIOS,
  GET_SCENARIOS_SUCCESS,
  DELETE_SCENARIO,
  DELETE_SCENARIO_SUCCESS,
  DELETE_SCENARIO_FAILED,
  GET_SCENARIOS_FAILED,
  SEND_DECISION,
  SEND_DECISION_SUCCESS,
  SEND_DECISION_FAILED,
  INIT_DELETE_SCENARIO_SUCCESS,
  INIT_SEND_DECISION_SUCCESS,
  INIT_STRAT_EDGE,
  CHOOSE_DECISION,
  CHOOSE_DECISION_SUCCESS,
  CHOOSE_DECISION_FAILED,
  GET_STRAT_EDGE_GAME_SESSION_CONFIGURATION,
} from '../../constants/actionTypes';

export const initStratEdge = () => ({
  type: INIT_STRAT_EDGE,
  payload: {},
});
export const initSendDecisionSuccess = () => ({
  type: INIT_SEND_DECISION_SUCCESS,
  payload: {},
});

export const initScenarioSaveSuccess = () => ({
  type: INIT_SAVE_SCENARIO_SUCCESS,
  payload: {},
});

export const initScenarioDeleteSuccess = () => ({
  type: INIT_DELETE_SCENARIO_SUCCESS,
  payload: {},
});

export const sendDecision = (roundScenarioId, getScenariosObj) => ({
  type: SEND_DECISION,
  payload: {roundScenarioId, getScenariosObj},
});

export const sendDecisionSuccess = (roundScenarioId) => ({
  type: SEND_DECISION_SUCCESS,
  payload: roundScenarioId,
});

export const sendDecisionFailed = (error) => ({
  type: SEND_DECISION_FAILED,
  payload: error,
});

export const deleteScenario = (roundScenarioId) => ({
  type: DELETE_SCENARIO,
  payload: {roundScenarioId},
});

export const deleteScenarioSuccess = (roundScenarioId) => ({
  type: DELETE_SCENARIO_SUCCESS,
  payload: roundScenarioId,
});

export const deleteScenarioFailed = (error) => ({
  type: DELETE_SCENARIO_FAILED,
  payload: error,
});

export const getScenarios = (gameSessionId, roundId) => ({
  type: GET_SCENARIOS,
  payload: {gameSessionId, roundId},
});

export const getScenariosSuccess = (scenarios) => ({
  type: GET_SCENARIOS_SUCCESS,
  payload: scenarios,
});

export const getScenariosFailed = (error) => ({
  type: GET_SCENARIOS_FAILED,
  payload: error,
});

export const runSimulations = (simulationObj, callback) => ({
  type: RUN_SIMULATION,
  payload: {simulationObj, callback},
});

export const runSimulationsSuccess = (resultSimulation) => ({
  type: RUN_SIMULATION_SUCCESS,
  payload: resultSimulation,
});

export const runSimulationsFailed = (error) => ({
  type: RUN_SIMULATION_FAILED,
  payload: error,
});

export const saveScenario = (scenario) => ({
  type: SAVE_SCENARIO,
  payload: {scenario},
});

export const saveScenarioSuccess = (scenario) => ({
  type: SAVE_SCENARIO_SUCCESS,
  payload: scenario,
});

export const saveScenarioFailed = (error) => ({
  type: SAVE_SCENARIO_FAILED,
  payload: error,
});

export const initSimulations = (configParticipant, resultParticipant) => ({
  type: INIT_SIMULATION,
  payload: {configParticipant, resultParticipant},
});

export const initSimulationsSuccess = (simulation) => ({
  type: INIT_SIMULATION_SUCCESS,
  payload: simulation,
});

export const initSimulationsFailed = (error) => ({
  type: INIT_SIMULATION_FAILED,
  payload: error,
});

export const addDecisionSimulations = (teamId, type, id) => ({
  type: ADD_DECISION_SIMULATION,
  payload: {teamId, type, id},
});

export const getStratEdgeConfiguration = (gameConfigurationId) => ({
  type: GET_STRAT_EDGE_CONFIGURATION,
  payload: {gameConfigurationId},
});

export const getStratEdgeConfigurationSuccess = (config) => ({
  type: GET_STRAT_EDGE_CONFIGURATION_SUCCESS,
  payload: config,
});

export const getStratEdgeConfigurationFailed = (error) => ({
  type: GET_STRAT_EDGE_CONFIGURATION_FAILED,
  payload: error,
});

export const getStratEdgeConfigurationParticipant = (
  gameSessionId,
  callback,
  history,
  loading
) => ({
  type: GET_STRAT_EDGE_CONFIGURATION_PARTICIPANT,
  payload: {gameSessionId, callback,loading, history},
});

export const getStratEdgeGameSessionConfiguration = (gameSessionId) => ({
  type: GET_STRAT_EDGE_GAME_SESSION_CONFIGURATION,
  payload: {gameSessionId},
});

export const getStratEdgeConfigurationParticipantSuccess = (config) => ({
  type: GET_STRAT_EDGE_CONFIGURATION_PARTICIPANT_SUCCESS,
  payload: config,
});

export const getStratEdgeConfigurationParticipantFailed = (error) => ({
  type: GET_STRAT_EDGE_CONFIGURATION_PARTICIPANT_FAILED,
  payload: error,
});

export const getStratEdgeResult = (gameSessionId) => ({
  type: GET_STRAT_EDGE_RESULT,
  payload: {gameSessionId},
});

export const getStratEdgeResultSuccess = (results) => ({
  type: GET_STRAT_EDGE_RESULT_SUCCESS,
  payload: results,
});

export const getStratEdgeResultFailed = (error) => ({
  type: GET_STRAT_EDGE_RESULT_FAILED,
  payload: error,
});

export const getStratEdgeResultParticipant = (gameSessionId) => ({
  type: GET_STRAT_EDGE_RESULT_PARTICIPANT,
  payload: {gameSessionId},
});

export const getStratEdgeResultParticipantSuccess = (results) => ({
  type: GET_STRAT_EDGE_RESULT_PARTICIPANT_SUCCESS,
  payload: results,
});

export const getStratEdgeResultParticipantFailed = (error) => ({
  type: GET_STRAT_EDGE_RESULT_PARTICIPANT_FAILED,
  payload: error,
});

export const startOrStopRound = (roundId, status, gameSessionId) => ({
  type: START_OR_STOP_ROUND,
  payload: {roundId, status, gameSessionId},
});

export const startOrStopRoundSuccess = (results) => ({
  type: START_OR_STOP_ROUND_SUCCESS,
  payload: null,
});

export const startOrStopRoundFailed = (error) => ({
  type: START_OR_STOP_ROUND_FAILED,
  payload: error,
});
// -----------------------

export const updateStratEdgeProduct = (product) => ({
  type: UPDATE_STRAT_EDGE_PRODUCT,
  payload: {product},
});

export const updateStratEdgeProductSuccess = (product) => ({
  type: UPDATE_STRAT_EDGE_PRODUCT_SUCCESS,
  payload: product,
});

export const updateStratEdgeProductFailed = (error) => ({
  type: UPDATE_STRAT_EDGE_PRODUCT_FAILED,
  payload: error,
});
// -----------------------

export const updateStratEdgeCompetitor = (competitor) => ({
  type: UPDATE_STRAT_EDGE_COMPETITOR,
  payload: {competitor},
});

export const updateStratEdgeCompetitorSuccess = (competitor) => ({
  type: UPDATE_STRAT_EDGE_COMPETITOR_SUCCESS,
  payload: competitor,
});

export const updateStratEdgeCompetitorFailed = (error) => ({
  type: UPDATE_STRAT_EDGE_COMPETITOR_FAILED,
  payload: error,
});

// -----------------------
export const updateStratEdgeStrategicDecision = (strategicDecision) => ({
  type: UPDATE_STRAT_EDGE_STRATEGIC_DECISION,
  payload: {strategicDecision},
});

export const updateStratEdgeStrategicDecisionSuccess = (strategicDecision) => ({
  type: UPDATE_STRAT_EDGE_STRATEGIC_DECISION_SUCCESS,
  payload: strategicDecision,
});

export const updateStratEdgeStrategicDecisionFailed = (error) => ({
  type: UPDATE_STRAT_EDGE_STRATEGIC_DECISION_FAILED,
  payload: error,
});

// -----------------------

export const updateStratEdgeMarket = (market) => ({
  type: UPDATE_STRAT_EDGE_MARKET,
  payload: {market},
});

export const updateStratEdgeMarketSuccess = (market) => ({
  type: UPDATE_STRAT_EDGE_MARKET_SUCCESS,
  payload: market,
});

export const updateStratEdgeMarketFailed = (error) => ({
  type: UPDATE_STRAT_EDGE_MARKET_FAILED,
  payload: error,
});
export const chooseDecision = (decision, competitorParams, add = true) => ({
  type: CHOOSE_DECISION,
  payload: {decision, competitorParams, add},
});

export const chooseDecisionSuccess = (teamParams) => ({
  type: CHOOSE_DECISION_SUCCESS,
  payload: teamParams,
});

export const StartSimulation = (bool) => ({
  type: START_SIMULATION,
  payload: bool,
});

export const chooseDecisionFailed = (error) => ({
  type: CHOOSE_DECISION_FAILED,
  payload: error,
});
