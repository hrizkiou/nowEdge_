import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import badg44 from "../../../../assets/images/StrategicGame/Mask Group 14.svg";
import MaskGroup144 from "../../../../assets/images/StrategicGame/MaskGroup14.svg";
import runningSolid from "../../../../assets/images/StrategicGame/running-solid.svg";

import img11 from "../../../../assets/images/StrategicGame/component_5634555.png";
import "./style.scss";
import { useSelector } from "react-redux";
import {
  avatars,
  countries,
  getLogoById,
} from "../../../../helpers/centerData";

const BlockR = () => {
  return (
    <div className="cent-blockr">
      <i className="fas fa-cubes"></i>
      <div>
        Score de Structure
        <span className="mt-1">142 Points</span>
      </div>
    </div>
  );
};

function Centre() {
  const center = useSelector((state) => state.PvGame.center);
  return (
    <div className="center-content-t">
      <div className="block-1">
        <div className="d-flex flex-column sg-onHover">
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={getLogoById(center.countryId, countries)?.logo}
              alt="user-img"
              width={41}
              height={41}
              style={{
                backgroundColor: "#fff",
                borderRadius: "50px",
                marginRight: "-10px",
              }}
            />
            <img
              src={getLogoById(center.avatarId, avatars)?.logo}
              alt="user-img"
              width={41}
              height={41}
              style={{
                backgroundColor: "#fff",
                borderRadius: "50px",
              }}
            />
            <span className="sg-menu-item-title" style={{ color: "#fff" }}>
              {center.name}
            </span>
          </div>
          <div className="sg-menu-item-btn-config-p" onClick={() => null}>
            <div className="sg-menu-item-btn-config-sp">
              <i className=" fas fa-cubes"></i> 120 Points
            </div>
            <div className="sg-menu-item-btn-config-sp">
              {" "}
              <i className="   fas fa-cogs"></i> 140 Points
            </div>
            <div className="sg-menu-item-btn-config-sp">
              {" "}
              <i className=" fas fa-chart-line"></i> 140 Points
            </div>
          </div>
        </div>
        <div className="parc-btnQ">
          Quitter
          <img src={runningSolid} style={{ marginLeft: "5px" }} />
        </div>
      </div>
      <div className="block-2">
        <div className="col-1-cen">
          <img
            src={img11}
            style={{
              width: "100%",
              height: "80%",
              position: "absolute",
              bottom: "0px",
            }}
            alt=""
          />
        </div>
        <div className="col-2-cen">
          <div className="cent-title">
            <h3>Bienvenue dans votre centre</h3>
            <p>
              Voyez ce jeu exquis wallon, de graphie en kit mais bref. Portez
              ce.
            </p>
          </div>
          <div className="cent-btn-control">
            <BlockR />
            <BlockR />
            <BlockR />
          </div>
          <div className="cent-result">
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Activités de PV">
                <p>1</p>
              </Tab>
              <Tab eventKey="profile" title="Ressources du centre">
                <p>2</p>
              </Tab>
              <Tab eventKey="contact" title="Relations extérieures">
                <p>3</p>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Centre;
