import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Card,
  Col,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { getStratEdgeConfigurationParticipant } from "../../redux/StratEdge/actions";
import { useTranslation } from "react-i18next";
import groupImg from "../../assets/images/groupImg.svg";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const ProductAnalysis = (props) => {
  const stratEdgeSelector = useSelector((state) => state.StratEdge);
  const gameSessionId = useSelector(
    (state) => state.Module.module.gameSessionId
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    if (stratEdgeSelector.configParticipant === null)
      dispatch(getStratEdgeConfigurationParticipant(gameSessionId));
  }, []);

  if (stratEdgeSelector.configParticipant === null) return <Loader />;
  else
    return (
      <div>
        {stratEdgeSelector.loading && <Loader />}
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/moderator/timeline-tours">
              {stratEdgeSelector.currentRound &&
                stratEdgeSelector.currentRound.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{t("stratEdge.config.analyseProduct")}</BreadcrumbItem>
        </Breadcrumb>
        <h1 style={{ fontSize: 22, marginBottom: 27 }}>{t("stratEdge.config.analyseProduct")}</h1>
        <Card className="mb-0">
          <CardBody>
            <Row>
              <Col lg={2}>
                <img
                  alt="img"
                  src={
                    stratEdgeSelector.configParticipant.product.imagePath &&
                    stratEdgeSelector.configParticipant.product.imagePath !==
                      null &&
                    stratEdgeSelector.configParticipant.product.imagePath !==
                      "null"
                      ? stratEdgeSelector.configParticipant.product.imagePath
                      : groupImg
                  }
                  className="rounded-circle img-thumbnail avatar-lg adp-img"
                />
              </Col>
              <Col lg={10}>
                <div className="adp-CardTitle">
                  {stratEdgeSelector.configParticipant.product.name || ""}
                </div>
                <div className="adp-CardSubtitle">{t("stratEdge.config.AnsP.description")}</div>
                <div className="adp-CardText">
                  {stratEdgeSelector.configParticipant.product.description}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
};

export { ProductAnalysis };
