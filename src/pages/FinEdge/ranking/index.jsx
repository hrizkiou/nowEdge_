import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import badge1 from "../../../assets/images/StrategicGame/Component25e311.svg";
import badge2 from "../../../assets/images/StrategicGame/Component3581.svg";
import img1 from "../../../assets/images/StrategicGame/Component51–12.svg";
import badge3 from "../../../assets/images/StrategicGame/Componente3551.svg";
import img2 from "../../../assets/images/StrategicGame/Group 4406.svg";
import img3 from "../../../assets/images/StrategicGame/Group 4410.svg";
import badg44 from "../../../assets/images/StrategicGame/Mask Group 14.svg";
import img4 from "../../../assets/images/StrategicGame/Mask-Group114.svg";
import MaskGroup144 from "../../../assets/images/StrategicGame/MaskGroup14.svg";
import runningSolid from "../../../assets/images/StrategicGame/running-solid.svg";
import PreLoaderWidget from "../../../components/Loader";
import { RankingStatsModal } from "../../../components/modal/FinEdgeModals/RankingStatsModal/RankingStatsModal";
import { avatars, countries, getLogoById } from "../../../helpers/centerData";
import { getRankings, getscore, getScoreGlobal } from "../../../redux/actions";
import style from "./style.module.scss";

const ListClassItem = ({ t, active = false, onClick, index, item = {} }) => {
  return (
    <div
      className={`list-item-classment ${active ? "active-classment" : ""}`}
      onClick={() => onClick(item)}
      style={{ cursor: "pointer" }}
    >
      <div className="list-item-classment-b1" style={{ flex: "1" }}>
        <h3>{index + 1}</h3>
        <img
          src={
            item.user.avatarPath // "https://www.nowedge.io/now-edge-api/avatars/User23/56959-profile.jpg"
          }
          style={{
            backgroundColor: "aliceblue",
            borderRadius: " 50%",
            width: `34px`,
          }}
        />
        <div> {item.user.firstName} {item.user.lastName} </div>
      </div>
      <div
        style={{ display: "flex", flex: "1", justifyContent: "space-between" }}
      >
        <div className={style.list_item_ranking}>
          <h3>{t("finEdge.classement.valorisation")} </h3>
          <h4>{item.valuation}</h4>
        </div>
        <div className={style.list_item_ranking}>
          <h3>{t("finEdge.classement.performance")} </h3>
          <h4>{item.performance}</h4>
        </div>
        <div className={style.list_item_ranking}>
          <h3>{t("finEdge.classement.progression")} </h3>

          <h4 style={{ color: "#10C369" }}>{item.progression}</h4>
        </div>
        <div className={style.list_item_ranking}>
          <h3>{t("finEdge.classement.ratioSharpe")} </h3>
          <h4>{item.sharp_ratio}</h4>
        </div>
      </div>
    </div>
  );
};

const ListClass = ({
  t,
  scoreGlobal = [],
  setShowClassement,
  setCurrentItem,
  list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 12],
  styleContent = {},
}) => {
  const [indexActive, setindexActive] = useState(null);

  const clickItem = (item) => {
    console.log(`item====================>`, item, list)
    setCurrentItem(item);
    setShowClassement(true, item.id);
  };
  return (
    <div
      className={[style.scrollbarCustom, "list-classment"].join(" ")}
      style={styleContent}
    >
      {list.map((item, index) => {
        return (
          <ListClassItem
            t={t}
            key={index}
            index={index + 3}
            active={index === indexActive}
            onClick={clickItem}
            item={item}
          />
        );
      })}
    </div>
  );
};

const DetailsClassment2 = ({
  t,
  scoreGlobal,
  centerId,
  user1,
  user2,
  user3,
  setShowClassement,
  setCurrentItem,
}) => {
  return (
    <div className="details-classment">
      <div style={{ position: "relative" }}>
        {user2 && (
          <>
            <div
              className="details-class-3"
              style={{
                height: "210px",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => {
                setShowClassement(true, user2.id);
                setCurrentItem(user2);
              }}
            >
              <img
                src={
                  user2.user.avatarPath // "https://www.nowedge.io/now-edge-api/avatars/User23/56959-profile.jpg"
                }
                style={{
                  width: "56px",
                  height: "56px",
                  alignSelf: "center",
                  borderRadius: 28,
                }}
              />
              <img
                src={badge2}
                style={{
                  position: "absolute",
                  right: "35%",
                  top: "44px",
                  width: "29px",
                  height: "35px",
                }}
              />
              <p style={{ marginTop: "20px" }}>{user2.user.firstName} {user2.user.lastName}</p>
              {/* <div>
                <div className="text-score">
                  {t("finEdge.classement.valorisation")}
                </div>
              </div>
              <div>
                <div className="text-score-n">{"23843€"}</div>
              </div> */}
              <div>
                <Row>
                  <Col className="m-0 " lg={6}>
                    <div className={[style.list_item_ranking, "m-0"].join(" ")}>
                      <h3>{t("finEdge.classement.valorisation")} </h3>
                      <h4>{user2.valuation}</h4>
                    </div>
                  </Col>
                  <Col className="m-0" lg={6}>
                    <div className={[style.list_item_ranking, "m-0"].join(" ")}>
                      <h3>{t("finEdge.classement.performance")} </h3>
                      <h4>{user2.performance}</h4>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="m-0">
                    <div className={[style.list_item_ranking, "m-0"].join(" ")}>
                      <h3>{t("finEdge.classement.progression")} </h3>
                      <h4 style={{ color: "#10C369" }}>{user2.progression}</h4>
                    </div>
                  </Col>
                  <Col className="m-0">
                    <div className={[style.list_item_ranking, "m-0"].join(" ")}>
                      <h3>{t("finEdge.classement.ratioSharpe")} </h3>
                      <h4>{user2.sharp_ratio}</h4>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ position: "relative" }}>
        {user1 && (
          <>
            <div
              className="details-class-1"
              style={{ height: "261px", cursor: "pointer" }}
              onClick={() => {
                setShowClassement(true, user1.id);
                setCurrentItem(user1);
              }}
            >
              <img
                src={
                  user1.user.avatarPath //"https://www.nowedge.io/now-edge-api/avatars/User23/56959-profile.jpg"
                }
                style={{
                  width: "66px",
                  height: "66px",
                  alignSelf: "center",
                  borderRadius: 33,
                }}
              />
              <img
                src={badge1}
                style={{
                  position: "absolute",
                  right: "35%",
                  top: "59px",
                  width: "29px",
                  height: "33px",
                }}
              />
              <p style={{ marginTop: "20px" }}>{user1.user.firstName} {user1.user.lastName}</p>
              {/* <div>
                <div className="text-score">
                  {t("finEdge.classement.valorisation")}
                </div>
              </div>
              <div>
                <div className="text-score-n">{"23843€"}</div>
              </div> */}
              <div>
                <Row>
                  <Col className="m-0 " lg={6}>
                    <div className={[style.list_item_ranking, "m-0"].join(" ")}>
                      <h3>{t("finEdge.classement.valorisation")} </h3>
                      <h4>{user1.valuation}</h4>
                    </div>
                  </Col>
                  <Col className="m-0" lg={6}>
                    <div className={[style.list_item_ranking, "m-0"].join(" ")}>
                      <h3>{t("finEdge.classement.performance")} </h3>
                      <h4>{user1.performance}</h4>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="m-0">
                    <div className={[style.list_item_ranking, "m-0"].join(" ")}>
                      <h3>{t("finEdge.classement.progression")} </h3>
                      <h4 style={{ color: "#10C369" }}>{user1.progression}</h4>
                    </div>
                  </Col>
                  <Col className="m-0">
                    <div className={[style.list_item_ranking, "m-0"].join(" ")}>
                      <h3>{t("finEdge.classement.ratioSharpe")} </h3>
                      <h4>{user1.sharp_ratio}</h4>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ position: "relative" }}>
        {user3 && (
          <>
            <div
              className="details-class-3"
              style={{
                height: "210px",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => {
                setShowClassement(true, user3.id);
                setCurrentItem(user3);
              }}
            >
              <img
                src={
                  user3.user.avatarPath //"https://www.nowedge.io/now-edge-api/avatars/User23/56959-profile.jpg"
                }
                style={{
                  width: "56px",
                  height: "56px",
                  alignSelf: "center",
                  borderRadius: 28,
                }}
              />
              <img
                src={badge3}
                style={{
                  position: "absolute",
                  right: "35%",
                  top: "44px",
                  width: "29px",
                  height: "35px",
                }}
              />
              <p style={{ marginTop: "20px" }}>{user3.user.firstName} {user3.user.lastName}</p>
              {/* <div>
                <div className="text-score">
                  {t("finEdge.classement.valorisation")}
                </div>
              </div>
              <div>
                <div className="text-score-n">{"23843€"}</div>
              </div> */}
              <div>
                <Row>
                  <Col className="m-0 " lg={6}>
                    <div className={[style.list_item_ranking, "m-0"].join(" ")}>
                      <h3>{t("finEdge.classement.valorisation")} </h3>
                      <h4>{user3.valuation}</h4>
                    </div>
                  </Col>
                  <Col className="m-0" lg={6}>
                    <div className={[style.list_item_ranking, "m-0"].join(" ")}>
                      <h3>{t("finEdge.classement.performance")} </h3>
                      <h4>{user3.performance}</h4>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="m-0">
                    <div className={[style.list_item_ranking, "m-0"].join(" ")}>
                      <h3>{t("finEdge.classement.progression")} </h3>
                      <h4 style={{ color: "#10C369" }}>{user3.progression}</h4>
                    </div>
                  </Col>
                  <Col className="m-0">
                    <div className={[style.list_item_ranking, "m-0"].join(" ")}>
                      <h3>{t("finEdge.classement.ratioSharpe")} </h3>
                      <h4>{user3.sharp_ratio}</h4>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Ranking = () => {
  const history = useHistory();

  const [showClassement, setShowClassement] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [currentUserRankId, setCurrentUserRankId] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { gameSessionId } = useSelector((state) => state.Module.module);
  const { loading } = useSelector((state) => state.FinEdge);
  const { rankings } = useSelector((state) => state.FinEdge);

  useEffect(() => {
    dispatch(getRankings(gameSessionId));
  }, []);

  const CLASSEMENT = 1;

  return (
    <div className={style.ranking_container}>
      {/* {
      loading && <PreLoaderWidget />
    } */}

      {showClassement && (
        <RankingStatsModal
          show={showClassement}
          currentUserRankId={currentUserRankId}
          currentItem={currentItem}
          onHide={() => {
            setShowClassement(false);
          }}
        />
      )}

      <div
        className=""
        style={{
          paddingRight: 0,
          marginTop: 90,
          width: "60vw",
          width: "60vw",
          height: "87vh",
        }}
      >
        <div className="classement-content-block" style={{ height: "100%" }}>
          <div className="heder" style={{ marginBottom: 20, width: "auto" }}>
            <h3>{t(`finEdge.classement.title`)}</h3>
            <h5>
              {" "}
              {t(`finEdge.classement.subTitle`)} {CLASSEMENT}
              {CLASSEMENT === 1
                ? t(`finEdge.classement.first`)
                : t(`finEdge.classement.second`)}
            </h5>
          </div>
          <DetailsClassment2
            t={t}
            setShowClassement={(i, id)=>{
              setShowClassement(i)
              setCurrentUserRankId(id)
              }}
            setCurrentItem={setCurrentItem}
            user1={rankings.find((r) => r.ranking === 1)}
            user2={rankings.find((r) => r.ranking === 2)}
            user3={rankings.find((r) => r.ranking === 3)}
          />
          {rankings.length > 3 && (
          <ListClass
            t={t}
            list={rankings.slice( 3)}
            setShowClassement={(i, id)=>{
              setShowClassement(i)
              setCurrentUserRankId(id)
              }}
            setCurrentItem={setCurrentItem}
            styleContent={{
              height: "78%",
              width: "80%",
              overflowY: "auto",
              display: "flex", //💪
              flexDirection: "column",
              marginTop: "30px",
              alignSelf: "center",
            }}
          />
          )}
        </div>
      </div>
    </div>
  );
};

export { Ranking };
