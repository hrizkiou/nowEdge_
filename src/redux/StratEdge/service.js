import {httpClient_get, httpClient_post} from '../../helpers/api';
import {getLoggedInUser} from '../../helpers/authUtils';

function deleteScenarioService(roundScenarioId) {
  return httpClient_post(
    `/participant/stratedge/deletescenario?roundScenarioId=${roundScenarioId}`,
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function sendDecisionService(roundScenarioId) {
  return httpClient_post(
    `/participant/stratedge/senddecision?roundScenarioId=${roundScenarioId}`,
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function getStratEdgeConfigurationService(gameConfigurationId) {
  return httpClient_get(
    `/moderator/stratedge/getconfiguration?gameConfigurationId=${gameConfigurationId}`,
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function getScenariosService(gameSessionId, roundId) {
  return httpClient_get(
    `/participant/stratedge/getscenarios?gameSessionId=${gameSessionId}&roundId=${roundId}`,
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function initSimulationService(configParticipant, resultParticipant) {
  try {
    const response = [];
    const competitorParams = [];
    const {
      competitors,
      strategicDecisions,
      teamCompetitors,
    } = configParticipant;

    const currentRoundId = Math.max.apply(
      Math,
      resultParticipant.roundScenarios.map(function (o) {
        return o.roundId;
      }),
    );
    const roundScenarios = resultParticipant.roundScenarios.find(
      (rs) => rs.roundId === currentRoundId,
    );


    for (const competitor of competitors) {
      const obj = {};
      obj.teamId = teamCompetitors.find(
        (tc) => competitor.id === tc.competitorId,
      ).teamId;
      obj.competitorFixedName = competitor.fixedName;
      obj.strategicDecisions = [];
      for (const d of strategicDecisions) {
        obj.strategicDecisions.push({
          type: d.type,
          id: null,
        });
      }
      response.push(obj);

      if (roundScenarios) {
        const scenarioResult = roundScenarios.scenarioResults.find(
          (sr) => sr.teamId === obj.teamId,
        );
        if (scenarioResult) {
          competitorParams.push({
            id: competitor.id,
            fixedName: competitor.fixedName,
            productionCost: scenarioResult.cost,
            productionCapacity: scenarioResult.capacity,
            fretMarket1: scenarioResult.marketResults[0].fret,
            fretMarket2: scenarioResult.marketResults[1].fret,
            budget: scenarioResult.reserve.toFixed(2),
          });
        } else {
          competitorParams.push({
            id: competitor.id,
            fixedName: competitor.fixedName,
            productionCost: competitor.productionCost,
            productionCapacity: competitor.productionCapacity,
            fretMarket1: competitor.fretMarket1,
            fretMarket2: competitor.fretMarket2,
            budget: configParticipant.initialBudget,
          });
        }
      } else {
        competitorParams.push({
          id: competitor.id,
          fixedName: competitor.fixedName,
          productionCost: competitor.productionCost,
          productionCapacity: competitor.productionCapacity,
          fretMarket1: competitor.fretMarket1,
          fretMarket2: competitor.fretMarket2,
          budget: configParticipant.initialBudget,
        });
      }
    }

    return {response, competitorParams};
  } catch (error) {
    throw error;
  }
}

function chooseDecisionService(decision, competitorParams, add) {
  try {
    if (add) {
      competitorParams.budget -= decision.price;

      competitorParams.productionCost =
        competitorParams.productionCost * (1 + decision.costImpact);
      competitorParams.productionCost = competitorParams.productionCost.toFixed(
        2,
      );

      competitorParams.productionCapacity =
        competitorParams.productionCapacity * (1 + decision.capacityImpact);
      competitorParams.productionCapacity = competitorParams.productionCapacity.toFixed(
        2,
      );

      competitorParams.fretMarket1 =
        competitorParams.fretMarket1 * (1 + decision.fretImpactMarket1);
      competitorParams.fretMarket1 = competitorParams.fretMarket1.toFixed(2);

      competitorParams.fretMarket2 =
        competitorParams.fretMarket2 * (1 + decision.fretImpactMarket2);
      competitorParams.fretMarket2 = competitorParams.fretMarket2.toFixed(2);
    } else {
      competitorParams.budget += decision.price;

      competitorParams.productionCost =
        competitorParams.productionCost / (1 + decision.costImpact);
      competitorParams.productionCost = competitorParams.productionCost.toFixed(
        2,
      );

      competitorParams.productionCapacity =
        competitorParams.productionCapacity / (1 + decision.capacityImpact);
      competitorParams.productionCapacity = competitorParams.productionCapacity.toFixed(
        2,
      );

      competitorParams.fretMarket1 =
        competitorParams.fretMarket1 / (1 + decision.fretImpactMarket1);
      competitorParams.fretMarket1 = competitorParams.fretMarket1.toFixed(2);

      competitorParams.fretMarket2 =
        competitorParams.fretMarket2 / (1 + decision.fretImpactMarket2);
      competitorParams.fretMarket2 = competitorParams.fretMarket2.toFixed(2);
    }

    return competitorParams;
  } catch (error) {
    //console.log('lllllllllllllllllll', error);
    throw error;
  }
}

function getStratEdgeConfigurationParticipantService(gameSessionId) {
  return httpClient_get(
    `/participant/stratedge/getconfiguration?gameSessionId=${gameSessionId}`,
    //${gameConfigurationId}`,
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function getStratEdgeGameSessionConfigurationService(gameSessionId) {
  return httpClient_get(
    `/moderator/stratedge/getgamesessionconfiguration?gameSessionId=${gameSessionId}`,
    //${gameConfigurationId}`,
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function startOrStopRoundService(roundId, status) {
  return httpClient_post(
    `/moderator/stratedge/startorstopround?roundId=${roundId}&status=${status}`,
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function saveScenarioService(scenario) {
  return httpClient_post(`/participant/stratedge/savescenario`, scenario)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function runSimulationService(simulation) {
  const data = {};
  data.roundId = simulation.roundId;
  data.gameSessionId = simulation.gameSessionId;
  data.isDecision = simulation.isDecision;
  data.teamScenarios = [];

  for (const team of simulation.teamScenarios) {
    const teamData = {};
    teamData.teamId = team.teamId;
    teamData.competitorFixedName = team.competitorFixedName;
    teamData.strategicDecisions = [];

    for (const decision of team.strategicDecisions) {
      if (decision.id !== null) {
        teamData.strategicDecisions.push({id: decision.id});
      }
    }

    data.teamScenarios.push(teamData);
  }

  return httpClient_post(`/participant/stratedge/launchsimulation`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function getStratEdgeResultService(gameSessionId) {
  return httpClient_get(
    `/moderator/stratedge/getresults?gameSessionId=${gameSessionId}`,
  )
    .then((response) => {
      if (response.data.roundScenarios.length > 0) {
        response.data.roundScenarios.sort(function (a, b) {
          return a.roundId - b.roundId;
        });
      }
      if (response.data.rounds.length > 0) {
        response.data.rounds.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function getStratEdgeResultParticipantService(gameSessionId) {
  return httpClient_get(
    `/participant/stratedge/getresults?gameSessionId=${gameSessionId}`,
  )
    .then((response) => {
      if (response.data.roundScenarios.length > 0) {
        response.data.roundScenarios.sort(function (a, b) {
          return a.roundId - b.roundId;
        });
      }
      if (response.data.rounds.length > 0) {
        response.data.rounds.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function updateStratEdgeProductService(product) {
  const {token} = getLoggedInUser();

  const formData = new FormData();

  if (product.image) formData.append('image', product.image);

  formData.append('id', product.id);

  formData.append('name', product.name);

  formData.append('stratEdgeConfigurationId', product.stratEdgeConfigurationId);

  formData.append('description', product.description);

  formData.append('imagePath', product.imagePath);

  formData.append('token', token);

  return httpClient_post(
    '/stratedge/updateproduct.php',
    formData,
    process.env.REACT_APP_PHP_SERVICE_BASE_URL
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

function updateStratEdgeCompetitorService(competitor) {
  const {token} = getLoggedInUser();

  const formData = new FormData();

  if (competitor.image) formData.append('image', competitor.image);

  formData.append('id', competitor.id);

  formData.append('name', competitor.name);

  formData.append(
    'stratEdgeConfigurationId',
    competitor.stratEdgeConfigurationId,
  );

  formData.append('description', competitor.description);

  formData.append('imagePath', competitor.imagePath);

  formData.append('chiffresCles', competitor.chiffresCles);

  formData.append('productionCost', competitor.productionCost);

  formData.append('productionCapacity', competitor.productionCapacity);

  formData.append('fretMarket1', competitor.fretMarket1);

  formData.append('fretMarket2', competitor.fretMarket2);

  formData.append('token', token);

  return httpClient_post(
    '/stratedge/updatecompetitor.php',
    formData,
    process.env.REACT_APP_PHP_SERVICE_BASE_URL
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

function updateStratEdgeStrategicDecisionService(competitor) {
  const {token} = getLoggedInUser();

  const formData = new FormData();

  if (competitor.img) formData.append('image', competitor.img);

  formData.append('id', competitor.id);

  formData.append('name', competitor.name);

  formData.append('token', token);

  formData.append('imagePath', competitor.imagePath);

  formData.append(
    'stratEdgeConfigurationId',
    competitor.stratEdgeConfigurationId,
  );

  formData.append('decisionType', competitor.decisionType);

  formData.append('price', competitor.price);

  formData.append('costImpact', competitor.costImpact);

  formData.append('capacityImpact', competitor.capacityImpact);

  formData.append('fretImpactMarket2', competitor.fretImpactMarket2);

  formData.append('fretImpactMarket1', competitor.fretImpactMarket1);

  return httpClient_post(
    '/stratedge/updatestrategicdecision.php',
    formData,
    process.env.REACT_APP_PHP_SERVICE_BASE_URL
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

function updateStratEdgeMarketService(competitor) {
  const {token} = getLoggedInUser();

  const formData = new FormData();

  if (competitor.image) formData.append('image', competitor.image);

  formData.append('id', competitor.id);

  formData.append('name', competitor.name);

  formData.append(
    'stratEdgeConfigurationId',
    competitor.stratEdgeConfigurationId,
  );

  formData.append('description', competitor.description);

  formData.append('imagePath', competitor.imagePath);

  formData.append('demand0', competitor.demand0);
  formData.append('demand1', competitor.demand1);
  formData.append('demand2', competitor.demand2);
  formData.append('demand3', competitor.demand3);
  formData.append('demand4', competitor.demand4);
  formData.append('demand5', competitor.demand5);

  formData.append('token', token);

  return httpClient_post(
    '/stratedge/updatemarket.php',
    formData,
    process.env.REACT_APP_PHP_SERVICE_BASE_URL
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export {
  getStratEdgeConfigurationService,
  updateStratEdgeProductService,
  updateStratEdgeCompetitorService,
  updateStratEdgeMarketService,
  updateStratEdgeStrategicDecisionService,
  getStratEdgeResultService,
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
};
