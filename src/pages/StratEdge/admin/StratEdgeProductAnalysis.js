import React, { useEffect } from "react";
import {
  Row,
  Card,
  Col,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import groupImg from "../../../assets/images/groupImg.svg";
import {
  getStratEdgeConfiguration,
  getStratEdgeGameSessionConfiguration,
} from "../../../redux/StratEdge/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import { encrypt } from "../../../helpers/crypto";

const StratEdgeProductAnalysis = (props) => {
  const stratEdgeSelector = useSelector((state) => state.StratEdge);
  
  const currentModule = useSelector(
    (state) => state.Module.module
    );
    const gameSessionId = currentModule.gameSessionId;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    if (stratEdgeSelector.config === null)
      dispatch(getStratEdgeGameSessionConfiguration(gameSessionId));
  }, []);

  if (!stratEdgeSelector.result.gameConfigurationId) return <div></div>;
  else if (stratEdgeSelector.config === null) return <Loader />;
  else
    return (
      <div>
        {stratEdgeSelector.loading && <Loader />}
       

         <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/moderator/modules">{t("breadcrumbMenu.modules")} </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          {/* <Link to="/moderator/modules"></Link> */}
          <Link
            to={`/moderator/modules/${encrypt(
              currentModule.moduleId
            )}/student-management`}
          >
            {currentModule.moduleName}
          </Link> 
        </BreadcrumbItem>
        <BreadcrumbItem active> 
          

          {t("stratEdge.config.analyseProduct")}
        </BreadcrumbItem>
      </Breadcrumb>
        
        <h1 style={{ fontSize: 22, marginBottom: 27 }}>{t("stratEdge.config.analyseProduct")}</h1>
        <Card className="mb-0">
          <CardBody>
            <Row>
              <Col lg={2}>
                <img
                  alt="img"
                  src={
                    stratEdgeSelector.config.product.imagePath &&
                    stratEdgeSelector.config.product.imagePath !== null &&
                    stratEdgeSelector.config.product.imagePath !== "null"
                      ? stratEdgeSelector.config.product.imagePath
                      : groupImg
                  }
                  className="rounded-circle img-thumbnail avatar-lg adp-img"
                />
              </Col>
              <Col lg={10}>
                <div className="adp-CardTitle">
                  {stratEdgeSelector.config.product.name || ""}
                </div>
                <div className="adp-CardSubtitle">{t("stratEdge.config.AnsP.description")}</div>
                <div className="adp-CardText">
                  {stratEdgeSelector.config.product.description}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
};

export { StratEdgeProductAnalysis };
