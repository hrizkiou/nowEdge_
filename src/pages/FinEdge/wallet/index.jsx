import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Card, Nav, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, Button, Col, Row } from "reactstrap";

import { ColumnChart } from "../../../components/charts/highcharts/ColumnChart";
import { LineZoomChart } from "../../../components/charts/highcharts/LineZoomChart";
import DernierCours from "../../../components/finEdge/dernierCours";
import HeadP from "../../../components/finEdge/HeadP";
import { OrderModal } from "../../../components/modal/FinEdgeModals/OerderModal/OrderModal";
import TableGrid from "../../../components/tables/tablegrid";
import TableFinM from "../../../components/tables/tableM";
import TableFinEdge from "../../../components/tables/tableVueActifs";
import { getMarketViewsData, getPortfolioIndicators } from "../../../redux/actions";
import { Blotter } from "./Blotter";
import { Portfolio } from "./Portfolio";

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
    list: gArray(5).map((elm) => ["Nokia", 1000, "32, 231"]),
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
  {
    "Stats de la journée": "Volatilité",
    "#": "32, 231",
  },
  {
    "Stats de la journée": "Volume",
    "#": "32, 231",
  },
];
const options2 = [];

const Title = ({ text }) => {
  return <p className="p-0 m-0">{text}</p>;
};

const Wallet = ({}) => {
  const [showOrder, setShowOrder] = useState(false);
  const [show, setShow] = useState(false);
  const [operationSens, setOperationSens] = useState("purchase");
  const [key, setKey] = useState("theory");

  const dispatch = useDispatch()
  const [currentPerformance, setCurrentPerformance] = useState({});

  const [marketView, setMarketView] = useState({});
  const [market, setMarket] = useState({});
  const [currentAsset, setCurrentAsset] = useState("");

  const { markets, assets, portfolio } = useSelector((state) => state.FinEdge.initialData);

  const {
    marketViewsChartColumnData,
    marketViewsChartLineData,
    marketViewsData,
    marketViewsPerformanceArray,
    historicalData,
    historicalDataChartLineData,
    historicalDataColumnData,
  } = useSelector((state) => state.MarketViews);

  useEffect(() => {
    dispatch(getMarketViewsData());
    dispatch(getPortfolioIndicators(portfolio.id));
  }, [])
  useEffect(() => {
     setMarketView(marketViewsData.find((m) => m.market_id === currentAsset.market_id));

  }, [marketViewsData,currentAsset]);
  
  useEffect(() => {
    setMarket(markets.find((market)=> market.id === currentAsset.market_id));
  }, [markets, currentAsset]);
  // //console.log(row)
  return (
    <div style={{ marginLeft: "68px", marginTop: "44px" }}>
      {showOrder && (
        <OrderModal
          show={showOrder}
          onHide={() => {
            setShowOrder(false);
          }}
          operation={operationSens}
          selectedMarket={()=>{
            const m = markets.find((market)=> market.id === currentAsset.market_id);
            return { value: m.id, label: m.name }
          }}
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
      {show && (
        <OrderModal
          show={show}
          onHide={() => {
            setShow(false);
          }}
          operation={operationSens}
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
      <div class="row">
        <h3 style={{ paddingLeft: "12px" }}>Portefeuille </h3>
      </div>
      <HeadP />
      <div class="col-md-12">
        <Tab.Container
          id="left-tabs-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Row>
            <Col style={{ marginLeft: "1px" }}>
              <Nav variant="pills" className="flex-row">
                <Nav.Item>
                  <Nav.Link eventKey={"theory"} className="tab-anc">
                    Portefeuille
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={"rules"} className="tab-anc">
                    Blotter
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey={"theory"}>
                  {key === "theory" && (
                    <Portfolio
                      setShowOrder={setShowOrder}
                      setShow={setShow}
                      setOperationSens={setOperationSens}
                      currentPerformance={currentPerformance}
                      setCurrentPerformance={setCurrentPerformance}
                      currentAsset={currentAsset}
                      setCurrentAsset={setCurrentAsset}
                    />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey={"rules"}>
                  {key === "rules" && <Blotter />}
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
};

Wallet.propTypes = {};

export default Wallet;
