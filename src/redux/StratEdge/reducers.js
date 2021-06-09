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
  UPDATE_STRAT_EDGE_MARKET,
  UPDATE_STRAT_EDGE_MARKET_FAILED,
  UPDATE_STRAT_EDGE_MARKET_SUCCESS,
  UPDATE_STRAT_EDGE_STRATEGIC_DECISION,
  UPDATE_STRAT_EDGE_STRATEGIC_DECISION_SUCCESS,
  UPDATE_STRAT_EDGE_STRATEGIC_DECISION_FAILED,
  START_OR_STOP_ROUND,
  START_OR_STOP_ROUND_SUCCESS,
  START_OR_STOP_ROUND_FAILED,
  GET_STRAT_EDGE_RESULT,
  GET_STRAT_EDGE_RESULT_SUCCESS,
  GET_STRAT_EDGE_RESULT_FAILED,
  GET_STRAT_EDGE_RESULT_PARTICIPANT,
  GET_STRAT_EDGE_RESULT_PARTICIPANT_SUCCESS,
  GET_STRAT_EDGE_RESULT_PARTICIPANT_FAILED,
  INIT_SIMULATION,
  INIT_SIMULATION_SUCCESS,
  INIT_SIMULATION_FAILED,
  START_SIMULATION,
  RUN_SIMULATION,
  RUN_SIMULATION_SUCCESS,
  RUN_SIMULATION_FAILED,
  ADD_DECISION_SIMULATION,
  SAVE_SCENARIO,
  SAVE_SCENARIO_SUCCESS,
  SAVE_SCENARIO_FAILED,
  GET_SCENARIOS,
  GET_SCENARIOS_SUCCESS,
  GET_SCENARIOS_FAILED,
  INIT_SAVE_SCENARIO_SUCCESS,
  DELETE_SCENARIO,
  DELETE_SCENARIO_SUCCESS,
  DELETE_SCENARIO_FAILED,
  INIT_DELETE_SCENARIO_SUCCESS,
  SEND_DECISION,
  SEND_DECISION_SUCCESS,
  SEND_DECISION_FAILED,
  INIT_SEND_DECISION_SUCCESS,
  INIT_STRAT_EDGE,
  CHOOSE_DECISION,
  CHOOSE_DECISION_SUCCESS,
  CHOOSE_DECISION_FAILED,
  GET_STRAT_EDGE_GAME_SESSION_CONFIGURATION,
} from '../../constants/actionTypes';
import {REHYDRATE} from 'redux-persist';

const INIT_STATE = {
  config: null,
  configParticipant: null,
  result: {},
  resultParticipant: {},
  resultSimulation: {},
  simulation: [],
  scenarios: [],
  startSimulation: false,
  competitorParams: [{}],
  loading: false,
  loadingSavedScenario: false,
  scenarioSaveSuccess: false,
  scenarioDeletedSuccess: false,
  decisionSendSuccess: false,
};

const StratEdge = (state = INIT_STATE, action) => {
  let strategicDecisions = [];
  let strategicDecisionsTypes = [];
  let simulation = state.simulation;
  let competitorParams = state.competitorParams;
  let scenarios = state.scenarios;
  let types = [];
  switch (action.type) {
    case GET_STRAT_EDGE_CONFIGURATION:
      return {...state, loading: true, error: null};
    case GET_STRAT_EDGE_GAME_SESSION_CONFIGURATION:
      return {...state, loading: true, error: null};
    case GET_STRAT_EDGE_CONFIGURATION_SUCCESS:
      strategicDecisions = action.payload.strategicDecisions;
      strategicDecisions.map((item) => {
        strategicDecisionsTypes.push(item.decisionType);
        return item;
      });
      strategicDecisionsTypes = [...new Set(strategicDecisionsTypes)];

      strategicDecisionsTypes.map((item) => {
        const obj = {};
        obj.type = item;
        obj.decision = strategicDecisions.filter(
          (d) => d.decisionType === item,
        );
        types.push(obj);
        return item;
      });

      action.payload.markets.sort(function (a, b){
        if (a.fixedName < b.fixedName) {
          return -1;
        }
        if (a.fixedName > b.fixedName) {
          return 1;
        }
        return 0;
      });

      action.payload.competitors.sort(function (a, b) {
        if (a.fixedName < b.fixedName) {
          return -1;
        }
        if (a.fixedName > b.fixedName) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        config: {...action.payload, strategicDecisions: types},
        loading: false,
        error: null,
      };
    case GET_STRAT_EDGE_CONFIGURATION_FAILED:
      return {...state, error: action.payload, loading: false};
    case SEND_DECISION:
      return {...state, loading: true, error: null};
    case SEND_DECISION_SUCCESS:
      return {
        ...state,
        decisionSendSuccess: true,
        loading: false,
        error: null,
      };
    case SEND_DECISION_FAILED:
      return {...state, error: action.payload, loading: false};
    case DELETE_SCENARIO:
      return {...state, loading: true, error: null};
    case DELETE_SCENARIO_SUCCESS:
      scenarios = state.scenarios;
      scenarios = scenarios.filter((s) => s.id !== action.payload);
      return {
        ...state,
        scenarioDeletedSuccess: true,
        scenarios,
        loading: false,
        error: null,
      };
    case DELETE_SCENARIO_FAILED:
      return {...state, error: action.payload, loading: false};

    case INIT_SIMULATION:
      return {...state, loading: true, error: null};
    case INIT_SIMULATION_SUCCESS:
      return {
        ...state,
        simulation: action.payload.response,
        competitorParams: action.payload.competitorParams,
        loading: false,
        startSimulation: false,
        error: null,
      };
    case INIT_SIMULATION_FAILED:
      return {...state, error: action.payload, loading: false};

    case RUN_SIMULATION:
      return {...state, loading: true, error: null};
    case RUN_SIMULATION_SUCCESS:
      return {
        ...state,
        resultSimulation: action.payload,
        loading: false,
        error: null,
      };
    case RUN_SIMULATION_FAILED:
      return {...state, error: action.payload, loading: false};
    case START_SIMULATION:
      return {...state, startSimulation: action.payload, };

    case GET_SCENARIOS:
      return {...state, loading: true, error: null};
    case GET_SCENARIOS_SUCCESS:
      action.payload.sort(function (a, b) {
        return a.id - b.id;
      });
      return {
        ...state,
        scenarios: action.payload,
        loading: false,
        error: null,
      };
    case GET_SCENARIOS_FAILED:
      return {...state, error: action.payload, loading: false};

    case SAVE_SCENARIO:
      return {...state, loadingSavedScenario: true, error: null};
    case SAVE_SCENARIO_SUCCESS:
      return {
        ...state,
        scenario: action.payload,
        loadingSavedScenario: false,
        scenarioSaveSuccess: true,
        error: null,
      };
    case SAVE_SCENARIO_FAILED:
      return {...state, error: action.payload, loadingSavedScenario: false};

    case ADD_DECISION_SIMULATION:
      simulation = state.simulation;

      simulation = simulation.map((s) => {
        if (s.teamId === action.payload.teamId) {
          s.strategicDecisions.map((d) => {
            if (d.type === action.payload.type) {
              d.id = action.payload.id;
            }
            return d;
          });
        }
        return s;
      });
      return {...state, simulation, loading: false};

    case GET_STRAT_EDGE_CONFIGURATION_PARTICIPANT:
      return {...state, loading: true, error: null};
    case GET_STRAT_EDGE_CONFIGURATION_PARTICIPANT_SUCCESS:
      strategicDecisions = action.payload.strategicDecisions;
      strategicDecisions.map((item) => {
        strategicDecisionsTypes.push(item.decisionType);
        return item;
      });
      strategicDecisionsTypes = [...new Set(strategicDecisionsTypes)];

      strategicDecisionsTypes.map((item) => {
        const obj = {};
        obj.type = item;
        obj.decision = strategicDecisions.filter(
          (d) => d.decisionType === item,
        );

        obj.decision.sort((a, b) => {
          const bandA = a.fixedName.toUpperCase();
          const bandB = b.fixedName.toUpperCase();
    
          let comparison = 0;
          if (bandA > bandB) {
            comparison = 1;
          } else if (bandA < bandB) {
            comparison = -1;
          }
          return comparison;
        })
        types.push(obj);
        return item;
      });

      action.payload.markets.sort(function (a, b) {
        if (a.fixedName < b.fixedName) {
          return -1;
        }
        if (a.fixedName > b.fixedName) {
          return 1;
        }
        return 0;
      });
      action.payload.competitors.sort(function (a, b){
        if (a.fixedName < b.fixedName) {
          return -1;
        }
        if (a.fixedName > b.fixedName) {
          return 1;
        }
        return 0;
      });

      return {
        ...state,
        configParticipant: {...action.payload, strategicDecisions: types}, // strategicDecisionsTypes:[...new Set(strategicDecisionsTypes)] },
        loading: false,
        error: null,
      };
    case GET_STRAT_EDGE_CONFIGURATION_PARTICIPANT_FAILED:
      return {...state, error: action.payload, loading: false};

    case GET_STRAT_EDGE_RESULT:
      return {...state, loading: true, error: null};
    case GET_STRAT_EDGE_RESULT_SUCCESS:
      // if (action.payload.rounds) {
      //   function compare(a, b) {
      //     if (a.name < b.name) {
      //       return -1;
      //     }
      //     if (a.name > b.name) {
      //       return 1;
      //     }
      //     return 0;
      //   }

        // action.payload.rounds.sort(compare);
      // }
      return {
        ...state,
        result: action.payload,
        loading: false,
        error: null,
      };
    case GET_STRAT_EDGE_RESULT_FAILED:
      return {...state, error: action.payload, loading: false};

    case GET_STRAT_EDGE_RESULT_PARTICIPANT:
      return {...state, loading: true, error: null};
    case GET_STRAT_EDGE_RESULT_PARTICIPANT_SUCCESS:
      
      return {
        ...state,
        resultParticipant: action.payload,
        currentRound:  action.payload.rounds && action.payload.rounds.find((r)=> r.status === 0),
        loading: false,
        error: null,
      };
    case GET_STRAT_EDGE_RESULT_PARTICIPANT_FAILED:
      return {...state, error: action.payload, loading: false};

    case START_OR_STOP_ROUND:
      return {...state, loading: true, error: null};
    case START_OR_STOP_ROUND_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case START_OR_STOP_ROUND_FAILED:
      return {...state, error: action.payload, loading: false};

    case UPDATE_STRAT_EDGE_PRODUCT:
      return {...state, loading: true, error: null};

    case UPDATE_STRAT_EDGE_PRODUCT_SUCCESS:
      return {
        ...state,
        config: {...state.config, product: action.payload},
        loading: false,
      };

    case UPDATE_STRAT_EDGE_PRODUCT_FAILED:
      return {...state, error: action.payload, loading: false};

    case UPDATE_STRAT_EDGE_COMPETITOR:
      return {...state, loading: true, error: null};

    case UPDATE_STRAT_EDGE_COMPETITOR_SUCCESS:
      const Lcompetitors = state.config.competitors.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );

      return {
        ...state,
        config: {...state.config, competitors: Lcompetitors},
        loading: false,
      };

    case UPDATE_STRAT_EDGE_COMPETITOR_FAILED:
      return {...state, error: action.payload, loading: false};

    case UPDATE_STRAT_EDGE_MARKET:
      return {...state, loading: true, error: null};

    case UPDATE_STRAT_EDGE_MARKET_SUCCESS:
      const Lmarkets = state.config.markets.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );

      return {
        ...state,
        config: {...state.config, markets: Lmarkets},
        loading: false,
      };

    case UPDATE_STRAT_EDGE_MARKET_FAILED:
      return {...state, error: action.payload, loading: false};

    case UPDATE_STRAT_EDGE_STRATEGIC_DECISION:
      return {...state, loading: true, error: null};

    case UPDATE_STRAT_EDGE_STRATEGIC_DECISION_SUCCESS:
      const LstrategicDecisions = state.config.strategicDecisions.map((item) => {
        if(item.type === action.payload.decisionType) {
          const decisions = item.decision.map((d)=> 
          
          d.id === action.payload.id ? action.payload : d,
          )
          item.decision = decisions 
          return item
        } else {
          return item
        }
      }
      );

      //console.log('LstrategicDecisions +++++++++++', LstrategicDecisions)

      return {
        ...state,
        config: {...state.config, strategicDecisions: LstrategicDecisions},
        loading: false,
        error: null
      };

    case UPDATE_STRAT_EDGE_STRATEGIC_DECISION_FAILED:
      return {...state, error: action.payload, loading: false};

    case INIT_SAVE_SCENARIO_SUCCESS:
      return {...state, scenarioSaveSuccess: false};

    case INIT_DELETE_SCENARIO_SUCCESS:
      return {...state, scenarioDeletedSuccess: false};

    case INIT_SEND_DECISION_SUCCESS:
      return {...state, decisionSendSuccess: false};

    case CHOOSE_DECISION:
      return {...state, loading: true};
    case CHOOSE_DECISION_SUCCESS:
      competitorParams = state.competitorParams;
      competitorParams.map((cp) => {
        if (cp.id === action.payload.id) {
          cp = action.payload;
        }
      });
      return {...state, loading: false, competitorParams};
    case CHOOSE_DECISION_FAILED:
      return {...state, loading: false, error: action.payload};

    case INIT_STRAT_EDGE:
      return INIT_STATE;

    case REHYDRATE:
      return action.payload
        ? {
            ...state,
            ...action.payload.StratEdge,
          }
        : {
            ...state,
          };
    default:
      return {...state};
  }
};

export default StratEdge;
