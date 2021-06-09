import { AvFeedback, AvField, AvForm, AvGroup, AvInput } from "availity-reactstrap-validation";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Alert, Button, Card, CardBody, Col, Container, FormGroup, Label, Row } from "reactstrap";

import logo from "../../assets/images/logo_2.svg";
import Loader from "../../components/Loader";
import { isUserAuthenticated } from "../../helpers/authUtils";
import { registerUser, registerUserFailed } from "../../redux/actions";

const TermsOfConditionsModal = (props) => {
  
  const { t, show, onHide } = props;
 

  const valide = () => {
      props.onHide();
  };

   

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={"static"}
    >
      <Modal.Body>
      
            <p dangerouslySetInnerHTML={{
    __html: t("register.terms")
  }}>
              
            </p>
 
          <Row className="show-grid justify-content-md-center mt-3 float-right">
            <Col>
              
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light width-xs"
                onClick={valide}
              >
                {t("register.termsOfConditions.close")}
              </button>
            </Col>
          </Row>

      </Modal.Body>
    </Modal>
  );
};

class Register extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      termsOfConditions: false,
      modalShow: false,
      
    };

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Handles the submit
   */
  handleValidSubmit = (event, values) => {
    if (this.state.termsOfConditions)
      this.props.registerUser(
        values.fullName,
        values.email,
        values.password,
        { id: 3 },
        values.fullName,
        values.firstName,
        values.lastName,
        ""
      );
    else {
      const { t } = this.props;
      this.props.registerUserFailed(t("register.termsOfConditionsError"));
    }
  };

  /**
   * Redirect to root
   */
  renderRedirectToRoot = () => {
    const isAuthTokenValid = isUserAuthenticated();
    if (isAuthTokenValid) {
      return <Redirect to="/" />;
    }
  };

  handleInputChange = (event) => {
    const rem = !this.state.termsOfConditions;
    this.setState({
      termsOfConditions: rem,
    });
  };

  /**
   * Redirect to confirm
   */
  renderRedirectToConfirm = () => {
    return <Redirect to="/login" />;
  };

  render() {
    const { t } = this.props;
    const isAuthTokenValid = isUserAuthenticated();
    return (
      <React.Fragment>
      <TermsOfConditionsModal
        t={t}
        show={this.state.modalShow}
        onHide={() => {
          this.setState({
            modalShow: false
          });
        }}
      />
        {this.renderRedirectToRoot()}

        {Object.keys(this.props.user || {}).length > 0 &&
          this.renderRedirectToConfirm()}

        {(this._isMounted || !isAuthTokenValid) && (
          <React.Fragment>
            <div className="account-pages mt-5 mb-2">
              <Container>
             
                <Row className="justify-content-center">
                  <Col md={8} lg={6} xl={5}>
                    <Card className="mb-2">
                      <CardBody className="pt-4 pl-3 pr-3 pb-3 position-relative">
                        {/* preloader */}
                        {this.props.loading && <Loader />}

                        <div className="text-center">
                          <Link to="/">
                            <span>
                              <img src={logo} alt="" height="100" />
                            </span>
                          </Link>
                        </div>

                        <div className="text-center mb-4 mt-4">
                          <h4 className="text-uppercase mt-0">
                            {t("register.title")}
                          </h4>
                        </div>

                        {this.props.error && (
                          <Alert
                            color="danger"
                            isOpen={this.props.error ? true : false}
                          >
                            <div>{this.props.error}</div>
                          </Alert>
                        )}

                        <AvForm onValidSubmit={this.handleValidSubmit}>
                          <AvGroup>
                            <Label for="firstName">
                              {t("register.firstName")}
                            </Label>
                            <AvInput
                              name="firstName"
                              placeholder={t("register.firstName")}
                              required
                            />
                            <AvFeedback>
                              {t("register.invalidField")}
                            </AvFeedback>
                          </AvGroup>

                          <AvGroup>
                            <Label for="lastName">
                              {t("register.lastName")}
                            </Label>
                            <AvInput
                              name="lastName"
                              placeholder={t("register.lastName")}
                              required
                            />
                            <AvFeedback>
                              {t("register.invalidField")}
                            </AvFeedback>
                          </AvGroup>

                          <AvGroup>
                            <Label for="fullName">
                              {t("register.fullName")}
                            </Label>
                            <AvInput
                              name="fullName"
                              placeholder={t("register.fullName")}
                              required
                            />
                            <AvFeedback>
                              {t("register.invalidField")}
                            </AvFeedback>
                          </AvGroup>

                          <AvGroup>
                            <Label for="email">{t("register.mail")}</Label>
                            <AvInput
                              type="email"
                              name="email"
                              placeholder={t("register.mail")}
                              autoComplete="off"
                              required
                            />
                            <AvFeedback>
                              {t("register.invalidField")}
                            </AvFeedback>
                          </AvGroup>            
                          <AvGroup>
                            <Label for="password">
                              {t("register.password")}
                            </Label>
                            <AvInput
                              type="password"
                              name="password"
                              id="password"
                              placeholder={t("register.password")}
                              autoComplete="new-password"
                              required
                            />
                            <AvFeedback>
                              {t("register.invalidField")}
                            </AvFeedback>
                          </AvGroup>

                          <AvField   autoComplete="new-password" name="confirmationPassword" label="Confirmation Password" type="password" placeholder={t("register.password")} validate={{match:{value:'password'}}} required/>


                          <div
                            className="checkbox checkbox-primary mb-0 mt-3"
                            style={{ marginLeft: "6px" }}
                          >
                            <input
                              id="remember-me-checkbox"
                              type="checkbox"
                              onChange={this.handleInputChange}
                            />
                            <label htmlFor="remember-me-checkbox">
                              {t("register.acceptTerms")}{" "}
                              <button
                              
                                onClick={()=> 
                                  this.setState({
                                 modalShow: true
                                 })
                                }
                                className="ml-1 font-15 link-button"
                                style={{fontWeight: "100",color:'#71B6F9'}}
                              >
                                <b>({t("register.see")})</b>
                              </button>
                            </label>
                          </div>

                          <FormGroup className="mt-2 mb-0 text-center">
                            <Button color="blue" className="btn-block">
                              {t("register.title")}
                            </Button>
                          </FormGroup>
                        </AvForm>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row className="mt-0">
                  <Col className="col-12 text-center">
                    <p className="text-muted">
                      {t("register.haveAccount")}
                      <Link to="/login" className="ml-1">
                        <b>{t("register.logIn")}</b>
                      </Link>
                    </p>
                  </Col>
                </Row>
              </Container>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, loading, error } = state.Auth;
  return { user, loading, error };
};

export default withTranslation()(
  connect(mapStateToProps, { registerUser, registerUserFailed })(Register)
);
