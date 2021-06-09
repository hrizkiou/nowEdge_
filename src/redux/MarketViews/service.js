import { httpClient_get, httpClient_post } from "../../helpers/api";

const getMarketViewsDataService = () => {
  return httpClient_get(`/participant/finedge/getmarketviews`)
    .then((response) => {
      let { data } = response;
      data = data.map((marketView) => {
        const { market_last_performances } = marketView;

        market_last_performances.sort((a, b) => {
          return a.variation - b.variation;
        });
        marketView.market_highests_lowests = {};
        marketView.market_highests_lowests.lowests = market_last_performances.slice(0, 7);
        marketView.market_highests_lowests.highests = market_last_performances
          .reverse()
          .slice(0, 7);

        return marketView;
      });
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
const getHistoricalDataService = (assetId) => {
  return httpClient_get(
    `/participant/finedge/gethistoricaldata?asset_id=${assetId}`
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export { getMarketViewsDataService, getHistoricalDataService };
