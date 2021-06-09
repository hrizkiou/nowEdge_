import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { toFixedOnlyFloat } from "../../../helpers/loops";

const HeadP = ({}) => {
  const portfolioIndicator = useSelector(
    (state) => state.FinEdge.portfolioIndicator
  );

  const cashPosition = portfolioIndicator.find((pi) => pi.indicator_id === 1);
  const valorisation = portfolioIndicator.find((pi) => pi.indicator_id === 2);
  const PandL = portfolioIndicator.find((pi) => pi.indicator_id === 3);
  const ranking = portfolioIndicator.find((pi) => pi.indicator_id === 10);

  return (
    <div class="row">
      <div class="col-xl-3 col-md-6">
        <div class="card-box">
          <h4 class="header-title mt-0">Cash position</h4>

          <div class="widget-chart-1">
            <div class="widget-chart-box-1 float-left" dir="ltr">
              {/* <div style="display:inline;width:80px;height:80px;"><canvas width="160" height="160" style="width: 80px; height: 80px;"></canvas><input data-plugin="knob" data-width="80" data-height="80" data-fgcolor="#f05050 " data-bgcolor="#F9B9B9" value="58" data-skin="tron" data-angleoffset="180" data-readonly="true" data-thickness=".15" readonly="readonly" style="width: 44px; height: 26px; position: absolute; vertical-align: middle; margin-top: 26px; margin-left: -62px; border: 0px; background: none; font: bold 16px Arial; text-align: center; color: rgb(240, 80, 80); padding: 0px; appearance: none;"></div> */}
            </div>

            {cashPosition ? (
              cashPosition.variation > 0 ? (
                <span class="badge badge-success badge-pill float-left mt-3 pl-2 pr-2">
                  {toFixedOnlyFloat(cashPosition.variation * 100)} %{" "}
                  <i class="ml-2 fas fa-caret-up"></i>{" "}
                </span>
              ) : (
                <span class="badge badge-danger badge-pill float-left mt-3 pl-2 pr-2">
                  {toFixedOnlyFloat(cashPosition.variation * 100)}%{" "}
                  <i class="ml-2 fas fa-caret-down"></i>{" "}
                </span>
              )
            ) : (
              <span class="badge badge-info badge-pill float-left mt-3 pl-2 pr-2">
                N/A
              </span>
            )}
            <div class="widget-detail-1 text-right">
              <h2 class="font-weight-normal pt-2 mb-1">
                {" "}
                {cashPosition
                  ? cashPosition.value.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      style: "currency",
                      currency: "EUR",
                    })
                  : "N/A"}{" "}
              </h2>
              <p class="text-muted mb-0" style={{ minHeight: "21px" }}></p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card-box">
          <h4 class="header-title mt-0">Valorisation</h4>

          <div class="widget-chart-1">
            <div class="widget-chart-box-1 float-left" dir="ltr">
              {/* <div style="display:inline;width:80px;height:80px;"><canvas width="160" height="160" style="width: 80px; height: 80px;"></canvas><input data-plugin="knob" data-width="80" data-height="80" data-fgcolor="#f05050 " data-bgcolor="#F9B9B9" value="58" data-skin="tron" data-angleoffset="180" data-readonly="true" data-thickness=".15" readonly="readonly" style="width: 44px; height: 26px; position: absolute; vertical-align: middle; margin-top: 26px; margin-left: -62px; border: 0px; background: none; font: bold 16px Arial; text-align: center; color: rgb(240, 80, 80); padding: 0px; appearance: none;"></div> */}
            </div>

            {valorisation ? (
              valorisation.variation > 0 ? (
                <span class="badge badge-success badge-pill float-left mt-3 pl-2 pr-2">
                  {toFixedOnlyFloat(valorisation.variation * 100)} %{" "}
                  <i class="ml-2 fas fa-caret-up"></i>{" "}
                </span>
              ) : (
                <span class="badge badge-danger badge-pill float-left mt-3 pl-2 pr-2">
                  {toFixedOnlyFloat(valorisation.variation * 100)}%{" "}
                  <i class="ml-2 fas fa-caret-down"></i>{" "}
                </span>
              )
            ) : (
              <span class="badge badge-info badge-pill float-left mt-3 pl-2 pr-2">
                N/A
                {/* <i class="ml-2 fas fa-caret-down"></i>{" "} */}
              </span>
            )}

            <div class="widget-detail-1 text-right">
              <h2 class="font-weight-normal pt-2 mb-1">
                {" "}
                {valorisation
                  ? valorisation.value.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      style: "currency",
                      currency: "EUR",
                    })
                  : "N/A"}
              </h2>
              <p class="text-muted mb-0" style={{ minHeight: "21px" }}></p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card-box">
          <h4 class="header-title mt-0 ">P&L</h4>

          <div class="widget-chart-1">
            <div class="widget-chart-box-1 float-left" dir="ltr"></div>

            {PandL ? (
              PandL.variation > 0 ? (
                <span class="badge badge-success badge-pill float-left mt-3 pl-2 pr-2">
                  {toFixedOnlyFloat(PandL.variation * 100)} %{" "}
                  <i class="ml-2 fas fa-caret-up"></i>{" "}
                </span>
              ) : (
                <span class="badge badge-danger badge-pill float-left mt-3 pl-2 pr-2">
                  {toFixedOnlyFloat(PandL.variation * 100)}%{" "}
                  <i class="ml-2 fas fa-caret-down"></i>{" "}
                </span>
              )
            ) : (
              <span class="badge badge-info badge-pill float-left mt-3 pl-2 pr-2">
                N/A
              </span>
            )}
            <div class="widget-detail-1 text-right">
              <h2 class="font-weight-normal pt-2 mb-1">
                {" "}
                {PandL
                  ? PandL.value.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      style: "currency",
                      currency: "EUR",
                    })
                  : "N/A"}{" "}
              </h2>
              <p class="text-muted mb-0" style={{ minHeight: "21px" }}></p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card-box">
          <h4 class="header-title mt-0 ">Classement</h4>

          <div class="widget-chart-1">
            <div class="widget-chart-box-1 float-left" dir="ltr"></div>

            {ranking ? (
              ranking.variation > 0 ? (
                <span class="badge badge-success badge-pill float-left mt-3 pl-2 pr-2">
                  {toFixedOnlyFloat(ranking.variation * 100)} %{" "}
                  <i class="ml-2 fas fa-caret-up"></i>{" "}
                </span>
              ) : (
                <span class="badge badge-danger badge-pill float-left mt-3 pl-2 pr-2">
                  {toFixedOnlyFloat(ranking.variation * 100)}%{" "}
                  <i class="ml-2 fas fa-caret-down"></i>{" "}
                </span>
              )
            ) : (
              <span class="badge badge-info badge-pill float-left mt-3 pl-2 pr-2">
                N/A
              </span>
            )}

            <div class="widget-detail-1 text-right">
              <h2 class="font-weight-normal pt-2 mb-1">
                {" "}
                {ranking ? `${ranking.value} ème` : "N/A"}{" "}
              </h2>
              <p class="text-muted mb-0" style={{ minHeight: "21px" }}></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeadP.propTypes = {};

export default HeadP;
