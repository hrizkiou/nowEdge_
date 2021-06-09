import { httpClient_get, httpClient_post } from "../../helpers/api";

const getInitialDataService = (gameSessionId) => {
  return httpClient_get(
    `/participant/finedge/getinitialdata?gameSessionId=${gameSessionId}`
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getRankingsService = (gameSessionId) => {
  return httpClient_get(
    `/participant/finedge/getrankings?gameSessionId=${gameSessionId}`
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getGlobalRiskViewService = (portfolioId) => {
  return httpClient_get(
    `/participant/finedge/getglobalriskviewpage?portfolio_id=${portfolioId}`
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getGlobalStatisticService = (portfolioId) => {
  return httpClient_get(
    `/participant/finedge/getglobalstatisticviewpage?portfolio_id=${portfolioId}`
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const addOrderService = ({
  portfolio_id,
  asset_id,
  direction,
  quantity,
  order_type,
  price,
}) => {
  return httpClient_post(`/participant/finedge/addorder`, {
    portfolio_id,
    asset_id,
    direction,
    quantity,
    order_type,
    price,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};


const getLastPortfolioIndicatorsDataService = (portfolioId) => {
  let url = `/participant/finedge/getlastportfolioindicators?portfolio_id=${portfolioId}`;
  return httpClient_get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};


export { getInitialDataService, getRankingsService, addOrderService, getLastPortfolioIndicatorsDataService, getGlobalRiskViewService, getGlobalStatisticService };
