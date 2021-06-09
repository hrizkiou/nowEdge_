import React, { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import { Row, Col } from "reactstrap";
import style from "./style.module.scss";

import circle from "../../../../assets/images/info-circle-solid.svg";
import warning from "../../../../assets/images/warning.svg";
import SwalModal from "../../../SwalModal";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../../../redux/FinEdge/actions";
import Loader from "../../../Loader";
import { httpClient_get } from "../../../../helpers/api";

const OrderModal = ({
  show,
  operation = "purchase",
  order = "market",
  actifs = [
    {
      value: "market1",
      label: "marche 1",
    },
    {
      value: "market2",
      label: "marche 2",
    },
    {
      value: "market3",
      label: "marche 3",
    },
    {
      value: "market4",
      label: "marche 4",
    },
  ],
  // markets = [
  //   {
  //     value: "SX5E",
  //     label: "SX5E",
  //   },
  //   {
  //     value: "S&P_500",
  //     label: "S&P 500",
  //   },
  // ],
  selectedMarket,
  defaultValue = actifs[0],
  marketDefaultValue,
  currentPerformanceProps = {},
  market_last_performances = [],
  onHide = () => {},
  onSuccess = () => {},
}) => {
  const { t } = useTranslation();

  const { markets } = useSelector((state) => state.FinEdge.initialData);
  const [actifsState, setActifsState] = useState(actifs);
  const [marketValue, setMarketValue] = useState(defaultValue);
  const [loadingState, setLoadingState] = useState(false);
  const [market_last_performancesState, setMarket_last_performancesState] =
    useState(market_last_performances);
  const [market, setMarket] = useState(
    selectedMarket
      ? selectedMarket
      : {
          value: markets[0].id,
          label: markets[0].name,
        }
  );
  const [marketText, setMarketText] = useState("212,21");
  const [operationSens, setOperationSens] = useState(operation);
  const [currentPerformance, setCurrentPerformance] = useState(
    currentPerformanceProps
  );
  const [orderType, setOrderType] = useState(order);
  const [orderStopText, setOrderStopText] = useState("");
  const [limitedPriceText, setLimitedPriceText] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [part, setPart] = useState(1);

  const { id } = useSelector((state) => state.FinEdge.initialData.portfolio);
  const { loading } = useSelector((state) => state.FinEdge);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`currentPerformance---------------------`, currentPerformance);
    setLoadingState(true);
    return httpClient_get(
      `/participant/finedge/getlastperformances?asset_id=${currentPerformance.asset_id}`
    )
      .then((response) => {
        setLoadingState(false);
        if (response.data.length > 0) {
          console.log(`response.data`, response.data[0]);

          setCurrentPerformance(response.data[0]);
        }
      })
      .catch((error) => {
        setLoadingState(false);

        console.log(`error`, error);
      });
  }, []);
  useEffect(() => {
    if (operationSens === "purchase") {
      setMarketText(currentPerformance?.ask);
    }
    if (operationSens === "sale") {
      setMarketText(currentPerformance?.bid);
    }
  }, [operationSens, currentPerformance]);

  useEffect(() => {
    // //console.log(`marketValue`, marketValue);
    setCurrentPerformance(
      market_last_performancesState.find(
        (m) => m.asset_id === marketValue.value
      )
    );
  }, [marketValue]);

  const onSubmit = () => {
    setPart(2);
  };

  const validOrder = () => {
    const data = {
      portfolio_id: id,
      asset_id: marketValue.value,
      direction: operationSens === "purchase" ? 0 : 1,
      quantity,
      order_type: parseFloat(
        orderType === "market" ? 0 : orderType === "limited_price" ? 1 : 2
      ),
      price: parseFloat(
        orderType === "market"
          ? marketText
          : orderType === "limited_price"
          ? limitedPriceText.replace(",", ".")
          : orderStopText.replace(",", ".")
      ),
    };

    dispatch(
      addOrder(data, () => {
        onHide();
        SwalModal({
          text: "Votre ordre a été envoyé",
          icon: "success",
        });
      })
    );
    // //console.log(`data`, data);
  };
  return (
    <Modal show={show} dialogClassName={"daysModal"} centered>
      <Modal.Body style={{ minWidth: "100%", backgroundColor: "transparent" }}>
       
        {part === 1 ? (
          <PartOne
            {...{
              actifs: actifsState,
              setActifsState,
              setMarket_last_performancesState,
              markets,
              selectedMarket,
              marketValue,
              setMarketValue,
              operationSens,
              setOperationSens,
              orderType,
              setOrderType,
              orderStopText,
              setOrderStopText,
              limitedPriceText,
              setLimitedPriceText,
              quantity,
              setQuantity,
              onHide,
              onSubmit,
              marketText,
              market,
              setMarket,
              currentPerformance,
              loadingState,
              t,
            }}
          />
        ) : (
          <PartTwo
            {...{
              marketValue,
              operationSens,
              orderType,
              orderStopText,
              limitedPriceText,
              quantity,
              onSuccess,
              setPart,
              onHide,
              validOrder,
              marketText,
              loading,
              t,
            }}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

const PartOne = ({
  actifs,
  markets,
  marketValue,
  setActifsState,
  setMarket_last_performancesState,
  setMarketValue,
  market,
  setMarket,
  operationSens,
  setOperationSens,
  orderType,
  setOrderType,
  orderStopText,
  setOrderStopText,
  limitedPriceText,
  setLimitedPriceText,
  quantity,
  setQuantity,
  onHide,
  onSubmit,
  marketText,
  selectedMarket,
  currentPerformance,
  loadingState,
  t,
}) => {
  const { marketViewsData } = useSelector((state) => state.MarketViews);

  const { assets } = useSelector((state) => state.FinEdge.initialData);
  const onChange = (ev) => {
    setMarket(ev);
    const marketView = marketViewsData.find((m) => m.market_id === ev.value);
    const res = marketView.market_last_performances.map((item) => {
      const asset = assets.find((a) => a.id === item.asset_id);

      return {
        value: asset.id,
        label: asset.name,
      };
    });
    setMarket_last_performancesState(marketView.market_last_performances);
    setActifsState(res);
    setMarketValue(res[0]);
  };
  return (
    <div
      className={"dayOneModalPV"}
      style={{
        width: 491,
        height: "45rem",
        borderRadius: 4,
      }}
    >
     {loadingState && <Loader />}
      <div className="title">{t("finEdge.order.title")}</div>

      <div className="mt-3" style={{ flex: "1" }}>
        <h5
          style={{
            fontWeight: "normal",
          }}
          className="icon"
        >
          {t("finEdge.order.chooseMarket")}
        </h5>

        <Select
          options={markets.map((m) => {
            return {
              value: m.id,
              label: m.name,
            };
          })}
          value={market}
          isDisabled={selectedMarket}
          onChange={onChange}
        />
      </div>

      <div className="mt-3" style={{ flex: "1" }}>
        <h5
          style={{
            fontWeight: "normal",
          }}
          className="icon"
        >
          {t("finEdge.order.chooseValue")}
        </h5>

        <Select
          options={actifs}
          defaultValue={marketValue}
          value={marketValue}
          onChange={(ev) => {
            setMarketValue(ev);
          }}
        />
      </div>

      <div className="mt-3" style={{ flex: "1" }}>
        <h5
          style={{
            fontWeight: "normal",
          }}
          className="icon"
        >
          {t("finEdge.order.sensOperation")}
        </h5>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "80%",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            <div className={["radio ", "radio-success"].join(" ")}>
              <input
                type="radio"
                checked={operationSens === "purchase"}
                onClick={() => setOperationSens("purchase")}
                id="purchase"
              />
              <label htmlFor={"purchase"} style={{ cursor: "pointer" }}>
                {t("finEdge.order.achat")}
              </label>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            <div className={["radio ", "radio-danger"].join(" ")}>
              <input
                type="radio"
                checked={operationSens === "sale"}
                onClick={() => setOperationSens("sale")}
                id="sale"
              />
              <label htmlFor={"sale"} style={{ cursor: "pointer" }}>
                {t("finEdge.order.vente")}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3" style={{ flex: "1" }}>
        <h5
          style={{
            fontWeight: "normal",
          }}
          className="icon"
        >
          {t("finEdge.order.quantity")}
        </h5>

        <div className="input-group  bootstrap-touchspin bootstrap-touchspin-injected">
          <input
            placeholder="Exemple :21"
            type="text"
            pattern="[0-9]*"
            className="form-control"
            value={quantity}
            onChange={(e) => {
              const quantityTxt = e.target.validity.valid
                ? e.target.value
                : quantity;

              setQuantity(parseInt(quantityTxt === "" ? 0 : quantityTxt));
            }}
          />
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              width: "26px",
            }}
          >
            <button
              className="btn btn-primary bootstrap-touchspin-up "
              onClick={() => {
                let quantityTxt = quantity + 1;
                setQuantity(quantityTxt);
              }}
              style={{
                height: "19px",
                padding: "0px",
                borderRadius: " 0px",
                borderTopRightRadius: "8px",
              }}
              type="button"
            >
              +
            </button>
            <button
              className="btn btn-primary bootstrap-touchspin-down "
              type="button"
              onClick={() => {
                if (quantity > 0) {
                  let quantityTxt = quantity - 1;
                  setQuantity(quantityTxt);
                }
              }}
              style={{
                height: "19px",
                padding: "0px",
                borderRadius: " 0px",
                borderBottomRightRadius: "8px",
              }}
            >
              -
            </button>
          </span>
        </div>
      </div>

      <div className="mt-3" style={{ flex: "1" }}>
        <h5
          style={{
            fontWeight: "normal",
          }}
          className="icon"
        >
          {t("finEdge.order.orderType")}
        </h5>
        <div className={["radio ", "radio-success"].join(" ")}>
          <input
            type="radio"
            checked={orderType === "market"}
            onClick={() => {
              setOrderType("market");
              setLimitedPriceText("");
              setOrderStopText("");
            }}
            id="market"
          />
          <label
            htmlFor={"market"}
            style={{ cursor: "pointer", width: "6rem" }}
          >
            {t("finEdge.order.market")}
          </label>
          <input
            value={marketText.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
            })}
            // onChange={(e) => {
            //   setLimitedPriceText(e.target.value);
            // }}
            disabled
            placeholder="Cours"
            style={{
              margin: 10,
              height: "auto",
              width: "auto",
              display: "inline",
              backgroundColor: "#ccc",
            }}
            className="form-control"
            dir="rtl"
          />
          <div className={style.details_market}>
            <img src={circle} style={{ cursor: "pointer" }} />

            <div className={style.details_market_show_detail_hover}>
              <p>{t("finEdge.order.marketInfo")}</p>
            </div>
          </div>
        </div>
        <div className={["radio ", "radio-success"].join(" ")}>
          <input
            type="radio"
            checked={orderType === "limited_price"}
            onClick={() => {
              setOrderType("limited_price");
              setLimitedPriceText(marketText);
              setOrderStopText("");
            }}
            id="limited_price"
          />
          <label
            htmlFor={"limited_price"}
            style={{ cursor: "pointer", width: "6rem" }}
          >
            {t("finEdge.order.limitedPrice")}
          </label>
          {/* <div style={{ padding: 10 }}> */}
          <input
            value={limitedPriceText}
            onChange={(e) => {
              setLimitedPriceText(e.target.value);
            }}
            placeholder="Cours"
            style={{
              margin: 10,
              height: "auto",
              width: "auto",
              display: "inline",
            }}
            className="form-control"
            dir="rtl"
            type="number"
          />

          <div className={style.details_order_cours_limit}>
            <img src={circle} style={{ cursor: "pointer" }} />

            <div className={style.order_cours_limit_show_detail_hover}>
              <p>{t("finEdge.order.limitedPriceInfo")}</p>
            </div>
          </div>
        </div>
        <div className={["radio ", "radio-success"].join(" ")}>
          <input
            type="radio"
            checked={orderType === "stop_order"}
            onClick={() => {
              setOrderType("stop_order");
              setLimitedPriceText("");
              setOrderStopText(marketText);
            }}
            id="stop_order"
          />
          <label
            htmlFor={"stop_order"}
            style={{ cursor: "pointer", width: "6rem" }}
          >
            {t("finEdge.order.orderStop")}
          </label>

          <input
            value={orderStopText}
            onChange={(e) => {
              setOrderStopText(e.target.value);
            }}
            placeholder="Cours"
            style={{
              margin: 10,
              height: "auto",
              width: "auto",
              display: "inline",
            }}
            className="form-control"
            dir="rtl"
            type="number"
          />

          <div className={style.details_order_stop}>
            <img src={circle} style={{ cursor: "pointer" }} />

            <div className={style.order_stop_show_detail_hover}>
              <p>{t("finEdge.order.orderStopInfo")}</p>
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 12, color: "#3F4351" }}>
        {t("finEdge.order.note")}
      </p>

      <Row className="show-grid justify-content-md-center mt-3 float-right">
        <Col>
          <button
            type="button"
            className="btn btn-secondary waves-effect waves-light width-xs mr-2"
            style={{ backgroundColor: "#6C757D", borderWidth: "0px" }}
            onClick={() => onHide()}
          >
            {t("finEdge.order.cancel")}
          </button>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light width-xs"
            style={{ backgroundColor: "#71B6F9" }}
            onClick={onSubmit}
          >
            {t("finEdge.order.envoyer")}
          </button>
        </Col>
      </Row>
    </div>
  );
};

const PartTwo = ({
  marketValue,
  operationSens,
  orderType,
  orderStopText,
  limitedPriceText,
  marketText,
  quantity,
  onSuccess,
  setPart,
  onHide,
  validOrder,
  loading,
  t,
}) => {
  const getOrderType = () => {
    switch (orderType) {
      case "market":
        return (
          t("finEdge.order.market") +
          " @" +
          marketText.toLocaleString("fr-FR", { minimumFractionDigits: 2 })
        );
      case "limited_price":
        return (
          t("finEdge.order.limitedPrice") +
          " @" +
          limitedPriceText.toLocaleString("fr-FR", { minimumFractionDigits: 2 })
        );
      case "stop_order":
        return (
          t("finEdge.order.orderStop") +
          " @" +
          orderStopText.toLocaleString("fr-FR", { minimumFractionDigits: 2 })
        );
      default:
        return "";
    }
  };
  return (
    <div
      className={"dayOneModalPV"}
      style={{
        width: 383,
        height: 455,
        borderRadius: 4,

        display: "flex",
        flexDirection: "column",

        alignItems: "center",
      }}
    >
      {loading && <Loader />}
      <img src={warning} />

      <h5 style={{ fontSize: 16 }}> {t("finEdge.order.titleConfirmation")}</h5>

      <div
        style={{
          marginTop: 15,
          width: 295,
          height: 155,
          backgroundColor: operationSens === "sale" ? "#FFEDED" : "#F4FFED",
          border:
            operationSens === "sale"
              ? "1px solid #FF4040"
              : "1px solid #04B303",
          borderRadius: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h3>{operationSens === "sale" ? "Vente" : "Achat"}</h3>
        <h5 style={{ fontWeight: "normal", margin: 2 }}>
          {t("finEdge.order.value")}: {marketValue?.label}
        </h5>
        <h5 style={{ fontWeight: "normal", margin: 2 }}>
          {t("finEdge.order.quantity")} : {quantity}
        </h5>
        <h5 style={{ fontWeight: "normal", margin: 2 }}>
          {t("finEdge.order.orderType")} : {getOrderType()}
        </h5>
      </div>

      <Row className="show-grid justify-content-md-center mt-3 float-right">
        <Col>
          <button
            type="button"
            className="btn btn-secondary waves-effect waves-light width-xs mr-2"
            style={{
              backgroundColor: "#F6F7FC",
              borderWidth: "0px",
              color: "#343A40",
            }}
            onClick={() => setPart(1)}
          >
            {t("finEdge.order.no")}
          </button>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light width-xs"
            style={{ backgroundColor: "#71B6F9" }}
            onClick={() => {
              validOrder();
            }}
          >
            {t("finEdge.order.yes")}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export { OrderModal };
