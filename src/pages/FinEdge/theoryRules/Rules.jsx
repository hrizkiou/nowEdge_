import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";

import bull_bear_2 from "../../../assets/images/060663018034-web-tete.svg";
import cas5_Analysedesmarches from "../../../assets/images/cas5–Analysedesmarchés.svg";
import cas6_Analysedesmarches from "../../../assets/images/cas6–Analysedesmarches.svg";
import Image_55 from "../../../assets/images/Image_55.svg";
import largestcompanies from "../../../assets/images/largestcompanies-1200-1606765438.svg";
import Web_1349 from "../../../assets/images/Web 1349 – Analyse des marchés.svg";
import { ContentA } from "./ContentA";
import { ContentB } from "./ContentB";

import  "./style.scss";

const Rules = ({ t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = [
    {
      title: t("finEdge.theoryRules.rulesData.title1"),
      description: t("finEdge.theoryRules.rulesData.description1"),
      next: t("finEdge.theoryRules.rulesData.next1"),
      image: bull_bear_2,
      typeContent: "A",
    },
    {
      title: t("finEdge.theoryRules.rulesData.title2"),
      description: t("finEdge.theoryRules.rulesData.description2"),
      next: t("finEdge.theoryRules.rulesData.next2"),
      previous: t("finEdge.theoryRules.rulesData.previous2"),
      image: largestcompanies,
      typeContent: "B",
    },
    {
      title: t("finEdge.theoryRules.rulesData.title3"),
      description: t("finEdge.theoryRules.rulesData.description3"),
      next: t("finEdge.theoryRules.rulesData.next3"),
      previous: t("finEdge.theoryRules.rulesData.previous3"),
      image: Image_55,
      typeContent: "A",
    },
    {
      title: t("finEdge.theoryRules.rulesData.title4"),
      description: t("finEdge.theoryRules.rulesData.description4"),
      next: t("finEdge.theoryRules.rulesData.next4"),
      previous: t("finEdge.theoryRules.rulesData.previous4"),
      image: Web_1349,
      typeContent: "B",
    },
    {
      title: t("finEdge.theoryRules.rulesData.title5"),
      description: t("finEdge.theoryRules.rulesData.description5"),
      previous: t("finEdge.theoryRules.rulesData.previous5"),
      image: cas5_Analysedesmarches,
      typeContent: "A",
    },
  ];
  return (
    <div className="info-container">
     <TransitionGroup>

      {data[currentIndex].typeContent === "A" ? (
        <CSSTransition
                  key={12876}
                  timeout={500}
                  classNames="item"
                >

        <ContentA
          title={data[currentIndex].title}
          description={data[currentIndex].description}
          image={data[currentIndex].image}
        />
         </CSSTransition>
      ) : (
        <CSSTransition   key={6352} timeout={500} classNames="item">

        <ContentB
          title={data[currentIndex].title}
          description={data[currentIndex].description}
          image={data[currentIndex].image}
        />

      </CSSTransition>
      )}
      </TransitionGroup>
      <div
        className="content"
        style={{
          justifyContent: data[currentIndex].previous
            ? "space-between"
            : "flex-end",
        }}
      >
        {data[currentIndex].previous && (
          <Button
            className="mt-2 button-container "
            onClick={() => {
              setCurrentIndex(currentIndex - 1);
            }}
          >
            <p className="button-txt ">{data[currentIndex].previous}</p>
          </Button>
        )}
        {data[currentIndex].next && (
          <Button
            className="mt-2 button-container"
            onClick={() => {
              setCurrentIndex(currentIndex + 1);
            }}
          >
            <p className="button-txt ">{data[currentIndex].next}</p>
          </Button>
        )}
      </div>
    </div>
  );
};

export { Rules };
