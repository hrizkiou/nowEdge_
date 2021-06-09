import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reactFormatter, ReactTabulator } from "react-tabulator";
import { Col, Row } from "reactstrap";

import { ColumnChart } from "../../../components/charts/highcharts/ColumnChart";
import { LineZoomChart } from "../../../components/charts/highcharts/LineZoomChart";
import DernierCours from "../../../components/finEdge/dernierCours";
import PreLoaderWidget from "../../../components/Loader";
import TableGrid from "../../../components/tables/tablegrid";
import TableGroup from "../../../components/tables/TableGroup";
import TableList from "../../../components/tables/TableList";
import TableFinEdge from "../../../components/tables/tableVueActifs";
import { toFixedOnlyFloat } from "../../../helpers/func";
import { useWindowSize } from "../../../helpers/hooks/useWindowSize";
import { extractDataMinMaxVolumeChart } from "../../../helpers/loops";
import { getPortfolioIndicators } from "../../../redux/FinEdge/actions";
import { getHistoricalData } from "../../../redux/MarketViews/actions";
import { getLastPerformancesData, getLastPositionData, getOrdersData } from "../../../redux/Wallet/actions";
import { RankLineText } from "../marketView/MarketViewItem";
import style from "./style.module.scss";

function gArray(length) {
  return Array.from(Array(length).keys());
}

const head = [
  "Actif",
  "Quantité",
  "Prix d'achat",
  "Dernier cours",
  "Variation",
  "Valorisation",
  "P&L",
];
const listRow = [
  {
    num: 1,
    title: "Actions",
    total: "323.231,22",
    list: gArray(5).map((elm) => [
      "Nokia",
      1000,
      "32, 231",
      "42,213",
      "+3,23%",
      "323.231,22",
      "323.231,22",
    ]),
  },
  {
    num: 2,
    title: "Obligations",
    total: "323.231,22",
    list: gArray(5).map((elm) => [
      "Nokia",
      1000,
      "32, 231",
      "42,213",
      "-3,23%",
      "323.231,22",
      "323.231,22",
    ]),
  },
  {
    num: 3,
    title: "Actions",
    total: "323.231,22",
    list: gArray(5).map((elm) => [
      "Nokia",
      1000,
      "32, 231",
      "42,213",
      "+3,23%",
      "323.231,22",
      "323.231,22",
    ]),
  },
];
const head2 = ["Actif", "Bid", "Ask"];
const listRow2 = [
  {
    num: 1,
    title: "Actions",
    total: "",
    list: gArray(5).map((elm) => ["Nokia", 1000, "32 ,231", "1010"]),
  },
  {
    num: 2,
    title: "Obligations",
    total: "",
    list: [],
  },
  {
    num: 3,
    title: "Actions",
    total: "",
    list: gArray(5).map((elm) => ["Nokia", 1000, "32, 231"]),
  },
];

const head3 = ["Stats de la journée", "#"];
const listRow3 = [
  {
    list: gArray(5).map((elm) => ["Nokia", 1000, "32 ,231", "1010"]),
  },
  {
    list: gArray(5).map((elm) => ["Nokia", 1000, "32, 231"]),
  },
  {
    list: gArray(5).map((elm) => ["Nokia", 1000, "32, 231"]),
  },
];

const head4 = [
  "Date",
  "Achat/Vente",
  "Quantité",
  "Prix transaction",
  "Montant",
];
const listRow4 = [
  {
    list: gArray(5).map((elm) => [
      "01/02/2021",
      "Achat",
      "120",
      "32.21€",
      "-2498",
    ]),
  },
  {
    list: gArray(5).map((elm) => [
      "01/02/2021",
      "Achat",
      "120",
      "32.21€",
      "-2498",
    ]),
  },
  {
    list: gArray(5).map((elm) => [
      "01/02/2021",
      "Achat",
      "120",
      "32.21€",
      "-2498",
    ]),
  },
];

const data = [
  {
    "Date ": "01/02/2021",
    Catégorie: "Action",
    Actif: "Nokia",
    "Achat/Vente": "Vente",
    Quantité: "120",
    "Prix de la transaction": "32.21€",
    Position: "-2498",
  },
  {
    "Date ": "01/02/2021",
    Catégorie: "Action",
    Actif: "Nokia",
    "Achat/Vente": "Achat",
    Quantité: "120",
    "Prix de la transaction": "32.21€",
    Position: "-2498",
  },
  {
    "Date ": "01/02/2021",
    Catégorie: "Action",
    Actif: "Nokia",
    "Achat/Vente": "Vente",
    Quantité: "120",
    "Prix de la transaction": "32123123.21€",
    Position: "-2498",
  },
  {
    "Date ": "01/02/2021",
    Catégorie: "Action",
    Actif: "Nokia",
    "Achat/Vente": "Achat",
    Quantité: "120",
    "Prix de la transaction": "32.21€",
    Position: "-2498",
  },
  {
    "Date ": "01/02/2021",
    Catégorie: "Action",
    Actif: "Nokia",
    "Achat/Vente": "Achat",
    Quantité: "120",
    "Prix de la transaction": "32.21€",
    Position: "-2498",
  },
];
const options = [
  { type: "search" },
  { type: "select" },
  { type: "search" },
  {
    label: {
      Achat: true,
      Vente: false,
    },
  },
];

const data1 = [
  {
    "Date ": "01/02/2021",
    "Achat/Vente": "Action",
    Quantité: "Nokia",
    "Prix transaction": "Vente",
    Montant: "120",
  },
  {
    "Date ": "01/02/2021",
    "Achat/Vente": "Action",
    Quantité: "Nokia",
    "Prix transaction": "Vente",
    Montant: "120",
  },
  {
    "Date ": "01/02/2021",
    "Achat/Vente": "Action",
    Quantité: "Nokia",
    "Prix transaction": "Vente",
    Montant: "120",
  },
  {
    "Date ": "01/02/2021",
    "Achat/Vente": "Action",
    Quantité: "Nokia",
    "Prix transaction": "Vente",
    Montant: "120",
  },
  {
    "Date ": "01/02/2021",
    "Achat/Vente": "Action",
    Quantité: "Nokia",
    "Prix transaction": "Vente",
    Montant: "120",
  },
];
const options1 = [{ width: 100 }];

const data2 = [
  {
    "Stats de la journée": "Volume",
    "#": "32, 231",
  },
  {
    "Stats de la journée": "Ouverture",
    "#": "32, 231",
  },
  {
    "Stats de la journée": "Plus haut",
    "#": "32, 231",
  },
  {
    "Stats de la journée": "Plus bas",
    "#": "32, 231",
  },
  {
    "Stats de la journée": "Clôture veille",
    "#": "32, 231",
  },
];
const options2 = [];

const Title = ({ text }) => {
  return <p className="p-0 m-0">{text}</p>;
};

const Portfolio = ({
  setShowOrder,
  setShow,
  setOperationSens,
  currentPerformance,
  setCurrentPerformance,
  currentAsset,
  setCurrentAsset,
}) => {
  const dispatch = useDispatch();
  const { portfolio, assets } = useSelector(
    (state) => state.FinEdge.initialData
  );
  const [width, height] = useWindowSize();

  const {
    loading,
    orders,
    lastPerformances,
    lastPositions,
    lastPerformancesDataAPI,
  } = useSelector((state) => state.Wallet);
  const {
    loading: MarketViewsLoading,
    historicalDataColumnData,
    historicalDataChartLineData,
    historicalData,
  } = useSelector((state) => state.MarketViews);

  useEffect(() => {
    dispatch(getLastPerformancesData());
    dispatch(getLastPositionData(portfolio.id));

    dispatch(getOrdersData(portfolio.id));
  }, []);

  useEffect(() => {
    currentAsset.id && dispatch(getHistoricalData(currentAsset.id));
  }, [currentAsset]);

  useEffect(() => {
    if (currentAsset === "") {
      const id =
        lastPerformancesDataAPI.length > 0 &&
        lastPerformancesDataAPI[0].asset_id;
      if (id) {
        const asset = assets.find((a) => a.id === id);
        setCurrentAsset(asset);
      }
    }
  }, [lastPerformancesDataAPI]);

  useEffect(() => {
    const performace = lastPerformancesDataAPI.find(
      (lp) => lp.asset_id === currentAsset.id
    );
    setCurrentPerformance(performace);
  }, [lastPerformancesDataAPI, currentAsset]);

  const ColumnChartAssetRef = useRef();

  const onZoomedAsset = (min, max) => {
    const data = extractDataMinMaxVolumeChart(
      min,
      max,
      historicalDataColumnData
    );
    ColumnChartAssetRef.current.chart.series[0].setData(data);
  };

  const refresh = () => {
    dispatch(getLastPerformancesData());
    dispatch(getLastPositionData(portfolio.id));
    dispatch(getPortfolioIndicators(portfolio.id));

    dispatch(getOrdersData(portfolio.id));
  };

  const onResetZoomAsset = () => {
    setTimeout(() => {
      ColumnChartAssetRef.current.chart.series[0].setData(
        historicalDataColumnData
      );
    }, 100);
  };
  return (
    <>
      {(loading || MarketViewsLoading) && <PreLoaderWidget />}
      <>
        <Row>
          <Col sm={3}>
            <Row className="mb-3">
              <Col
                lg={10}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "37px",
                }}
              >
                <Title text={"Vue marché (Bid/Ask)"} />
              </Col>
              <Col
                lg={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "37px",
                }}
              >
                <span class="">
                  {" "}
                  <i class="fas fa-info-circle "></i>{" "}
                </span>
              </Col>
            </Row>
            {/* <TableFinEdge
              head={head2}
              listRow={lastPerformances}
              enablePressRow
              onPressRow={(assetName) => {
                //console.log("---assetName---",assetName)
                const asset = assets.find((a) => a.name === assetName);
                setCurrentAsset(asset);
              }}
            /> */}
            <TableGroup
              columns_p={head2}
              data_p={lastPerformances}
              onPressRow={(assetName) => {
                // //console.log("---assetName---",assetName)
                const asset = assets.find((a) => a.name === assetName);
                setCurrentAsset(asset);
              }}
            />
          </Col>
          <Col sm={9}>
            <Row className="mb-3">
              <Col lg={8} style={{ display: "flex", alignItems: "center" }}>
                <Title text={"Positions du portefeuille"} />
              </Col>
              <Col lg={4}>
                <div className={style.btn_content}>
                  <button
                    type="button"
                    class="btn btn-info waves-effect waves-light width-md mr-2"
                    style={{ backgroundColor: "#5A97F8" }}
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    <i class=" fas fa-plus mr-1"></i>
                    Saisir un ordre
                  </button>
                  <button
                    class="btn btn-icon waves-effect btn-secondary"
                    onClick={refresh}
                  >
                    {" "}
                    <i class="fas fa-sync-alt"></i>{" "}
                  </button>
                </div>
              </Col>
            </Row>
            {/* <TableFinEdge
              head={head}
              listRow={lastPositions}
              enablePressRow
              onPressRow={(assetName) => {
                const asset = assets.find((a) => a.name === assetName);
                setCurrentAsset(asset);
              }}
            /> */}


            <TableGroup
              columns_p={head}
              data_p={lastPositions}
              onPressRow={(assetName) => {
                // //console.log("---assetName---",assetName)
                const asset = assets.find((a) => a.name === assetName);
                setCurrentAsset(asset);
              }}
            />
          </Col>
        </Row>
        {currentAsset !== "" && (
          <Row
            className="mt-3"
            style={{ backgroundColor: "#F7F7F7", paddingBottom: "10px" }}
          >
            <Col lg={12}>
              <h4>Vue d'un actif : {currentAsset.name}</h4>
            </Col>
            <Col lg={6}>
              <div
                className={style.priceChart}
                style={{ backgroundColor: "#fff", paddingBottom: "30px" }}
              >
                <h5
                  style={{
                    paddingLeft: 10,
                    paddingTop: 10,
                    fontSize: 16,
                    fontWeight: "bold",
                    marginTop: "0px",
                  }}
                >
                  Prix
                </h5>
                {width > 0 && (
                  <LineZoomChart
                    height={280}
                    data1={historicalDataChartLineData}
                    onResetZoom={onResetZoomAsset}
                    onZoomed={onZoomedAsset}
                    width={width / 2.4}
                  />
                )}
              </div>
            </Col>
            <Col lg={6}>
              <Row>
                <Col>
                  <div className={style.headerTicket} style={{ height: 39 }}>
                    <div className={style.bl1}>Stats de la journée</div> 
                    <div className={style.bl2}>#</div>
                  </div>
                  <RankLineText
                    title={"Volume"}
                    rank={currentPerformance?.volume?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                    })}
                    height={51}
                  />
                  <RankLineText
                    title={"Ouverture"}
                    rank={currentPerformance?.open?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                    })}
                    height={51}
                  />
                  <RankLineText
                    title={"Plus haut"}
                    rank={currentPerformance?.high?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                    })}
                    height={51}
                  />
                  <RankLineText
                    title={"Plus bas"}
                    rank={currentPerformance?.low?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                    })}
                    height={51}
                  />
                  <RankLineText
                    title={"Clôture veille"}
                    rank={historicalData[
                      historicalData.length - 1
                    ]?.close?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                    })}
                    height={51}
                  />
                </Col>
                <Col>
                  <DernierCours
                    styleContainer={{ paddingBottom: 40 }}
                    date={
                      historicalData[historicalData.length - 1]?.market_date
                    }
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
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <div
                className={style.priceChart}
                style={{
                  backgroundColor: "#fff",
                  height: "305px",
                  paddingTop: "5px",
                }}
              >
                <h5 style={{ paddingLeft: 10 }}>Volumes</h5>
                {width > 0 && (
                  <ColumnChart
                    data={historicalDataColumnData}
                    ColumnChartRef={ColumnChartAssetRef}
                    width={width / 2.4}
                  />
                )}
              </div>
            </Col>
            <Col lg={6}>
              {/* <TableGrid
                data={orders
                  .filter((o) => o.Actif === currentAsset.name)
                  .map(function (item) {
                    delete item.status;
                    return item;
                  })}
                options={options1}
                bodyStyle={{ height: "280px" }}
              /> */}
              <PortefeuilleTable
                data_p={orders
                  .filter((o) => o.Actif === currentAsset.name)
                  .map(function (item) {
                    delete item.status;
                    return item;
                  })}
              />
            </Col>
          </Row>
        )}
      </>
    </>
  );
};

const Label = ({ cell }) => {
  const rowData = cell._cell.row.data;
  const cellValue = cell._cell.value || "";
  if (rowData.type === "group_") return cellValue;
  return (
    <span
      className={`badge ${
        cellValue === "Achat" ? "badge-success" : "badge-danger"
      } badge-pill`}
    >
      {cellValue}{" "}
    </span>
  );
};

const  Status = ({cell})=> {
  
  return cell._cell.value  === 0 
  ? (
    <i class="fas fa-sync-alt" style={{ color: "#f9c851" }}></i>
  ) : cell._cell.value === 1 ? (
    <i class="fas fa-check" style={{ color: "#10c469" }}></i>
  ) : (
    <i class="fas fa-times" style={{ color: "#eb4d4d" }}></i>
  )
}


function customHeaderFilter(headerValue, rowValue, rowData, filterParams) {
  return rowValue
    .toString()
    .toUpperCase()
    .includes(headerValue.toString().toUpperCase());
}

const PortefeuilleTable = ({ data_p }) => {
  // const { loading, orders } = useSelector((state) => state.Wallet);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data_p.length > 0) {
      const orders_ = data_p.map((item) => {
        delete item.status;
        return item;
      });


      const lstc = Object.keys(orders_[0]).filter((elem) => elem !== "Catégorie"  && elem !== "Actif" )

      const columns_ = lstc.map((elem) => {
        if (elem === "Achat/Vente")
          return {
            title: "A/V",
            field: elem,
            hozAlign: "center",
            headerFilterPlaceholder: " ",
            formatter: reactFormatter(<Label value={elem} />),
          };

          if (elem === "Prix de la transaction")
            return {
              title: "Prix",
              field: elem,
              hozAlign: "center",
              headerFilterPlaceholder: " ",
              // formatter: reactFormatter(<Label value={elem} />),
            };

        return {
          title: elem === 'status_' ? "status": elem,
          field: elem,
          ...( elem === 'status_' &&
            {
              formatter:reactFormatter(
                <Status value={elem} />
              )
            }
          )
        };
      });

      setColumns(columns_);
      setData(orders_);
      console.log("=====columns_=====", columns_);
    }
  }, [data_p]);

  // console.log("=====orders=====>>>>",orders)

  return (
    <>
      {/* <TableGrid data={orders} options={options} bodyStyle={{ height:"calc(100vh - 450px)"}} /> */}
      <TableList columns_p={columns} data_p={data} height={"308"} />
    </>
  );
};

export { Portfolio };
