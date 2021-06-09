import {   httpClient_post } from "../../helpers/api";
import { getLoggedInUser } from "../../helpers/authUtils";



function loginService(username, password) {

    return httpClient_post('/user/authenticate', {username, password}).then(response => {      
        //console.log('gola')
        return response.data;
      })
    .catch(error => {
        return { error: error.response.data, isError: true}   
 
    });
}
 

function registerService(email, password, role, username, firstName, lastName) {
    //console.log(' {email, password, role, username}',  { email, password, role, username})
    return httpClient_post('/user/register', {email, password, role, username, firstName, lastName}).then(response => {      
        //console.log('gola')
        return response.data;
      })
    .catch(error => {
        return { error: error.response.data, isError: true}  
    });
}

function UpdateUserService(user) {

    const { token } = getLoggedInUser();

   
     const formData = new FormData();

     if(user.avatar) formData.append('avatar',user.avatar);

     formData.append('username',user.username);

     formData.append('firstName',user.firstName);

     formData.append('lastName',user.lastName);

     formData.append('email',user.email);

     if(user.pass1) formData.append('password',user.pass1);

     formData.append('avatarPath',user.avatarPath);

     formData.append('token',token);



     return httpClient_post('/index.php',formData,process.env.REACT_APP_PHP_SERVICE_BASE_URL).then(response => {      
       
        return response.data;
      })
    .catch(error => {
        throw error.response.data;
    });
}

function forgetPasswordService(username) {
    
    return httpClient_post(`/user/resetpassword?username=${username}`,{});
    // .then(response => {      
    //     return response.data;
    //   })
    // .catch(error => {
      
    //     throw error
    // });
}
 


export {
    loginService,
    registerService,
    UpdateUserService,
    forgetPasswordService
}