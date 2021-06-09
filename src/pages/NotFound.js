import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';


const  NotFound  = () => {

  
        return (
            <React.Fragment>

            
                    <div className="account-pages mt-5 mb-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col md={8} lg={6} xl={5} >
                                   
                                    <Card >
                                        <CardBody className="p-4 position-relative">
                                           
                                          

                                            <div className="text-center">
                                                  <h1 className="text-error">404</h1>
                                            </div>

                                         


                                         
                
                                                <div className="text-center mb-4 mt-2">
                                                    <h3 className="mt-3 mb-2">Page not Found</h3>
                                                    <p className="text-muted mb-0 font-13">
                                                    It's looking like you may have taken a wrong turn. Don't worry... it happens to the best of us. You might want to check your internet connection. Here's a little tip that might help you get back on track.                                                     </p>
                                                </div>

                                               
                                                
                                    
                                            
                                            

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            
                        </Container>

                        
                    </div>
            
            </React.Fragment>
        )
    }


export default NotFound;