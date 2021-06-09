import React, { useEffect } from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";

import group789 from "../../../assets/images/finEdge.png";

import nowEdge from "../../../assets/images/nowEdge.png";
import marches_financiers from "../../../assets/images/marches-financiers.svg";
import ref_image_2 from "../../../assets/images/ref_image_2.svg";
import bull_bear_2 from "../../../assets/images/bull-bear-2.svg";
import { useDispatch, useSelector } from "react-redux";
import { getInitialData } from "../../../redux/FinEdge/actions";
import PreLoaderWidget from "../../../components/Loader";

const FinEdgeHome = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const dispatch = useDispatch()
  const {gameSessionId} = useSelector(state => state.Module.module)
  const {loading} = useSelector(state => state.FinEdge)

  useEffect(() => {
    dispatch(getInitialData(gameSessionId))
  }, [])

  return (
    <div className="">
    {
      loading && <PreLoaderWidget />
    }
      <Container>
        <div className="text-center mb-5 pt-3 ">
          <img
            src={nowEdge}
            alt="img"
            style={{ width: "164px", height: " 52px" }}
          />
        </div>
        <Row className="mb-5">
          <Col lg={5}>
            <div className="att-icon mb-4">
              <img src={group789} alt="img" width={202} />
              {/* <h4 className="atterissage_title">{t('finEdge.title')}</h4> */}
            </div>
            <p>
              <span className="finEdge_s_title1">
                {t("finEdge.index.welcome")}
              </span>
              <br />
              <span className="finEdge_s_title2">
                {t("finEdge.index.businessGameS")}
              </span>
            </p>
            <p className="finEdge_desc m-0">
              {t("finEdge.index.descriptionWelcome")}
            </p>

            <div>
              <Button
              className="mt-2"
                onClick={() => {
                  history.push("/FinEdge/theory-rules");
                }}
                style={{
                  width: "106px",
                  height: "34px",
                  background:
                    "transparent linear-gradient(150deg, #87ecba 0%, #10C369 100%) 0% 0% no-repeat padding-box",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  borderColor: "transparent",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    textAlign: "center",
                    font: "Bold 12px/17px Karla",
                    letterSpacing: "0.28px",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                    opacity: 1,
                  }}
                >
                  {t("finEdge.index.start")}
                </p>
              </Button>
            </div>
          </Col>
          <Col lg={7}>
          <iframe
            src={'https://nowedge.io/brochures/Teaser_StratEdge.mp4'}
            frameBorder="0"
            style={{
              width: '100%',
              height: '100%',
            }}
            title="test"
            allowfullscreen="allowfullscreen"
            mozallowfullscreen="mozallowfullscreen"
            msallowfullscreen="msallowfullscreen"
            oallowfullscreen="oallowfullscreen"
            webkitallowfullscreen="webkitallowfullscreen"
            ></iframe>
          </Col>
        </Row>
        <Row className="mb-3" style={{ alignItems: "baseline" }}>
          <Col lg={4} style={{ height: "225px" }}>
            <Card style={{ height: "100%" }}>
              <CardBody className="att-card-body">
                <img src={marches_financiers} alt="img" />
                <h5 className=" mt-0 mb-3">{t("finEdge.index.title1")}</h5>
              </CardBody>
            </Card>
          </Col>

          <Col lg={4} style={{ height: "225px" }}>
            <Card style={{ height: "100%" }}>
              <CardBody className="att-card-body">
                <img src={ref_image_2} alt="img" />
                <h5 className="  mt-0 mb-3">{t("finEdge.index.title2")}</h5>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4} style={{ height: "225px" }}>
            <Card style={{ height: "100%" }}>
              <CardBody className="att-card-body">
                <img src={bull_bear_2} alt="img" />
                <h5 className="mt-0 mb-3">{t("finEdge.index.title3")}</h5>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="text-center m-4">
          <Link style={{ fontWeight: "bold" }}>{t("finEdge.index.back")}</Link>
        </div>
      </Container>
    </div>
  );
};

export { FinEdgeHome };
