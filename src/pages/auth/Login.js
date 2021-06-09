import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  FormGroup,
  Button,
  Alert,
} from "reactstrap";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";

import { loginUser } from "../../redux/actions";
import { isUserAuthenticated, getCredentialsUser } from "../../helpers/authUtils";
import Loader from "../../components/Loader";
import logo from "../../assets/images/logo_2.svg";
import {  Translation } from 'react-i18next';

class Login extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      rememberMe: false,
    };
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const credentials = getCredentialsUser()

    if(credentials !== null){
      this.props.loginUser(
        credentials.username,
        credentials.password,
        true,
        this.props.history
      );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Handles the submit
   */
  handleValidSubmit = (event, values) => {
    //console.log('****************************************************************************************')
    this.props.loginUser(
      values.username,
      values.password,
      this.state.rememberMe,
      this.props.history
    );
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
    const rem = !this.state.rememberMe;
    this.setState({
      rememberMe: rem,
    });
    //localStorage.setItem('rememberMe', rem); 
  };

  render() {
    const isAuthTokenValid = isUserAuthenticated();
    return (
      <Translation>
      {t =>
        <React.Fragment>
          {this.renderRedirectToRoot()}

          {(this._isMounted || !isAuthTokenValid) && (
            <React.Fragment>
              <div className="account-pages mt-5 mb-3">
                <Container>
                  <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                      <Card className="mb-2">
                        <CardBody className="position-relative pt-4 pl-3 pr-3 pb-1">
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
                            <h4 className="text-uppercase mt-0">{t('loginIn.title')} </h4>
                          </div>

                          {this.props.error && (
                            <Alert
                              color="danger"
                              isOpen={this.props.error ? true : false}
                            >
                              <div>{t(this.props.error)}</div>
                            </Alert>
                          )}

                          <AvForm onValidSubmit={this.handleValidSubmit}>
                            
                            
                            <AvGroup className="mb-3">
                              <Label for="username">{t('loginIn.username')}</Label>
                              <AvInput
                                name="username"
                                placeholder={t('loginIn.entreUsername')}
                                value={this.state.username}
                                required
                              />
                              <AvFeedback>{t('loginIn.invalidField')} </AvFeedback>
                            </AvGroup>

                            <AvGroup className="mb-3">
                              <Label for="password">{t('loginIn.password')}</Label>
                              <AvInput
                                type="password"
                                name="password"
                                id="password"
                                placeholder={t('loginIn.entrePassword')}
                                value={this.state.password}
                                required
                              />
                              <AvFeedback>{t('loginIn.invalidField')} </AvFeedback>
                            </AvGroup>
                          <div className="form-group">
                          <div className="checkbox checkbox-primary mb-2" style={{"marginLeft": "6px"}}>
                              <input
                                id="remember-me-checkbox"
                                type="checkbox"
                                onChange={this.handleInputChange}
                              />
                              <label htmlFor="remember-me-checkbox">
                              {t('loginIn.rememberMe')} 
                              </label>
                            </div>
                          </div>
                            

                            <FormGroup>
                              <Button color="blue" className="btn-block">
                              {t('loginIn.title')}
                              </Button>
                            </FormGroup>
                          </AvForm>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>

                  <Row className="mt-0">
                    <Col className="col-12 text-center">
                      <p className="mb-0 font-15" >
                        <Link
                          to="/forget-password"
                          className="text-black-50 ml-1"
                        >
                          <i className="fa fa-lock mr-1 "></i>
                          {t('loginIn.forgotPassword')}
                        </Link>
                      </p>
                      <p className="text-black-50 font-15 ">
                      {t('loginIn.noAccount')}{" "}
                        <Link to="/register" className="ml-1">
                          <b> {t('loginIn.signUp')}</b>
                        </Link>
                      </p>
                    </Col>
                  </Row>
                </Container>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      }
      </Translation>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, loading, error } = state.Auth;
  return { user, loading, error };
};

export default connect(mapStateToProps, { loginUser })(Login);
