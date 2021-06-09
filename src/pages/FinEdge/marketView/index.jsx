import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";

import HeadP from "../../../components/finEdge/HeadP";
import Loader from "../../../components/Loader";
import { getMarketViewsData, getPortfolioIndicators } from "../../../redux/actions";
import { MarketViewItem } from "./MarketViewItem";
import style from "./style.module.scss";

const MarketView = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.MarketViews);
  const { markets, portfolio } = useSelector((state) => state.FinEdge.initialData);
  const [key, setKey] = useState(markets?.length > 0 && markets[0].id);

  useEffect(() => {
    dispatch(getMarketViewsData());
    dispatch(getPortfolioIndicators(portfolio.id));
  }, []);
  return (
    <div>
      {loading && <Loader />}
      <div style={{ marginLeft: 68 }}>
        <h1 style={{ fontSize: 22, marginBottom: 27, marginTop: 50 }} onClick={()=>{
          //console.log("hhhhh", key)
        }}>
          Vue des marchés
        </h1>
        <HeadP />
        <Tab.Container
          id="left-tabs-example"
          // defaultActiveKey={markets?.length > 0 && markets[0].id}
          activeKey={key}
          onSelect={(k) => setKey(parseInt(k))}
        >
          <Row>
            <Col style={{ marginLeft: "1px" }}>
              <Nav variant="pills" className="flex-row">
                {markets  && markets.map((m, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link eventKey={m.id} className="tab-anc">
                      {m.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Tab.Content>
                {markets  && markets.map((m, index) => (
                  <Tab.Pane eventKey={m.id} key={m.name + m.id}>
                  {key ===  m.id &&
                    <MarketViewItem
                      marketValue={{ value: m.id, label: m.name }}
                      market={m}
                    />
                  }

                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
};

export { MarketView };
