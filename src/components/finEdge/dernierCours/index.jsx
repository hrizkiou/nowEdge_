import React from "react";
import PropTypes from "prop-types";
import style from "./style.module.scss";

function DernierCours({
  styleContainer = {},
  date = "16/02/2021 22:34:22",
  price = "212,21",
  variation = "32",
  onClickSale = () => {},
  onClickPurchase = () => {},
}) {
  return (
    <div
      className="card-box"
      style={Object.assign({ marginBottom: 0 }, styleContainer)}
    >
      <h4 className="header-title m-0">Dernier cours</h4>
      <p
        className={["text-muted  m-0", style.s_title].join(" ")}
        style={{ fontSize: "14px" }}
      >
        {date}
      </p>

      <div className={style.content_lt}>
        <div className="widget-detail-1 text">
          <h2 className={["font-weight-normal p-0 m-0", style.prix].join(" ")}>
            {" "}
            {price.toLocaleString('fr-FR',{minimumFractionDigits: 2 ,style: 'currency', currency: 'EUR'})}
          </h2>
        </div>
        {variation > 0 ? (
          <div>
            <span className="badge badge-success badge-pill">
              +{variation}% <i className="ml-2 fas fa-caret-up"></i>{" "}
            </span>
          </div>
        ) : (
          <div>
            <span className="badge badge-danger badge-pill">
              {variation}% <i className="ml-2 fas fa-caret-down"></i>{" "}
            </span>
          </div>
        )}
      </div>
      <p className="text-muted  text-right" style={{ fontSize: "9px" }}>
        Variation par rapport a la veille
      </p>

      <button
        type="button"
        className={["btn btn-block btn--md ", style.btn_ach].join(" ")}
        onClick={onClickPurchase}
      >
        Acheter
      </button>
      <button
        type="button"
        onClick={onClickSale}
        className={["btn btn-block btn--md ", style.btn_vant].join(" ")}
      >
        Vendre
      </button>
    </div>
  );
}

DernierCours.propTypes = {};

export default DernierCours;
