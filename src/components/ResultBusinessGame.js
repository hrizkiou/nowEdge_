import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, CardBody } from "reactstrap";

import { Modal, Dropdown, Tab, Nav } from "react-bootstrap";
import groupImg from "../assets/images/groupImg.svg";
import dollar from "../assets/images/dollar-sign-solid.svg";
import { ReactComponent as Groupe332 } from "../assets/images/groupe332.svg";
import { ReactComponent as Chimney } from "../assets/images/chimney.svg";
import { ReactComponent as Megaphone } from "../assets/images/megaphone.svg";
import { ReactComponent as Setup } from "../assets/images/setup.svg";
import NoPathCopie from "../assets/images/NoPathCopie.png";
import TimesCircle from "../assets/images/times-circle-regular.svg";
import ChimneyBlue from "../assets/images/chimney_blue.svg";
import StatsGroupe from "../assets/images/groupe332.svg";
import SetupBlue from "../assets/images/setup_blue.svg";
import MegaphoneBlue from "../assets/images/megaphone_blue.svg";
import Team from "../assets/images/team.svg";
import { Link } from "react-router-dom";

import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import BarOneExChart from "../components/charts/BarOneExChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import {
  addDecisionSimulations,
  initScenarioSaveSuccess,
  initSimulations,
  runSimulations,
  saveScenario,
} from "../redux/StratEdge/actions";

import Loader from "../components/Loader";
import SwalModal from "../components/SwalModal";
import { formatNumber } from "../helpers/formatNumbers";
import i18n from "i18next";
const ResultBusinessGame = (props) => {
  const { result, isModal, isNotAnalysis, roundScenarios, rounds, t } = props;

  const { scenarioResults, teamCompetitors } = result;

  useEffect(() => {
    function compare(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
    rounds.sort(compare);
  }, [rounds]);


  const StatsNav = (props) => {
    const { scenarioResults, teamCompetitors, isNotAnalysis, config } = props;
    const {
      firstMarketName,
      setFirstMarketName,
      secondMarketName,
      setSecondMarketName,
    } = props;

    let { roundScenarios } = props;

    const [firstMarketVolume, setFirstMarketVolume] = useState({
      data: [],
      labels: [],
    });
    const [firstMarketMarge, setFirstMarketMarge] = useState({
      data: [],
      labels: [],
    });

    const [secondMarketVolume, setSecondMarketVolume] = useState({
      data: [],
      labels: [],
    });
    const [secondMarketMarge, setSecondMarketMarge] = useState({
      data: [],
      labels: [],
    });

    const [secondMarketCost, setSecondMarketCost] = useState({
      data: [],
      labels: [],
    });

    const [secondMarketCapacity, setSecondMarketCapacity] = useState({
      data: [],
      labels: [],
    });

    const [firstMarketCost, setFirstMarketCost] = useState({
      data: [],
      labels: [],
    });
    const [firstMarketCapacity, setFirstMarketCapacity] = useState({
      data: [],
      labels: [],
    });
    const [caDatasets, setCaDatasets] = useState([]);
    const [ebitdaDatasets, setEbitdaDatasets] = useState([]);
    const [costDatasets, setCostDatasets] = useState([]);
    const [capacityDatasets, setCapacityDatasets] = useState([]);

    // const [firstMarketName, setFirstMarketName] = useState(false);
    // const [secondMarketName, setSecondMarketName] = useState(false);

    useEffect(() => {
      // //console.log("scenarioResults $$$$$$$$$$$$$$", config);
      if (scenarioResults && config) {
        calculData();
      }
    }, [scenarioResults, config]);

    const calculData = () => {
      const firstMarketData = [];
      const secondMarketData = [];
      const dataColors = [
        // "rgba(24, 138, 226, 1)",
        // "rgba(216, 122, 243, 1)",
        // "rgba(16, 196, 105, 1)",
        // "rgba(243, 231, 122, 1)",

        "#fcb539",
        "#cd3b4b",
        "#c2c928",
        "#42aeb8",
      ];
      const caData = [];
      const ebitdaData = [];
      const costData = [];
      const capacityData = [];

      const fmVolume = {
        data: [],
        labels: [],
        colors: [],
      };
      const fmMarge = {
        data: [],
        labels: [],
        colors: [],
      };
      const fmCost = {
        data: [],
        labels: [],
      };
      const fmCapacity = {
        data: [],
        labels: [],
      };
      const smVolume = {
        data: [],
        labels: [],
        colors: [],
      };
      const smMarge = {
        data: [],
        labels: [],
        colors: [],
      };
      const smCost = {
        data: [],
        labels: [],
      };
      const smCapacity = {
        data: [],
        labels: [],
      };

      if (config.competitors.length > 0) {
        for (const competitor of config.competitors) {
          const sr = scenarioResults.find(
            (s) =>
              s.teamId ===
              (teamCompetitors &&
                teamCompetitors.length > 0 &&
                teamCompetitors.find(
                  (tc) => competitor.id === tc.competitorId
                ) &&
                teamCompetitors.find((tc) => competitor.id === tc.competitorId)
                  .teamId)
          );
          if (!firstMarketName)
            setFirstMarketName(
              config.markets.find(
                (m) => m.id === (sr && sr.marketResults[0].marketId)
              )
            );
          if (!secondMarketName)
            setSecondMarketName(
              config.markets.find(
                (m) => m.id === (sr && sr.marketResults[1].marketId)
              )
            );

          firstMarketData.push({
            marketResults: sr && sr.marketResults[0],
            competitor,
          });
          secondMarketData.push({
            marketResults: sr && sr.marketResults[1],
            competitor,
          });
        }
      }
      // for (const sr of scenarioResults) {
      //   const competitor =
      //     config.competitors.length > 0 &&
      //     config.competitors.find(
      //       (c) =>
      //         sr.teamId ===
      //         (teamCompetitors &&
      //           teamCompetitors.length > 0 &&
      //           teamCompetitors.find((tc) => c.id === tc.competitorId).teamId),
      //     );
      //   firstMarketData.push({
      //     marketResults: sr.marketResults[0],
      //     competitor,
      //   });
      //   secondMarketData.push({
      //     marketResults: sr.marketResults[1],
      //     competitor,
      //   });
      // }

      for (const fm of firstMarketData) {
        fmVolume.data.push(fm && fm.marketResults && fm.marketResults.volume);
        fmVolume.labels.push(fm.competitor && fm.competitor.name);
        fmVolume.colors.push(
          dataColors[
            config.competitors.findIndex((c) => fm.competitor.id === c.id)
          ]
        );

        fmMarge.data.push(fm && fm.marketResults && fm.marketResults.margin);
        fmMarge.labels.push(fm.competitor && fm.competitor.name);
        fmMarge.colors.push(
          dataColors[
            config.competitors.findIndex((c) => fm.competitor.id === c.id)
          ]
        );

        fmCost.data.push(fm && fm.marketResults && fm.marketResults.cost);
        fmCost.labels.push(fm.competitor && fm.competitor.name);
        // fmCost.colors.push(
        //   dataColors[
        //     config.competitors.findIndex((c) => fm.competitor.id === c.id)
        //   ],
        // );
        fmCapacity.data.push(fm && fm.marketResults && fm.marketResults.volume);
        fmCapacity.labels.push(fm.competitor && fm.competitor.name);
        // fmCapacity.colors.push(
        //   dataColors[
        //     config.competitors.findIndex((c) => fm.competitor.id === c.id)
        //   ],
        // );
      }
      setFirstMarketVolume(fmVolume);

      setFirstMarketMarge(fmMarge);

      setFirstMarketCost(fmCost);

      setFirstMarketCapacity(fmCapacity);

      for (const sm of secondMarketData) {
        smVolume.data.push(sm && sm.marketResults && sm.marketResults.volume);
        smVolume.labels.push(sm.competitor && sm.competitor.name);
        smVolume.colors.push(
          dataColors[
            config.competitors.findIndex((c) => sm.competitor.id === c.id)
          ]
        );

        smMarge.data.push(sm && sm.marketResults && sm.marketResults.margin);
        smMarge.labels.push(sm.competitor && sm.competitor.name);
        smMarge.colors.push(
          dataColors[
            config.competitors.findIndex((c) => sm.competitor.id === c.id)
          ]
        );

        smCost.data.push(sm && sm.marketResults && sm.marketResults.cost);
        smCost.labels.push(sm.competitor && sm.competitor.name);
        // smCost.colors.push(
        //   dataColors[
        //     config.competitors.findIndex((c) => sm.competitor.id === c.id)
        //   ],
        // );

        smCapacity.data.push(sm && sm.marketResults && sm.marketResults.volume);
        smCapacity.labels.push(sm.competitor && sm.competitor.name);
        // smCapacity.colors.push(
        //   dataColors[
        //     config.competitors.findIndex((c) => sm.competitor.id === c.id)
        //   ],
        // );
      }
      setSecondMarketVolume(smVolume);

      setSecondMarketMarge(smMarge);

      setSecondMarketCost(smCost);

      // //console.log("smCapacity ************************", smCapacity);
      setSecondMarketCapacity(smCapacity);

      if (isNotAnalysis) {
        const currentRoundActive = rounds.find((r) => r.status === 0);
        if (currentRoundActive) {
          roundScenarios = roundScenarios.filter(
            (rs) => rs.roundId !== currentRoundActive.id
          );
        }
        roundScenarios.push({ scenarioResults, teamCompetitors });
      }

      for (const competitor of config.competitors) {
        const caValues = [];
        const ebitdaValues = [];
        const costValues = [];
        const capacityValues = [];
        const teamId =
          config.teamCompetitors &&
          config.teamCompetitors.length > 0 &&
          config.teamCompetitors.find((tc) => tc.competitorId === competitor.id)
            .teamId;
        for (const rs of roundScenarios) {
          const scenarioResult = rs.scenarioResults.find(
            (rs) => rs.teamId === teamId
          );

          if (scenarioResult) {
            caValues.push(scenarioResult.ca);
            ebitdaValues.push(scenarioResult.ebitda);
            costValues.push(scenarioResult.cost);
            capacityValues.push(scenarioResult.capacity);
          }
        }
        caData.push({
          label: competitor.name,
          fill: false,
          pointRadius: 4,
          lineTension: 0,
          pointBorderWidth: 1,
          borderWidth: 1.5,
          data: caValues,
          backgroundColor: dataColors[caData.length],
          borderColor: dataColors[caData.length],
        });

        ebitdaData.push({
          label: competitor.name,
          fill: false,
          pointRadius: 4,
          lineTension: 0,
          pointBorderWidth: 1,
          borderWidth: 1.5,
          data: ebitdaValues,
          backgroundColor: dataColors[ebitdaData.length],
          borderColor: dataColors[ebitdaData.length],
        });

        costData.push({
          label: competitor.name,
          fill: false,
          pointRadius: 4,
          lineTension: 0,
          pointBorderWidth: 1,
          borderWidth: 1.5,
          data: costValues,
          backgroundColor: dataColors[costData.length],
          borderColor: dataColors[costData.length],
        });

        capacityData.push({
          label: competitor.name,
          fill: false,
          pointRadius: 4,
          lineTension: 0,
          pointBorderWidth: 1,
          borderWidth: 1.5,
          data: capacityValues,
          backgroundColor: dataColors[capacityData.length],
          borderColor: dataColors[capacityData.length],
        });
      }

      setCaDatasets(caData);
      setEbitdaDatasets(ebitdaData);
      setCostDatasets(costData);
      setCapacityDatasets(capacityData);
    };
    // #fcb539  #cd3b4b  #c2c928  #42aeb8
    const colorsData = [
      "#fcb539",
      "#cd3b4b",
      "#c2c928",
      "#42aeb8",
      // "rgba(24, 138, 226, 1)",
      // "rgba(216, 122, 243, 1)",
      // "rgba(16, 196, 105, 1)",
      // "rgba(243, 231, 122, 1)",
    ];
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first-wiz">
        <Row>
          <Col style={{ marginLeft: "1px" }}>
            <Nav variant="pills" className="flex-row">
              <Nav.Item>
                <Nav.Link eventKey="first-wiz" className="tab-anc">
                  {t("stratEdge.buisnessGame.resultBG.global")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second-wiz" className="tab-anc">
                  {firstMarketName && firstMarketName.name}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="try-wiz" className="tab-anc">
                  {secondMarketName && secondMarketName.name}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="first-wiz">
                <Row>
                  <Col lg={6}>
                    <h5>
                      {t("stratEdge.buisnessGame.resultBG.chiffreAffiare")}
                    </h5>
                    <LineChart
                      datasets={caDatasets}
                      labels={rounds.map((r) => r.name)}
                    />
                  </Col>
                  <Col lg={6}>
                    <h5>{t("stratEdge.buisnessGame.resultBG.EBITDA")}</h5>
                    <LineChart
                      datasets={ebitdaDatasets}
                      labels={rounds.map((r) => r.name)}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    marginTop: "2rem",
                  }}
                >
                  <Col lg={6}>
                    <h5>{t("stratEdge.buisnessGame.resultBG.cost")}</h5>
                    <Col lg={12} style={{ height: 300 }}>
                      <BarChart
                        datasets={costDatasets}
                        labels={rounds.map((r) => r.name)}
                      />
                    </Col>
                  </Col>
                  <Col lg={6}>
                    <h5>{t("stratEdge.buisnessGame.resultBG.capacity")}</h5>

                    <Col lg={12} style={{ height: 300 }}>
                      <BarChart
                        datasets={capacityDatasets}
                        labels={rounds.map((r) => r.name)}
                      />
                    </Col>
                  </Col>
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="second-wiz">
                <Row
                  style={{
                    paddingBottom: 22,
                  }}
                >
                  <Col lg={6} style={{ height: 300 }}>
                    <h5> {t("stratEdge.buisnessGame.resultBG.chartCost")}</h5>
                    <BarOneExChart
                      labels={firstMarketCost.labels}
                      datasets={[
                        {
                          label: "",
                          backgroundColor: colorsData,

                          borderColor: colorsData,
                          borderWidth: 1,
                          hoverBackgroundColor: colorsData,
                          hoverBorderColor: colorsData,
                          data: firstMarketCost.data,
                        },
                      ]}
                    />
                  </Col>
                  <Col lg={6} style={{ height: 300 }}>
                    <h5>
                      {t("stratEdge.buisnessGame.resultBG.chartCapacity")}
                    </h5>
                    <BarOneExChart
                      labels={firstMarketCapacity.labels}
                      datasets={[
                        {
                          label: "",
                          backgroundColor: colorsData,
                          borderColor: colorsData,
                          borderWidth: 1,
                          hoverBackgroundColor: colorsData,
                          hoverBorderColor: colorsData,
                          data: firstMarketCapacity.data,
                        },
                      ]}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    marginTop: "2rem",
                  }}
                >
                  <Col lg={6}>
                    <h5>
                      {" "}
                      {t("stratEdge.buisnessGame.resultBG.volumeCompetitor")}
                    </h5>
                    <DoughnutChart
                      data={firstMarketVolume.data}
                      labels={firstMarketVolume.labels}
                      colors={firstMarketVolume.colors}
                    />
                  </Col>
                  <Col lg={6}>
                    <h5>
                      {t("stratEdge.buisnessGame.resultBG.margeCompetitor")}
                    </h5>
                    <DoughnutChart
                      data={firstMarketMarge.data}
                      labels={firstMarketMarge.labels}
                      colors={firstMarketMarge.colors}
                    />
                  </Col>
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="try-wiz">
                <Row
                  style={{
                    paddingBottom: 22,
                  }}
                >
                  <Col lg={6} style={{ height: 300 }}>
                    <h5>{t("stratEdge.buisnessGame.resultBG.chartCost")}</h5>
                    <BarOneExChart
                      labels={secondMarketCost.labels}
                      datasets={[
                        {
                          label: "",
                          backgroundColor: colorsData,
                          borderColor: colorsData,
                          borderWidth: 1,
                          hoverBackgroundColor: colorsData,
                          hoverBorderColor: colorsData,
                          data: secondMarketCost.data,
                        },
                      ]}
                    />
                  </Col>

                  <Col lg={6} style={{ height: 300 }}>
                    <h5>
                      {t("stratEdge.buisnessGame.resultBG.chartCapacity")}
                    </h5>
                    <BarOneExChart
                      labels={secondMarketCapacity.labels}
                      datasets={[
                        {
                          label: "",
                          backgroundColor: colorsData,
                          borderColor: colorsData,
                          borderWidth: 1,
                          hoverBackgroundColor: colorsData,
                          hoverBorderColor: colorsData,
                          data: secondMarketCapacity.data,
                        },
                      ]}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    marginTop: "2rem",
                  }}
                >
                  <Col lg={6}>
                    <h5>
                      {" "}
                      {t("stratEdge.buisnessGame.resultBG.volumeCompetitor")}
                    </h5>

                    <DoughnutChart
                      data={secondMarketVolume.data}
                      labels={secondMarketVolume.labels}
                      colors={secondMarketVolume.colors}
                    />
                  </Col>
                  <Col lg={6}>
                    <h5>
                      {t("stratEdge.buisnessGame.resultBG.margeCompetitor")}
                    </h5>
                    <DoughnutChart
                      data={secondMarketMarge.data}
                      labels={secondMarketMarge.labels}
                      colors={secondMarketMarge.colors}
                    />
                  </Col>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  };

  const CardResult = (props) => {
    const { config } = props;
    const [competitor, setCompetitor] = useState({});
    const { lang, rank, data } = props;

    useEffect(() => {
      if (config && config.competitors) {
        const tc =
          teamCompetitors &&
          teamCompetitors.find((tc) => data.teamId === tc.teamId);

        const comp = config.competitors.find(
          (c) => c.id === (tc && tc.competitorId)
        );
        setCompetitor(comp || {});
      }
    }, [props, config]);

    const CardResultLine = (props) => {
      const { title, value, percentage = "", color } = props;
      return (
        <div className="card-item-line">
          <span
            style={{
              display: "flex",
              flex: 1,
              fontFamily: "Roboto",
              fontWeight: "bold",
              color: "#111137",
              fontSize: 10,
            }}
          >
            {title}
          </span>

          <span
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-end",

              fontFamily: "Roboto",
              fontWeight: "bold",
              color: "#111137",
              fontSize: 10,
            }}
          >
            {value}

            <span
              style={{
                display: "flex",
                // flex: 1,
                marginLeft: 5,
                fontFamily: "Roboto",
                fontWeight: "normal",
                color,
                fontSize: 8,
              }}
            >
              {" " + percentage}
            </span>
          </span>
        </div>
      );
    };

    return (
      <Card
        style={{
          width: 181,
          height: "auto",
          backgroundColor: isModal ? "#EBEFF2" : "#FCFCFC",
        }}
        className={`badge-rank-${rank}-${lang}`}
      >
        <CardBody className="card-item" style={{ paddingBottom: 10 }}>
          <h5
            style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              color: "#111137",
              marginTop: 30,
            }}
          >
            {competitor.name}
          </h5>
          <img
            alt={"lol" + JSON.stringify(competitor)}
            src={
              competitor.imagePath &&
              competitor.imagePath !== null &&
              competitor.imagePath !== "null"
                ? competitor.imagePath
                : groupImg
            }
            style={{
              width: 71,
              height: 54,
            }}
          />
          <h5
            style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              color: "#111137",
              fontSize: 15,
            }}
          >
            ${formatNumber(parseInt(data.reserve))}
          </h5>

          <span
            style={{
              fontFamily: "Roboto",
              fontWeight: "normal",
              color: "#98A6AD",
              fontSize: 9,
            }}
          >
            {t("stratEdge.buisnessGame.resultBG.EBITDAReserve")}
          </span>

          <div style={{ marginTop: 14, width: "80%" }}>
            <CardResultLine
              title={t("stratEdge.buisnessGame.resultBG.volumeTotal")}
              value={formatNumber(data.totalVolume)}
              // value={data.totalVolume}
              color={data.totalVolumeVariation >= 0 ? "#10C469" : "#FF5B5B"}
              percentage={`(${data.totalVolumeVariation >= 0 ? "+" : ""}${
                data.totalVolumeVariation
              }%)`}
            />
            <CardResultLine
              title={t("stratEdge.buisnessGame.resultBG.EBITDA")}
              value={formatNumber(data.ebitda)}
              color={data.ebitdaVariation >= 0 ? "#10C469" : "#FF5B5B"}
              percentage={`(${data.ebitdaVariation >= 0 ? "+" : "-"}${
                data.ebitdaVariation
              }%)`}
            />
            <CardResultLine
              title={t("stratEdge.buisnessGame.resultBG.cost")}
              value={"$" + formatNumber(data.cost)}
              color={data.costVariation >= 0 ? "#10C469" : "#FF5B5B"}
              percentage={`(${data.costVariation >= 0 ? "+" : ""}${
                data.costVariation
              }%)`}
            />
            <CardResultLine
              title={t("stratEdge.buisnessGame.resultBG.capacity")}
              value={formatNumber(data.capacity)}
              color={data.capacityVariation >= 0 ? "#10C469" : "#FF5B5B"}
              percentage={`(${data.capacityVariation >= 0 ? "+" : ""}${
                data.capacityVariation
              }%)`}
            />

            <CardResultLine
              title={
                // t("stratEdge.buisnessGame.resultBG.costMarket1") +
                `${t("stratEdge.buisnessGame.resultBG.cost")} ${
                  firstMarketName && firstMarketName.name
                }`
              }
              value={"$  " + formatNumber(data.marketResults[0].cost)}
              color={
                data.marketResults[0].fretVariation >= 0 ? "#10C469" : "#FF5B5B"
              }
              percentage={`(${
                data.marketResults[0].fretVariation >= 0 ? "+" : ""
              }${data.marketResults[0].fretVariation}%)`}
            />
            <CardResultLine
              title={
                `${t("stratEdge.buisnessGame.resultBG.cost")} ${
                  secondMarketName && secondMarketName.name
                }`

                // t("stratEdge.buisnessGame.resultBG.costMarket2") +
                // secondMarketName && secondMarketName.name
              }
              value={"$  " + formatNumber(data.marketResults[1].cost)}
              color={
                data.marketResults[1].fretVariation >= 0 ? "#10C469" : "#FF5B5B"
              }
              percentage={`(${
                data.marketResults[1].fretVariation >= 0 ? "+" : ""
              }${data.marketResults[1].fretVariation}%)`}
            />
          </div>
        </CardBody>
      </Card>
    );
  };

  const [firstMarketName, setFirstMarketName] = useState(false);
  const [secondMarketName, setSecondMarketName] = useState(false);

  return (
    <>
      <h4>{t("stratEdge.buisnessGame.resultBG.results")} </h4>
      <div className="cards-div">
        {scenarioResults &&
          scenarioResults.map((sr, index) => (
            <CardResult
              key={index}
              lang={i18n.language}
              rank={index + 1}
              data={sr}
              config={props.config}
              firstMarketName={firstMarketName}
              secondMarketName={secondMarketName}
            />
          ))}
      </div>
      <Col lg={12} className="mb-4">
        <StatsNav
          scenarioResults={scenarioResults}
          teamCompetitors={teamCompetitors}
          config={props.config}
          isNotAnalysis={isNotAnalysis}
          roundScenarios={roundScenarios}
          firstMarketName={firstMarketName}
          setFirstMarketName={setFirstMarketName}
          secondMarketName={secondMarketName}
          setSecondMarketName={setSecondMarketName}
        />
      </Col>
    </>
  );
};

export default ResultBusinessGame;
