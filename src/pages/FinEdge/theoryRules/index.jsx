import React from "react";
import "./style.scss";
import { Tab, Nav } from "react-bootstrap";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Rules } from "./Rules";
import { Theory } from "./Theory";

import { useTranslation } from "react-i18next";
const TheoryRules = () => {


  const { t } = useTranslation();

  return (
    <div style={{marginLeft: 68}}>
      <h1 style={{ fontSize: 22, marginBottom: 27, marginTop: 50 }}>
     { t("finEdge.theoryRules.title")}
      </h1>

      <Tab.Container id="left-tabs-example" defaultActiveKey={"theory"}>
        <Row>
          <Col style={{ marginLeft: "1px" }}>
            <Nav variant="pills" className="flex-row">
              <Nav.Item>
                <Nav.Link eventKey={"theory"} className="tab-anc">
                   { t("finEdge.theoryRules.theory")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={"rules"} className="tab-anc">
                   { t("finEdge.theoryRules.rules")}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey={"theory"}>
                <Theory  t={t} />
              </Tab.Pane>
              <Tab.Pane eventKey={"rules"}>
                <Rules t={t}  />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export { TheoryRules };