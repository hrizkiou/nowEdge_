import React, { useEffect } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { getAllQuiz } from "../../redux/actions";

import Loader from "../../components/Loader";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { encrypt, decrypt } from "../../helpers/crypto";
import { initStratEdge } from "../../redux/StratEdge/actions";

const CardQuizLink = ({
  children,
  numberOfQuestions,
  idModule,
  quizCompetitionId,
  quizId,
}) => {
  return (
    <>
      {numberOfQuestions > 0 ? (
        <Link
          to={`/module/${encrypt(idModule)}/${encrypt(
            quizCompetitionId
          )}/quiz/${encrypt(quizId)}`}
          target="_blank"
        >
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

const cardQuiz = (props) => {
  const {
    quizId,
    index,
    quizName,
    score,
    idModule,
    quizCompetitionId,
    numberOfQuestions,
    estimatedTime,
    t,
  } = props;
  const progress = (score * 100) / numberOfQuestions;
  const color_ = progress > 60 ? "success" : progress < 30 ? "danger" : "info";

  return (
    <Col xl={4} key={index}>
      <CardQuizLink
        quizId={quizId}
        quizCompetitionId={quizCompetitionId}
        idModule={idModule}
        numberOfQuestions={numberOfQuestions}
      >
        <Card>
          <CardBody className="card-box project-box mb-0">
            <h4 className="mt-0">{quizName}</h4>

            <Row className="mt-3">
              <Col lg={6}>
                <h5 className="mt-0">{numberOfQuestions}</h5>
              </Col>
              <Col lg={6}>
                <h5 className="mt-0">
                  {estimatedTime} {t("listQuiz.cardQuiz.minutes")}{" "}
                </h5>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <p className="mt-0" style={{ color: "#6C757D" }}>
                  {" "}
                  {t("listQuiz.cardQuiz.questions")}{" "}
                </p>
              </Col>
              <Col lg={6}>
                <p className="mt-0" style={{ color: "#6C757D" }}>
                  {t("listQuiz.cardQuiz.estimatedTime")}
                </p>
              </Col>
            </Row>

            <h5>
              {t("listQuiz.cardQuiz.result")}{" "}
              <span
                className="text-secondary float-right"
                style={{ color: "#6C757D" }}
              >
                {score}/{numberOfQuestions}
              </span>
            </h5>
            <div className={`progress progress-bar-alt-${color_} progress-sm`}>
              <div
                className={`progress-bar bg-${color_} progress-animated wow animated animated progress-custom`}
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>
          </CardBody>
        </Card>
      </CardQuizLink>
    </Col>
  );
};

const ListQuiz = (props) => {
  const { t } = useTranslation();
  const moduleID = decrypt(props.match.params.moduleID);

  const { quizzes, loading, module, user } = useSelector((state) => {
    //console.log("---------user-----------", user);

    return {
      quizzes: state.Quiz.quizzes,
      loading: state.Quiz.loading,
      module: state.Module.module,
      user: state.Auth.user,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllQuiz(module.trainingSessionId || moduleID));
  }, []);

  return (
    <React.Fragment>
      {loading && <Loader />}

      <Row className="mb-1">
        <Col lg={8}>
          <h4 className="mb-0">{t("listQuiz.title")} </h4>
        </Col>
        <Col lg={4}>
          <div
            className="card card-body p-0 m-0 activity-container mb-2"
            style={{ flexDirection: "row-reverse" }}
          >
            {user.role.id === 3 &&
              (module.businessGame ? (
                <>
                  <Link
                    to="/StratEdge"
                    onClick={() => {
                      dispatch(initStratEdge());
                    }}
                    target="_blank"
                    className="btn btn-test text-black ml-2"
                  >
                    <i className="fa fa-gamepad mr-1"></i>
                    {t("module.businessGame")}
                  </Link>

                  <Link
                    to={`/module/${encrypt(moduleID)}`}
                    className="btn btn-info text-black"
                  >
                    <i className="fas fa-chalkboard-teacher mr-1"></i>
                    {t("listQuiz.training")}
                  </Link>
                </>
              ) : (
                <Link
                  to={`/module/${encrypt(moduleID)}`}
                  className="btn btn-info text-black"
                >
                  <i className="fas fa-chalkboard-teacher mr-1"></i>
                  {t("listQuiz.training")}
                </Link>
              ))}
          </div>
        </Col>
      </Row>

      <Row>
        {quizzes &&
          quizzes.map((item, index) => {
            return cardQuiz({
              ...item,
              idModule: module.moduleInstanceId,
              index,
              t,
            });
          })}
      </Row>
    </React.Fragment>
  );
};

export default ListQuiz;
