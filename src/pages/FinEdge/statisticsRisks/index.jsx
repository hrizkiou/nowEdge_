import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Tab, Nav } from "react-bootstrap";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";

import { useTranslation } from "react-i18next";

import { Statistics } from "./Statistics";
import { Risks } from "./Risks";
import HeadP from "../../../components/finEdge/HeadP";
import { getPortfolioIndicators } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";


const StatisticsRisks = () => {
  const { portfolio } = useSelector((state) => state.FinEdge.initialData);
  const [key, setKey] = useState("statistics");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPortfolioIndicators(portfolio?.id));
  }, []);
  return (
    <div>
      <div style={{ marginLeft: 68 }}>
        <h1 style={{ fontSize: 22, marginBottom: 27, marginTop: 50 }}>
          Statistiques et risques
        </h1>

        <HeadP />
        <Tab.Container
          id="left-tabs-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Row>
            <Col style={{ marginLeft: "1px" }}>
              <Nav variant="pills" className="flex-row">
                <Nav.Item>
                  <Nav.Link eventKey={"statistics"} className="tab-anc">
                    Statistiques
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={"risques"} className="tab-anc">
                    Risques
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey={"statistics"}>
                  {key === "statistics" && <Statistics />}
                </Tab.Pane>
                <Tab.Pane eventKey={"risques"}>
                  {key === "risques" && <Risks />}
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
};

export { StatisticsRisks };
