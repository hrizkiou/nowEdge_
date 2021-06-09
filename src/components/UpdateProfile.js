import React, { useState , useEffect} from "react";
import { Container } from 'reactstrap';


import {useSelector, useDispatch} from 'react-redux'
import {  Modal , Alert} from 'react-bootstrap';
import { Row, Col} from 'reactstrap';
import { Translation  } from "react-i18next";
import {useDropzone} from 'react-dropzone'
import { useForm , ErrorMessage } from "react-hook-form";
import { updateUser } from "../redux/auth/actions";
import profilePic from '../assets/images/user-1.png';
import Loader from "./Loader";

export default function UpdateProfile(props) {


    const  {user , loading , success}    = useSelector(state =>  {
        
        return {
            user: state.Auth.user ,
            loading: state.Auth.loading,
            success:state.Auth.success,
    
        }
    });

    const [error, setError] = useState(false);

    const [img, setImg]   = useState(()=>{
        if(user) 
        return user.avatarPath 

        return  profilePic
    });
    const [avatar, setAvatar]   = useState();
    const dispatch        = useDispatch();

    useEffect(() => {
        if(success === true ) props.onHide();
    }, [success]);

    const { register, handleSubmit, watch, errors } = useForm();
    
    const onSubmit = data => {
        const {username,avatarPath} =user;
      dispatch(updateUser({...data,avatar,username,avatarPath}));
    //   
    }

    const {getInputProps, getRootProps} = useDropzone({
        onDrop : files =>{     

            const file = files[0]
            if(!file) return;
            setAvatar(files[0]);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImg(event.target.result); 
            };
            reader.readAsDataURL(file);
            setError(false);
        },
        accept: '.jpeg,.jpg,.png',
        multiple:false,
        minSize:0,
        maxSize:5242880,
        onDropRejected: ()=>{
            setError(true);
        }

      });
    



      
    return (
        <>
         {loading && <Loader />}
      <Modal
        {...props}
     
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={"static"}
      >
        <Modal.Body>
           
        <Translation>
        {t=> 
 
           <Container>
           <Row>
            <Col>
            { error &&
            <Alert  variant={'danger'}>
                 {t("updateProfile.maxSize")} 
            </Alert>
            }
                                                                   
                                     <Row style={{justifyContent:'center'}} className="mb-2" > 
                                     <div className="form-group" style={{"height":" 6rem",display:'flex'}}>
                                     <img  src={img || profilePic}   className="rounded-circle avatar-xl img-thumbnail float-left" alt="user-img"  />

                                        <div {...getRootProps()}  className="dropzone-btn">
                                            <input {...getInputProps()}/>
    
                                            <button  className="btn btn-icon waves-effect btn-secondary" style={{}} >
                                               <i className="fas fa-edit"></i>
                                            </button>
                                        </div>
                                     </div>
                                   
                                     </Row>
                                     <form onSubmit={handleSubmit(onSubmit)}>
                                      <Row>
                                        <Col>
                                            
                                            <div className="form-group">
                                                <label htmlFor="username">{t("updateProfile.fullName")}</label>
                                                <input type="text" name="username" defaultValue={user.username}  className="form-control" disabled />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="firstName">{t("updateProfile.firstName")}</label>
                                                <input type="text" name="firstName" defaultValue={user.firstName} className="form-control" ref={register} />
                                                  <ErrorMessage errors={errors} name="firstName" />
                                            </div>
                                           
                                           
                                            <div className="form-group">
                                                <label htmlFor="lastName">{t("updateProfile.lastName")}</label>
                                                <input type="text" name="lastName"  defaultValue={user.lastName} className="form-control" ref={register}/>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="form-group">
                                                <label htmlFor="emailAddress">{t("updateProfile.mail")}</label>
                                                <input type="email" name="email" defaultValue={user.email} className="form-control" ref={register}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="pass1">{t("updateProfile.password")}</label>
                                                <input name="pass1" type="password"  className="form-control" ref={register} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="pass2">{t("updateProfile.confirmationPassword")}</label>
                                                <input name="pass2" type="password"  className="form-control" 
                                                    ref={register({
                                                        validate: (value) => {
                                                            return value === watch('pass1') || 'Les mots de passe ne correspondent pas.'
                                                        }
                                                    })}
                                                />
                                                 <ErrorMessage errors={errors} name="pass2"   />
                                            </div>
                                        </Col>
                                       </Row>
                                        <div className="form-group text-right mb-0">
                                           <button type="reset" className="btn btn-secondary waves-effect waves-light mr-1" onClick={()=>props.onHide()} >
                                                
                                                {t("updateProfile.cancel")} 
                                            </button>
                                            <button className="btn btn-primary waves-effect waves-light " type="submit">
                                                
                                                {t("updateProfile.submit")} 
                                            </button>
                                          
                                        </div>

                                    </form>
                              
                    </Col>
                </Row>
          </Container>
        }
        </Translation>
        </Modal.Body>
      </Modal>
      </>
    );
  }