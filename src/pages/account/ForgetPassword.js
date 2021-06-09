import React, { useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom' 
import { Container, Row, Col, Card, CardBody, FormGroup, Button, Alert } from 'reactstrap';
import { AvForm,AvField } from 'availity-reactstrap-validation';

import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import logo from "../../assets/images/logo_2.svg";
import {useDispatch,useSelector} from 'react-redux'
import { useTranslation } from 'react-i18next';
import { forgetPassword, clearError } from '../../redux/actions';


const  ForgetPassword  = () => {
    // let _isMounted = false;
    
    const {t} = useTranslation();
    const [_isMounted, setIsMounted] = useState(false);
    const [passwordResetSuccessful, setPasswordResetSuccessful] = useState(false);


    const {loading,passwordResetStatus,error} = useSelector(state => {
    
        return {
            loading:state.Auth.loading,
            passwordResetStatus:state.Auth.passwordResetStatus,
            error:state.Auth.error,
        }
        
    });
    const dispatch = useDispatch()

    useEffect(() => {
        setIsMounted(true);
        return ()=>{
            dispatch(clearError());
        }
    }, []);

    

    /**
     * On error dismiss
     */
    function onDismiss() {
        setPasswordResetSuccessful(false);
    }

    /**
     * Handles the submit
     */
    const handleValidSubmit = (event, values) => {

        dispatch(forgetPassword(values.fullName));
    }


    /**
     * Redirect to root
     */
    const renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to='/login' />
        }
    };

  
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>

                {renderRedirectToRoot()}

                {(_isMounted || !isAuthTokenValid) && <React.Fragment>

                    <div className="account-pages mt-5 mb-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col md={8} lg={6} xl={5} >
                                   
                                    <Card >
                                        <CardBody className="p-4 position-relative">
                                            { /* preloader */}
                                            {loading && <Loader />}

                                            <div className="text-center">
                                                    <Link to="/">
                                                    <img style={{width:'100%'}}  src={logo} alt="" height="100" />

                                                    </Link>
                                                </div>


                                           { passwordResetStatus ?
                                            <div className="text-center mb-4 mt-2">
                                                    <p className="text-muted mb-0 font-13">{t('forgotPassword.checkEmail')}</p>
                                                </div>
                                            
                                             :  
                                            <>
                                                <div className="text-center mb-4 mt-2">
                                                    <h4 className="text-uppercase mt-0 mb-3">{t('forgotPassword.title')}</h4>
                                                    <p className="text-muted mb-0 font-13">{t('forgotPassword.desc')} </p>
                                                </div>

                                                <Alert color="success" isOpen={passwordResetSuccessful} toggle={onDismiss}>
                                                {t('forgotPassword.successAlert')} 
                                                </Alert>
                                                {error && (
                                                <Alert
                                                    color="danger"
                                                    isOpen={error ? true : false}
                                                    >
                                                     <div>{error.message}</div>
                                                    </Alert>
                                              )}
                                                <AvForm onValidSubmit={handleValidSubmit}>
                                                    <AvField type="text" name="fullName" label={t('forgotPassword.labelUserName')} placeholder={t('forgotPassword.inputPlaceholder')} required />

                                                    <FormGroup className="mb-0 text-center">
                                                        <Button color="primary" className="btn-block">
                                                            {t('forgotPassword.resetButton')} 
                                                        </Button>
                                                    </FormGroup>
                                                </AvForm>
                                            </>
                                            
                                            }

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className="mt-1">
                                <Col className="col-12 text-center">
                                    <p className="text-muted"> {t('forgotPassword.back')} <Link to="/login" className="text-dark ml-1"><b>{t('forgotPassword.signIn')}</b></Link></p>
                                </Col>
                            </Row>
                        </Container>

                        
                    </div>
                </React.Fragment>}
            </React.Fragment>
        )
    }


export default ForgetPassword;