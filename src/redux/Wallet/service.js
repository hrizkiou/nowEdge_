import { httpClient_get, httpClient_post } from "../../helpers/api";

const getOrdersDataService = (portfolioId) => {
  return httpClient_get(
    `/participant/finedge/getorders?portfolio_id=${portfolioId}`
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getLastPerformancesDataService = (assetId) => {
  let url = `/participant/finedge/getlastperformances`;
  if (assetId) url += `?asset_id=${assetId}`;
  return httpClient_get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getLastPositionsDataService = (portfolioId) => {
  let url = `/participant/finedge/getlastpositions?portfolio_id=${portfolioId}`;
  return httpClient_get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export {
  getOrdersDataService,
  getLastPerformancesDataService,
  getLastPositionsDataService,
};
