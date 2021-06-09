import React, { Component , useState ,useEffect} from 'react';
import { connect } from 'react-redux';
// import { Row, Col, Card, CardBody, Button} from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row, Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getAllModules, subscribeToTrainingSession, deleteError } from '../redux/actions';
import Loader from '../components/Loader';
import Select from 'react-select';
import {  Link } from 'react-router-dom'
import {Modal, Container, Form} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux'

import { Translation } from "react-i18next";
import { encrypt } from "../helpers/crypto";
import swal from 'sweetalert';
import Module from "./moderator/module/Module";
import Cours from "./moderator/module/Cours";
// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
//     { value: 'vanilla', label: 'Vanilla' },
//   ];


const CardModule = (props) =>{
    const {moduleInstanceId, moduleName, field, description, numberOfStudents, numberOfNotions, numberOfQuizzes, progress} = props;
    const color_ = progress > 60 ? "success" : progress < 30 ? "warning" :"info";

    return (
        <Translation>
            {t=>
                <Link to={{pathname:`/module/${encrypt(moduleInstanceId)}`,module:props}}>
                    <Card>
                        <CardBody className="card-box project-box mb-0">
                            <h4 className="mt-0">
                                {moduleName}
                            </h4>
                            <p className={`text-success text-uppercase font-13`}>{field}</p>


                            <p className="text-muted font-13 mb-0 about-container">
                                {description}...
                            </p>

                            <Row className="mt-7">
                                <Col style={{paddingRight:0}}>

                                    <i className="fa fa-user mr-1 text-blue"></i>
                                    <span className="text-dark" > {numberOfStudents} {t('dashboard.card.students')} </span>


                                </Col>

                                <Col style={{paddingRight:0}}>
                                    <i className="fas fa-copy mr-1 text-blue"></i>
                                    <span className="text-dark"> {numberOfNotions} {t('dashboard.card.notions')}   </span>

                                </Col>
                                <Col style={{paddingRight:0}}>
                                    <i className="fas fa-trophy text-blue mr-1"></i>
                                    <span className="text-dark"> {numberOfQuizzes} {t('dashboard.card.quiz')}   </span>

                                </Col>
                            </Row>

                            <h5 className="mt-3" > {t('dashboard.card.progress')} <span className={`text-${color_} float-right`}>{progress}%</span></h5>
                            <div className={`progress progress-bar-alt-${color_} progress-sm`} >
                                <div className={`progress-bar bg-${color_} progress-animated wow animated animated progress-custom`}
                                     style={{ width: `${progress}%`}}>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Link>
            }
        </Translation>

    )
}

function AddModuleModal(props) {

    const [code, setCode] = useState("");
    const dispatch = useDispatch();
    const  {error}    = useSelector(state => {
        return  {
            error :state.Module.error,
        }
    });

    const  state    = useSelector(state =>  state );

    useEffect(() => {

        if(state.Module.close) {
            if(props.show) swal(props.t('dashboard.addModule.import', {moduleName : state.Module.module_.moduleName}),{
                buttons: {
                    cancel: false,
                    confirm: false,
                },
                icon: "success",
            });
            props.onHide();
            dispatch(deleteError())
        }


    }, [state.Module.close])

    function vlaide(){
        dispatch(subscribeToTrainingSession(code))

    }

    useEffect(() => {
        setCode("");
        dispatch(deleteError())

    }, [props.show])


    return (
        <Modal
            {...props}
            //   size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={"static"}
        >
            <Modal.Body>

                <Translation>
                    {t=>

                        <Container>
                            <Row className="show-grid justify-content-md-center">
                                <Col md={5} className="text-center">
                                    {/* <img src={getStart}  alt="img" title="img" /> */}
                                </Col>
                            </Row>
                            <Row className="show-grid justify-content-md-center mt-2">
                                <Col md={8} className="text-center">
                                    <h4>{t('dashboard.addModule.title')} </h4>
                                </Col>
                            </Row>

                            <Row className="show-grid justify-content-md-center mt-2">
                                <Col lg={12}>
                                    <div className="">
                                        <input type="text"  className="form-control" value={code}  onChange={(e)=>setCode(e.target.value)} />
                                        {error &&
                                        <div className="invalid-feedback" style={{display:'initial'}}>
                                            {t('dashboard.addModule.errorCode')}
                                        </div>
                                        }

                                    </div>
                                </Col>
                            </Row>

                            <Row className="show-grid justify-content-md-center mt-3">
                                <Col   className="text-center">
                                    <button type="button" className="btn btn-secondary waves-effect waves-light width-xs mr-2" style={{backgroundColor:'#AAAAAA',borderWidth:'0px'}} onClick={()=>props.onHide(false)}>
                                        {t('dashboard.addModule.cancel')}

                                    </button>
                                    <button type="button" className="btn btn-primary waves-effect waves-light width-xs" onClick={vlaide}>
                                        {t('dashboard.addModule.validate')}

                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    }
                </Translation>
            </Modal.Body>
        </Modal>
    );
}


class DefaultDash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modules:this.props.modules,
            selectedOption: null,
            search:'',
            loader:false,
            modalShow : false

        };

        this.handleChange = this.handleChange.bind(this);
        this.generateOptions = this.generateOptions.bind(this);
    }

    componentDidMount(){
        this.props.getAllModules(this.props.user.id);
    }


    handleChange = (selectedOption) => {
        this.setState(
            { selectedOption,
                modules:this.props.modules,
            },
            () => {this.filter()}
        );
    }

    generateOptions = (t) => {
        const options = [
            { value: null, label: t("dashboard.allModules") }
        ];
        this.props.fields.map(item => {
            return  options.push( { value: item, label: item })
        })

        return options
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.modules !== prevProps.modules && !this.state.loader) {
            this.setState({
                modules:this.props.modules,
                loader:true
            })
        }
    }

    searchModules =  (value)=>{
        const  {modules} = this.props;

        const search_ = new RegExp(value , 'i'); // prepare a regex object
        const res =  modules.filter(item => {
            return search_.test(item.field) ||  search_.test(item.description)  ||  search_.test(item.moduleName)
        });

        this.setState({
            modules:res
        })
    }

    filter = ()=>{
        const  {selectedOption , modules} = this.state;

        if(selectedOption.value == null) return modules;

        const search_ = new RegExp(selectedOption.value , 'i'); // prepare a regex object
        let res =  modules.filter(item => {
            return search_.test(item.field)
        });
        this.setState({
            modules:res
        })
    }



    render() {
        return (
            <Translation>
                {t=>
                    <React.Fragment>
                        <AddModuleModal
                            show={this.state.modalShow}
                            onHide={() =>{
                                this.setState({
                                    modalShow:false
                                })
                            }}
                            t={t}
                        />
                        <div className="">
                            {this.props.loading && <Loader />}
                            <Row  className="mb-1">
                                <Col lg={3}>
                                    {/* <ul className="list-unstyled topnav-menu topnav-menu-left m-0"> */}
                                    <h4 className="mt-2">{t('dashboard.modules')}</h4>
                                    {/* </ul>  */}
                                </Col>
                            </Row>
                            <Row>
                                <Cours />
                            </Row>
                        </div>
                    </React.Fragment>
                }
            </Translation>
        )
    }
};

// Testing Testing Testing

const ModalTestCreate = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button onClick={handleShow} type="button" className="btn btn-primary waves-effect width-md waves-light module-btn float-right" style={{backgroundColor:'#5A97F8'}} >
                <img className="mr-2" src="/static/media/plus-solid.b59f1db3.svg" alt="" title="" />
                Creer un nouveau cours
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*Form here*/}
                    <FormTest />
                </Modal.Body>
            </Modal>
        </>
    );
}

const FormTest = () => {
    return (
        <>
            <Form>
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Image file input" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nom Du Cours</Form.Label>
                    <Form.Control type="text" placeholder="Enter le nom du cours" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Section</Form.Label>
                    <Form.Control type="text" placeholder="Section" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enregistrer
                </Button>
            </Form>
        </>
    )
}

// Testing Testing Testing


const mapStateToProps = (state) => {
    const { modules ,loading, fields} = state.Module;
    const { user} = state.Auth;
    return { user, modules ,loading,  fields};
};

export default connect(mapStateToProps,{getAllModules})(DefaultDash);