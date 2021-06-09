import {all, call, fork, put, takeEvery} from 'redux-saga/effects';

import {
  GET_STRAT_EDGE_CONFIGURATION,
  GET_STRAT_EDGE_RESULT,
  UPDATE_STRAT_EDGE_PRODUCT,
  UPDATE_STRAT_EDGE_COMPETITOR,
  UPDATE_STRAT_EDGE_MARKET,
  UPDATE_STRAT_EDGE_STRATEGIC_DECISION,
  START_OR_STOP_ROUND,
  GET_STRAT_EDGE_RESULT_PARTICIPANT,
  GET_STRAT_EDGE_CONFIGURATION_PARTICIPANT,
  INIT_SIMULATION,
  SAVE_SCENARIO,
  RUN_SIMULATION,
  GET_SCENARIOS,
  DELETE_SCENARIO,
  GET_STRAT_EDGE_GAME_SESSION_CONFIGURATION,
  SEND_DECISION,
  CHOOSE_DECISION,
} from '../../constants/actionTypes';
import {
  getStratEdgeConfigurationService,
  updateStratEdgeProductService,
  updateStratEdgeCompetitorService,
  updateStratEdgeMarketService,
  getStratEdgeResultService,
  updateStratEdgeStrategicDecisionService,
  startOrStopRoundService,
  getStratEdgeResultParticipantService,
  getStratEdgeConfigurationParticipantService,
  initSimulationService,
  runSimulationService,
  saveScenarioService,
  getScenariosService,
  deleteScenarioService,
  sendDecisionService,
  chooseDecisionService,
  getStratEdgeGameSessionConfigurationService,
} from './service';
import {
  getStratEdgeConfigurationSuccess,
  updateStratEdgeProductSuccess,
  updateStratEdgeProductFailed,
  updateStratEdgeCompetitorSuccess,
  updateStratEdgeCompetitorFailed,
  updateStratEdgeMarketFailed,
  updateStratEdgeMarketSuccess,
  updateStratEdgeStrategicDecisionSuccess,
  updateStratEdgeStrategicDecisionFailed,
  getStratEdgeResultSuccess,
  getStratEdgeResultFailed,
  startOrStopRoundSuccess,
  startOrStopRoundFailed,
  getStratEdgeResult as getStratEdgeResultAction,
  getStratEdgeConfiguration as getStratEdgeConfigurationAction,
  getStratEdgeGameSessionConfiguration as getStratEdgeGameSessionConfigurationAction,
  getScenarios as getScenariosAction,
  getStratEdgeResultParticipantFailed,
  getStratEdgeResultParticipant as getStratEdgeResultParticipantAction,
  getStratEdgeResultParticipantSuccess,
  getStratEdgeConfigurationParticipantSuccess,
  getStratEdgeConfigurationParticipantFailed,
  initSimulationsSuccess,
  initSimulationsFailed,
  runSimulationsSuccess,
  runSimulationsFailed,
  saveScenarioSuccess,
  saveScenarioFailed,
  getScenariosSuccess,
  getScenariosFailed,
  deleteScenarioSuccess,
  deleteScenarioFailed,
  sendDecisionSuccess,
  sendDecisionFailed,
  chooseDecisionSuccess,
  chooseDecisionFailed,
} from './actions';

function* getScenarios({payload: {gameSessionId, roundId}}) {
  try {
    const response = yield call(getScenariosService, gameSessionId, roundId);
    yield put(getScenariosSuccess(response));
  } catch (error) {
    yield put(getScenariosFailed(error));
  }
}

function* saveScenario({payload: {scenario}}) {
  try {
    //console.log('scenario', scenario);

    const response = yield call(saveScenarioService, scenario);
    yield put(saveScenarioSuccess(response));
  } catch (error) {
    yield put(saveScenarioFailed(error));
  }
}

function* sendDecision({payload: {roundScenarioId, getScenariosObj}}) {
  try {
    const response = yield call(sendDecisionService, roundScenarioId);
    yield put(sendDecisionSuccess(response));
    yield put(
      getScenariosAction(
        getScenariosObj.gameSessionId,
        getScenariosObj.roundId,
      ),
    );
  } catch (error) {
    yield put(sendDecisionSuccess(error));
  }
}

function* deleteScenario({payload: {roundScenarioId}}) {
  try {
    const response = yield call(deleteScenarioService, roundScenarioId);
    yield put(deleteScenarioSuccess(roundScenarioId));
  } catch (error) {
    yield put(deleteScenarioSuccess(roundScenarioId));
  }
}

function* runSimulation({payload: {simulationObj, callback}}) {
  try {
    //console.log('simulationObj', simulationObj);

    const response = yield call(runSimulationService, simulationObj);
    yield put(runSimulationsSuccess(response));
    yield put(callback());
  } catch (error) {
    yield put(runSimulationsFailed(error));
  }
}

function* initSimulation({payload: {configParticipant, resultParticipant}}) {
  try {
    const response = yield call(
      initSimulationService,
      configParticipant,
      resultParticipant,
    );
    yield put(initSimulationsSuccess(response));
  } catch (error) {
    yield put(initSimulationsFailed(error));
  }
}

function* getStratEdgeConfiguration({payload: {gameConfigurationId}}) {
  try {
    const response = yield call(
      getStratEdgeConfigurationService,
      gameConfigurationId,
    );
    yield put(getStratEdgeConfigurationSuccess(response));
  } catch (error) {
    // yield put(getParticipantsFailed(message));
  }
}

function* getStratEdgeGameSessionConfiguration({
  payload: {gameSessionId},
}) {
  try {

    //console.log('gameSessionId', gameSessionId)
    const response = yield call(
      getStratEdgeGameSessionConfigurationService,
      gameSessionId,
    );

    yield put(getStratEdgeConfigurationSuccess(response));
  } catch (error) {
    // yield put(getParticipantsFailed(message));
  }
}

function* getStratEdgeConfigurationParticipant({
  payload: {gameSessionId, callback = () => {},  history},
}) {
  try {
    const response = yield call(
      getStratEdgeConfigurationParticipantService,
      gameSessionId,
    );
    yield put(getStratEdgeConfigurationParticipantSuccess(response));
    callback()
    if(history) history.push('/StratEdge/product-analysis');
  } catch (error) {
    yield put(getStratEdgeConfigurationParticipantFailed(error));
  }
}

function* getStratEdgeResult({payload: {gameSessionId}}) {
  try {
    const response = yield call(getStratEdgeResultService, gameSessionId);
    yield put(getStratEdgeResultSuccess(response));
    //console.log('response.gameSessionId', response.gameSessionId);
    if (response.gameSessionId)
      yield put(getStratEdgeGameSessionConfigurationAction(response.gameSessionId));
  } catch (error) {
    yield put(getStratEdgeResultFailed(error));
  }
}

function* getStratEdgeResultParticipant({payload: {gameSessionId}}) {
  try {
    const response = yield call(
      getStratEdgeResultParticipantService,
      gameSessionId,
    );
    yield put(getStratEdgeResultParticipantSuccess(response));
  } catch (error) {
    yield put(getStratEdgeResultParticipantFailed(error));
  }
}

function* startOrStopRound({payload: {roundId, status, gameSessionId}}) {
  try {
    const response = yield call(startOrStopRoundService, roundId, status);
    yield put(startOrStopRoundSuccess(response));
    yield put(getStratEdgeResultAction(gameSessionId));
  } catch (error) {
    yield put(startOrStopRoundFailed(error));
  }
}

function* updateStratEdgeProduct({payload: {product}}) {
  try {
    const response = yield call(updateStratEdgeProductService, product);
    yield put(updateStratEdgeProductSuccess(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      default:
        message = error;
    }
    yield put(updateStratEdgeProductFailed(message));
  }
}

function* updateStratEdgeCompetitor({payload: {competitor}}) {
  try {
    const response = yield call(updateStratEdgeCompetitorService, competitor);
    yield put(updateStratEdgeCompetitorSuccess(response));
  } catch (error) {
    yield put(updateStratEdgeCompetitorFailed(error));
  }
}

function* updateStratEdgeMarket({payload: {market}}) {
  try {
    const response = yield call(updateStratEdgeMarketService, market);
    yield put(updateStratEdgeMarketSuccess(response));
  } catch (error) {
    yield put(updateStratEdgeMarketFailed(error));
  }
}

function* updateStratEdgeStrategicDecision({payload: {strategicDecision}}) {
  try {
    const response = yield call(
      updateStratEdgeStrategicDecisionService,
      strategicDecision,
    );
    if(response && response.status ){
      yield put(updateStratEdgeStrategicDecisionFailed(response));
    }
    yield put(updateStratEdgeStrategicDecisionSuccess(response));
  } catch (error) {
    yield put(updateStratEdgeStrategicDecisionFailed(error));
  }
}

function* chooseDecision({payload: {decision, competitorParams, add}}) {
  try {
    const response = yield call(
      chooseDecisionService,
      decision,
      competitorParams,
      add,
    );
    yield put(chooseDecisionSuccess(response));
  } catch (error) {
    yield put(chooseDecisionFailed(error));
  }
}

export function* watchGetStratEdgeResult() {
  yield takeEvery(GET_STRAT_EDGE_RESULT, getStratEdgeResult);
}
export function* watchGetStratEdgeResultParticipant() {
  yield takeEvery(
    GET_STRAT_EDGE_RESULT_PARTICIPANT,
    getStratEdgeResultParticipant,
  );
}

export function* watchStartOrStopRound() {
  yield takeEvery(START_OR_STOP_ROUND, startOrStopRound);
}

export function* watchGetStratEdgeConfiguration() {
  yield takeEvery(GET_STRAT_EDGE_CONFIGURATION, getStratEdgeConfiguration);
}

export function* watchGetStratEdgeGameSessionConfiguration() {
  yield takeEvery(
    GET_STRAT_EDGE_GAME_SESSION_CONFIGURATION,
    getStratEdgeGameSessionConfiguration,
  );
}

export function* watchGetStratEdgeConfigurationParticipant() {
  yield takeEvery(
    GET_STRAT_EDGE_CONFIGURATION_PARTICIPANT,
    getStratEdgeConfigurationParticipant,
  );
}

export function* watchChooseDecision() {
  yield takeEvery(CHOOSE_DECISION, chooseDecision);
}
export function* watchUpdateStratEdgeProduct() {
  yield takeEvery(UPDATE_STRAT_EDGE_PRODUCT, updateStratEdgeProduct);
}
export function* watchUpdateStratEdgeCompetitor() {
  yield takeEvery(UPDATE_STRAT_EDGE_COMPETITOR, updateStratEdgeCompetitor);
}
export function* watchUpdateStratEdgeMarket() {
  yield takeEvery(UPDATE_STRAT_EDGE_MARKET, updateStratEdgeMarket);
}
export function* watchInitSimulation() {
  yield takeEvery(INIT_SIMULATION, initSimulation);
}
export function* watchRunSimulation() {
  yield takeEvery(RUN_SIMULATION, runSimulation);
}
export function* watchSaveScenario() {
  yield takeEvery(SAVE_SCENARIO, saveScenario);
}
export function* watchDeleteScenario() {
  yield takeEvery(DELETE_SCENARIO, deleteScenario);
}
export function* watchGetScenarios() {
  yield takeEvery(GET_SCENARIOS, getScenarios);
}
export function* watchSendDecision() {
  yield takeEvery(SEND_DECISION, sendDecision);
}
export function* watchUpdateStratEdgeStrategicDecision() {
  yield takeEvery(
    UPDATE_STRAT_EDGE_STRATEGIC_DECISION,
    updateStratEdgeStrategicDecision,
  );
}

function* StratEdgeSaga() {
  yield all([
    fork(watchGetStratEdgeConfiguration),
    fork(watchUpdateStratEdgeProduct),
    fork(watchUpdateStratEdgeCompetitor),
    fork(watchUpdateStratEdgeMarket),
    fork(watchUpdateStratEdgeStrategicDecision),
    fork(watchGetStratEdgeResult),
    fork(watchGetStratEdgeResultParticipant),
    fork(watchStartOrStopRound),
    fork(watchGetStratEdgeConfigurationParticipant),
    fork(watchInitSimulation),
    fork(watchRunSimulation),
    fork(watchSaveScenario),
    fork(watchGetScenarios),
    fork(watchDeleteScenario),
    fork(watchSendDecision),
    fork(watchChooseDecision),
    fork(watchGetStratEdgeGameSessionConfiguration),
  ]);
}

export default StratEdgeSaga;
