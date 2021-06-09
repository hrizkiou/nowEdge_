import {  httpClient_get, httpClient_post } from "../../helpers/api";

import configurationModule from '../../helpers/data/configurationModule.json'
import { getLoggedInUser } from "../../helpers/authUtils";


function getAllModulesService(participantUserId) {
    let url = '/participant/getmodules';
     
    if(getLoggedInUser().role.id === 2){
       url = '/moderator/getmodules'
    }


    return httpClient_get(url).then(response => {      
        //console.log('--------<<<<<>>>>>',response.data)
        return response.data;
      })
    .catch(error => {
       throw error;
    });
}

function getModuleByIDService(trainingSessionId,moduleInstanceId) {
    
    return httpClient_get(`/participant/getnotions?trainingSessionId=${trainingSessionId}&moduleInstanceId=${moduleInstanceId}`).then(response => { 
        //console.log(response.data);     
        return response.data;
      })
    .catch(error => {
        throw error   
    });
}


function getConfigurationModuleByIDService(moduleInstanceId) {
    
    //console.log('moduleInstanceId',moduleInstanceId)
    
    return  configurationModule
    
}

function subscribeToTrainingSessioService(code){
    return httpClient_post(`/participant/subscribetotrainingsession?trainingSessionCode=${code}`,{}).then(response => { 
        return response.data;
      })
    .catch(error => {
        throw  error 
    });
}


export {
    getConfigurationModuleByIDService,
    getAllModulesService,
    getModuleByIDService,
    subscribeToTrainingSessioService
}