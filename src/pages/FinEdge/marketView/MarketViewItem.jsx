import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";

import { ColumnChart } from "../../../components/charts/highcharts/ColumnChart";
import { LineZoomChart } from "../../../components/charts/highcharts/LineZoomChart";
import DernierCours from "../../../components/finEdge/dernierCours";
import { OrderModal } from "../../../components/modal/FinEdgeModals/OerderModal/OrderModal";
import TableGrid from "../../../components/tables/tablegrid";
import { toFixedOnlyFloat } from "../../../helpers/func";
import { useWindowSize } from "../../../helpers/hooks/useWindowSize";
import { extractDataMinMaxVolumeChart } from "../../../helpers/loops";
import { getHistoricalData } from "../../../redux/MarketViews/actions";
import style from "./style.module.scss";
import TableMarket from "./TableMarket";

const options1 = [
  {
    type: "search",
    width: 100,
  },
  {
    type: "",
  },
  {
    label: {
      "-": false,
      "+": true,
    },
  },
];

const MarketViewItem = ({ marketValue, market }) => {
  const [showOrder, setShowOrder] = useState(false);
  const [operationSens, setOperationSens] = useState("purchase");
  const [selectedMarket, setSelectedMarket] = useState(marketValue);
  const [chartData, setChartData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [marketView, setMarketView] = useState({});
  const [currentAsset, setCurrentAsset] = useState("");
  const [currentPerformance, setCurrentPerformance] = useState({});
  const [minMax, setMinMax] = useState({ min: null, max: null });
  const [width, height] = useWindowSize();
  const {
    marketViewsChartColumnData,
    marketViewsChartLineData,
    marketViewsData,
    marketViewsPerformanceArray,
    historicalData,
    historicalDataChartLineData,
    historicalDataColumnData,
  } = useSelector((state) => state.MarketViews);

  const { assets } = useSelector((state) => state.FinEdge.initialData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      marketView?.market_last_performances &&
      marketView?.market_last_performances.length > 0 &&
      currentAsset === ""
    ) {
      const asset_id = marketView.market_last_performances[0].asset_id;
      const asset = assets.find((a) => a.id === asset_id);
      setCurrentAsset(asset);
      dispatch(getHistoricalData(asset_id));
    }
  }, [marketView]);
  useEffect(() => {
    if (
      marketView?.market_last_performances &&
      marketView?.market_last_performances.length > 0
    ) {
      setCurrentPerformance(
        marketView.market_last_performances.find(
          (m) => m.asset_id === currentAsset.id
        )
      );
    }
  }, [currentAsset]);

  useEffect(() => {
    setChartData(
      marketViewsChartColumnData.find((m) => m.market_id === market.id)?.data
    );
  }, [marketViewsChartColumnData]);

  useEffect(() => {
    setMarketView(marketViewsData.find((m) => m.market_id === market.id));
  }, [marketViewsData]);

  useEffect(() => {
    setLineData(
      marketViewsChartLineData.find((m) => m.market_id === market.id)?.data
    );
  }, [marketViewsChartLineData]);

  const ColumnChartRef = useRef();
  const ColumnChartAssetRef = useRef();

  const onZoomed = (min, max) => {
    const data = extractDataMinMaxVolumeChart(min, max, chartData);
    ColumnChartRef.current.chart.series[0].setData(data);
  };

  const onResetZoom = () => {
    setTimeout(() => {
      ColumnChartRef.current.chart.series[0].setData(chartData);
    }, 100);
  };

  const onZoomedAsset = (min, max) => {
    const data = extractDataMinMaxVolumeChart(
      min,
      max,
      historicalDataColumnData
    );
    ColumnChartAssetRef.current.chart.series[0].setData(data);
  };

  const onResetZoomAsset = () => {
    setTimeout(() => {
      ColumnChartAssetRef.current.chart.series[0].setData(
        historicalDataColumnData
      );
    }, 100);
  };

  const onPressRow = (assetName) => {

    console.log("-----assetName---->>>",assetName)
    const asset = assets.find((a) => a.name === assetName);
    setCurrentAsset(asset);
    dispatch(getHistoricalData(asset.id));
  };
  return (
    <div>
      {showOrder && (
        <OrderModal
          show={showOrder}
          onHide={() => {
            setShowOrder(false);
          }}
          operation={operationSens}
          selectedMarket={selectedMarket}
          currentPerformanceProps={currentPerformance}
          defaultValue={{
            value: currentAsset.id,
            label: currentAsset.name,
          }}
          market_last_performances={marketView.market_last_performances}
          actifs={marketView.market_last_performances.map((item) => {
            const asset = assets.find((a) => a.id === item.asset_id);

            return {
              value: asset.id,
              label: asset.name,
            };
          })}
        />
      )}
      <h4>Evolution du marché</h4>

      <div className={style.marketProgressContainer}>
        <div className={style.marketProgressRow1}>
          <div className={style.priceContainer} id="lineDiv">
            <h5 style={{ paddingLeft: 10 }}>Prix</h5>
            {width > 0 && (
              <LineZoomChart
                height={250}
                width={width / 2}
                data1={lineData}
                onResetZoom={onResetZoom}
                onZoomed={onZoomed}
              />
            )}
          </div>
          <div className={style.volumesContainer}>
            <h5 style={{ paddingLeft: 10 }}>Volumes</h5>

            {width > 0 && (
              <ColumnChart
                height={100}
                width={width / 2}
                data={chartData}
                ColumnChartRef={ColumnChartRef}
              />
            )}
          </div>
        </div>
        <div className={style.marketProgressRow2}>
          <div className={style.headerTicket}>Plus fortes hausses #</div>
          {marketView?.market_highests_lowests?.highests?.map((h) => (
            <>
              {h.variation > 0 ? (
                <RankGreenLine
                  key={h.id}
                  title={assets.find((a) => a.id === h.asset_id)?.name}
                  rank={"+ " + toFixedOnlyFloat(h.variation * 100)}
                />
              ) : (
                <RankRedLine
                  key={h.id}
                  title={assets.find((a) => a.id === h.asset_id)?.name}
                  rank={toFixedOnlyFloat(h.variation * 100)}
                />
              )}
            </>
          ))}
        </div>

        <div className={style.marketProgressRow3}>
          <div className={style.headerTicket}>Plus fortes baisses #</div>
          {marketView?.market_highests_lowests?.lowests?.map((h) => (
            <>
              {h.variation > 0 ? (
                <RankGreenLine
                  key={h.id}
                  title={assets.find((a) => a.id === h.asset_id)?.name}
                  rank={"+ " + toFixedOnlyFloat(h.variation * 100)}
                />
              ) : (
                <RankRedLine
                  key={h.id}
                  title={assets.find((a) => a.id === h.asset_id)?.name}
                  rank={toFixedOnlyFloat(h.variation * 100)}
                />
              )}
            </>
          ))}
        </div>
      </div>

      <div className={style.performanceContainer}>
        <div className={[style.row1, "mr-4"].join(" ")}>
          <h5 style={{ paddingLeft: 10, fontSize: 18, fontWeight: "bold" }}>
            Tableau des performances
          </h5>

          {/* <div
            style={{
              height: "742px",
              backgroundColor: "teal",
              margin: 20,
            }}
          ></div> */}
          {/* <TableGrid
            data={
              marketViewsPerformanceArray === []
                ? []
                : marketViewsPerformanceArray.find(
                    (m) => m.market_id === market.id
                  )?.data
            }
            options={options1}
            bodyStyle={{ height: "665px", width: "100%" }}
            enablePressRow
            onPressRow={onPressRow}
          /> */}
          <TableMarket
            data={
              marketViewsPerformanceArray === []
                ? []
                : marketViewsPerformanceArray.find(
                    (m) => m.market_id === market.id
                  )?.data
            }
            options={options1}

            onPressRow={onPressRow}

           />
        </div>
        <div className={style.row2}>
          <h5 style={{ paddingLeft: 10, fontSize: 18, fontWeight: "bold" }}>
            Vue d'un actif : {currentAsset.name}
          </h5>

          <div className={style.priceChart} id="priceChart">
            <h5
              style={{
                paddingLeft: 10,
                paddingTop: 10,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Prix
            </h5>
            {width > 0 && (
              <LineZoomChart
                height={250}
                width={width / 3}
                data1={historicalDataChartLineData}
                onResetZoom={onResetZoomAsset}
                onZoomed={onZoomedAsset}
              />
            )}
          </div>

          <div className={style.volumeChart}>
            <h5
              style={{
                paddingLeft: 10,
                paddingTop: 10,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Volumes
            </h5>

            {width > 0 && (
              <ColumnChart
                height={100}
                width={width / 3}
                data={historicalDataColumnData}
                ColumnChartRef={ColumnChartAssetRef}
              />
            )}
          </div>

          <div className={style.tradeRow}>
            <div className={style.statsJourney}>
              <div className={style.headerTicket} style={{ height: 39 }}>
                Stats de la journée #
              </div>
              <RankLineText
                title={"Volume"}
                rank={currentPerformance?.volume?.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                })}
                height={39}
              />
              <RankLineText
                title={"Ouverture"}
                rank={currentPerformance?.open?.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                })}
                height={39}
              />
              <RankLineText
                title={"Plus haut"}
                rank={currentPerformance?.high?.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                })}
                height={39}
              />
              <RankLineText
                title={"Plus bas"}
                rank={currentPerformance?.low?.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                })}
                height={39}
              />
              <RankLineText
                title={"Clôture veille"}
                rank={historicalData[
                  historicalData.length - 1
                ]?.close?.toLocaleString("fr-FR", { minimumFractionDigits: 2 })}
                height={39}
              />
              {/* <RankLineText title={"Volatilité"} rank={"32,231"} height={39} /> */}
            </div>
            <DernierCours
              date={historicalData[historicalData.length - 1]?.market_date}
              price={historicalData[historicalData.length - 1]?.close}
              variation={toFixedOnlyFloat(
                historicalData[historicalData.length - 1]?.variation * 100
              )}
              onClickSale={() => {
                setOperationSens("sale");
                setShowOrder(true);
              }}
              onClickPurchase={() => {
                setOperationSens("purchase");
                setShowOrder(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RankGreenLine = ({ title, rank }) => {
  return (
    <div className={style.lineTicket}>
      <p>{title}</p>
      <div className={style.rankGreen}>
        <p>
          {rank}% <i className="fas fa-caret-up"></i>
        </p>
      </div>
    </div>
  );
};

const RankRedLine = ({ title, rank }) => {
  return (
    <div className={style.lineTicket}>
      <p>{title}</p>
      <div className={style.rankRed}>
        <p>
          {rank}% <i className="fas fa-caret-down"></i>
        </p>
      </div>
    </div>
  );
};

const RankLineText = ({ title, rank, height = 60 }) => {
  return (
    <div className={style.lineTicket} style={{ height }}>
      <p>{title}</p>
      {/* <div className={style.rankRed}> */}
      <p>{rank}</p>
      {/* </div> */}
    </div>
  );
};

export { MarketViewItem, RankLineText };
