import _ from "lodash";
import moment from "moment";

const toFixedOnlyFloat = (num) => {
  return num.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const extractMarketHistoricalVolumeChart = (array) => {
  let result = [];

  array.map((market) => {
    const data = market.market_historical_data.map((item) => [
      moment(item.market_date).valueOf(),
      item.volume,
    ]);

    result.push({
      market_id: market.market_id,
      data,
    });
  });

  return result;
};

const extractMarketHistoricalPriceData = (array) => {
  let result = [];

  array.map((market) => {
    const data = market.market_historical_data.map((item) => [
      moment(item.market_date, "YYYY-MM-DD hh:mm:ss").valueOf(),
      item.close,
    ]);

    //25/07/2016.  4388.
    result.push({
      market_id: market.market_id,
      data,
    });
  });

  return result;
};

const extractAssetHistoricalVolumeChart = (array) => {
  const data = array.map((item) => [
    moment(item.market_date, "YYYY-MM-DD").valueOf(),
    item.volume,
  ]);

  return data;
};

const extractAssetHistoricalPriceData = (array) => {
  const data = array.map((item) => [
    moment(item.market_date, "YYYY-MM-DD").valueOf(),
    item.close,
  ]);

  return data;
};

const extractDataMinMaxVolumeChart = (min, max, data) => {
  let result = [];
  data.map((res) => {
    const date = res[0];
    if (date >= min && date <= max) result.push(res);
  });

  return result;
};

const extractMarketViewsPerformanceArray = (array, assets) => {
  let result = [];

  array.map((market) => {
    const data = market.market_last_performances.map((item) => {
      const asset = assets?.find((a) => a.id === item.asset_id);
      const variation = toFixedOnlyFloat(item.variation * 100);
      return {
        "Actif ": asset.name,
        "Dernier cours": item.last.toLocaleString("fr-FR", {
          minimumFractionDigits: 2,
        }),
        Variation:
          item.variation >= 0 ? "+" + variation + "%" : variation + "%",
        Open:
          "" + item.open.toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
        Haut:
          "" + item.high.toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
        Bas:
          "" + item.low.toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
        Volume:
          "" +
          item.volume.toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
      };
    });

    result.push({
      market_id: market.market_id,
      data,
    });
  });

  return result;
};

const extractOrderData = (array, assets, asset_classes) => {
  let result = [];
  array.map((order) => {
    const asset = assets?.find((a) => a.id === order.asset_id);
    const assetClass = asset_classes?.find(
      (a) => a.id === asset.asset_class_id
    );

    console.log("----- order.status -----", order.status);

    result.push({
      "Date ": moment(order.market_date).format("DD/MM/YYYY"),
      Catégorie: assetClass.name,
      Actif: asset.name,
      "Achat/Vente": order.direction === 1 ? "Vente" : "Achat",
      Quantité: order.quantity.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
      }),
      "Prix de la transaction": order.price.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "EUR",
      }),
      Montant:
        (order.direction !== 1 ? "- " : "") +
        (order.price * order.quantity).toLocaleString("fr-FR", {
          minimumFractionDigits: 2,
          style: "currency",
          currency: "EUR",
        }),
      status_: order.status,

      // === 0
      // ? (
      //   <i class="fas fa-sync-alt" style={{ color: "#f9c851" }}></i>
      // ) : order.status === 1 ? (
      //   <i class="fas fa-check" style={{ color: "#10c469" }}></i>
      // ) : (
      //   <i class="fas fa-times" style={{ color: "#eb4d4d" }}></i>
      // ),
    });
  });

  return result;
};

const extractLastPerformancesData = (array, asset_classes) => {
  let result = [];
  let group = _.groupBy(array, "asset_classes.id");

  asset_classes.map((assetClass) => {
    const data = group[assetClass.id];
    if (data) {
      const obj = {
        num: assetClass.id,
        title: assetClass.name,
        "totalP&L": "",
        list: data.map((d) => [
          d.asset.name,
          d.bid.toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
          d.ask.toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
        ]),
      };
      result.push(obj);
    }
  });

  return result;
};

const extractLastPositionsData = (
  array,
  asset_classes,
  lastPerformancesDataAPI
) => {
  let result = [];
  let group = _.groupBy(array, "asset_classes.id");
  // num:3,
  // title:'Actions',
  // total:"323.231,22",
  // list: gArray(5).map((elm)=> [
  //   "Nokia",1000,"32, 231","42,213","+3,23%","323.231,22","323.231,22"
  // ])

  console.log(
    `array,
  asset_classes,
  lastPerformancesDataAPI`,
    array,
    asset_classes,
    lastPerformancesDataAPI
  );

  asset_classes.map((assetClass) => {
    const data = group[assetClass.id];
    if (data) {
      const obj = {
        num: assetClass.id,
        title: assetClass.name,
        "totalP&L": data
          .map((d) => d.profit_and_loss)
          ?.reduce((a, b) => a + b, 0)
          .toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
        totalQuantité: data
          .map((d) => d.quantity)
          ?.reduce((a, b) => a + b, 0)
          .toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
        totalValorisation: data
          .map((d) => d.valuation)
          ?.reduce((a, b) => a + b, 0)
          .toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
        list: data.map((d) => {
          const variation = toFixedOnlyFloat(d.variation * 100);
          return [
            d.asset.name,
            d.quantity.toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
            d.price.toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
            lastPerformancesDataAPI
              .find((lp) => lp.asset_id === d.asset.id)
              ?.open.toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
            d.variation >= 0 ? "+" + variation + "%" : variation + "%",
            d.valuation.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              style: "currency",
              currency: "EUR",
            }),
            d.profit_and_loss.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
            }),
          ];
        }),
      };
      result.push(obj);
    }
  });

  console.log(`------------------------------------------------`, result);
  return result;
};

const extractAnalyseRiskData = (
  array,
  asset_classes,
  lastPerformancesDataAPI
) => {
  let result = [];
  let group = _.groupBy(array, "asset_classes.id");

  //   {
  //     "id":1,
  //     "num": 1,
  //     "title": "Equity",
  //     "totalP&L": "-1 088,04",
  //     "totalVariation": "-9 982,00",
  //     "totalValorisation": "-4 157 430,00",
  //     "list": [
  //         [

  //             "Air Liquide",
  //             "-9 982,00",
  //             "138,831",
  //             "140,34",
  //             "+0,08%",
  //             "-1 385 810,00 €",
  //             "-1 088,04",
  //             "-1 088,04"
  //         ]
  //     ]
  // },

  console.log(
    `array,
  asset_classes,
  lastPerformancesDataAPI`,
    array,
    asset_classes,
    lastPerformancesDataAPI
  );

  asset_classes.map((assetClass) => {
    const data = group[assetClass.id];
    if (data) {
      const obj = {
        num: assetClass.id,
        title: assetClass.name,
        "totalP&L": data
          .map((d) => d.profit_and_loss)
          ?.reduce((a, b) => a + b, 0)
          .toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
        totalQuantité: data
          .map((d) => d.quantity)
          ?.reduce((a, b) => a + b, 0)
          .toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
        totalValorisation: data
          .map((d) => d.valuation)
          ?.reduce((a, b) => a + b, 0)
          .toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
        list: data.map((d) => {
          const variation = toFixedOnlyFloat(d.variation * 100);
          return [
            d.asset.name,
            d.quantity.toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
            d.price.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              style: "currency",
              currency: "EUR",
            }),
            lastPerformancesDataAPI
              .find((lp) => lp.asset_id === d.asset.id)
              ?.open.toLocaleString("fr-FR", { minimumFractionDigits: 2 }),
            d.variation >= 0 ? "+" + variation + "%" : variation + "%",
            d.var95.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              style: "currency",
              currency: "EUR",
            }),
            d.var99.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              style: "currency",
              currency: "EUR",
            }),
            d.weight >= 0
              ? "+" + toFixedOnlyFloat(d.weight) + "%"
              : toFixedOnlyFloat(d.weight) + "%",
          ];
        }),
      };
      result.push(obj);
    }
  });

  console.log(`------------------------------------------------`, result);
  return result;
};

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

const extractHistoricalVolatilityAndBetaData = (array) => {
  let result = [];
  const res = groupBy(array, (item) => item.market_date);

  for (const p of res) {
    const volatility = p[1].find((e) => e.indicator_id === 7).variation;
    const beta = p[1].find((e) => e.indicator_id === 9).variation;

    const data = {
      "Date ": p[0],
      "Evolution de la volatilité":
        volatility >= 0
          ? "+" + toFixedOnlyFloat(volatility * 100) + "%"
          : toFixedOnlyFloat(volatility * 100) + "%",
      "Evolution du Beta vs benchmark":
        beta >= 0
          ? "+" + toFixedOnlyFloat(beta * 100) + "%"
          : toFixedOnlyFloat(beta * 100) + "%",
    };
    result.push(data);
  }

  return result;
};

const extractVolatilityValueRiskData = (array) => {
  const data = array.map((item) => {
    if (item.indicator_id === 7) {
      return [moment(item.market_date, "YYYY-MM-DD").valueOf(), item.value];
    }
  });

  return data.filter(function (el) {
    return el != null;
  });
};

const extractBetaValueRiskData = (array) => {
  const data = array.map((item) => {
    if (item.indicator_id === 9) {
      return [moment(item.market_date, "YYYY-MM-DD").valueOf(), item.value];
    }
  });

  return data.filter(function (el) {
    return el != null;
  });
};

const extractAssetClassConcentrationData = (array, asset_classes) => {
  const result = {
    data: Object.values(array),
    labels: Object.keys(array).map((item) => {
      return asset_classes?.find((a) => "" + a.id === "" + item).name;
    }),
    colors: Object.keys(array).map(() => {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }),
  };

  return result;
};

const extractAssetConcentrationData = (array, asset) => {
  const result = {
    data: Object.values(array),
    labels: Object.keys(array).map((item) => {
      return asset?.find((a) => "" + a.id === "" + item).name;
    }),
    colors: Object.keys(array).map(() => {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }),
  };

  return result;
};

const extractSectorConcentrationData = (array) => {
  const result = {
    data: Object.values(array),
    labels: Object.keys(array),
    colors: Object.keys(array).map(() => {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }),
  };

  return result;
};

const extractYieldsAndPerfsData = (array) => {
  let result = [];

  const keys = Object.keys(array);

  keys.map((key) => {
    const item = array[key];
      result.push({
        "Date ": key,
        "Rdts benchmark":
          item.bench_yield >= 0
            ? "+" + toFixedOnlyFloat(item.bench_yield * 100) + "%"
            :item.bench_yield <= 0 ? toFixedOnlyFloat(item.bench_yield * 100) + "%": "0%",
        "Rdts portfeuille":
          item.ptf_yield >= 0
            ? "+" + toFixedOnlyFloat(item.ptf_yield * 100) + "%"
            : item.ptf_yield <= 0 ?toFixedOnlyFloat(item.ptf_yield * 100) + "%": "0%",
        "Perf bench":
          item.bench_perf >= 0
            ? "+" + toFixedOnlyFloat(item.bench_perf * 100) + "%"
            :item.bench_perf <= 0 ? toFixedOnlyFloat(item.bench_perf * 100) + "%": "0%",
        "Perf ptf":
          item.ptf_perf >= 0
            ? "+" + toFixedOnlyFloat(item.ptf_perf * 100) + "%"
            : item.ptf_perf <= 0 ?toFixedOnlyFloat(item.ptf_perf * 100) + "%" : "0%",
      });
  });

  return result;
};


const extractComparisonPtfBenchChart = (array) => {


  const keys = Object.keys(array);

  keys.sort();
  const ptf = keys.map((key) => {
    const item = array[key];
    return [moment(key).valueOf(), item.ptf_perf];
  });
  const bench = keys.map((key) => {
    const item = array[key];
    return [moment(key).valueOf(), item.bench_perf];
  });
 
  

  return {ptf, bench};
}

const extractComparisonYieldChart = (array) => {
 

  const keys = Object.keys(array);

  const ptf = keys.map((key) => {
    const item = array[key];
    return item.ptf_yield;
  });
  const bench = keys.map((key) => {
    const item = array[key];
    return   item.bench_yield;
  });
 
  

  return {ptf, bench, keys};
}

const extractRankingChart = (array) => {
  let result = [];
  array.map((rank) => {
    const keys = Object.keys(rank.historical_rankings);

    const ranking = keys.map((key) => {
      const item = rank.historical_rankings[key];
      return [moment(key).valueOf(), item.ranking];
    });

    const yieldR = keys.map((key) => {
      const item = rank.historical_rankings[key];
      return [moment(key).valueOf(), item.yield];
    });

    result.push({
      rank_id: rank.id,
      data: {
        ranking,
        yieldR,
      },
    });
  });

  return result;
};

export {
  extractRankingChart,
  extractMarketHistoricalVolumeChart,
  extractMarketHistoricalPriceData,
  extractDataMinMaxVolumeChart,
  extractMarketViewsPerformanceArray,
  extractAssetHistoricalVolumeChart,
  extractAssetHistoricalPriceData,
  extractLastPerformancesData,
  extractOrderData,
  extractLastPositionsData,
  toFixedOnlyFloat,
  extractVolatilityValueRiskData,
  extractBetaValueRiskData,
  extractHistoricalVolatilityAndBetaData,
  extractAssetClassConcentrationData,
  extractAssetConcentrationData,
  extractSectorConcentrationData,
  extractAnalyseRiskData,
  extractYieldsAndPerfsData,
  extractComparisonPtfBenchChart,
  extractComparisonYieldChart
};
