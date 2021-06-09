import {
    GET_ALL_MODULES,
    GET_ALL_MODULES_SUCCESS,
    GET_ALL_MODULES_FAILED,
    GET_MODULE_BY_ID,
    GET_MODULE_BY_ID_SUCCESS,
    GET_FIELDS,
    GET_MODULE_BY_ID_FAILED,
    GET_CONFIGURATIONS_MODULE_BY_ID,
    GET_CONFIGURATIONS_MODULE_BY_ID_SUCCESS,
    GET_CONFIGURATIONS_MODULE_BY_ID_FAILED,
    SUBSCRIBE_TO_TRAININGSESSION,
    SUBSCRIBE_TO_TRAININGSESSION_SUCCESS,
    SUBSCRIBE_TO_TRAININGSESSION_FAILED,
    DELETE_ERROR
} from '../../constants/actionTypes';
import { REHYDRATE } from 'redux-persist';

const INIT_STATE = {
    modules: [],
    moduleConfiguration: [],
    fields: [],
    module: {},
    loading: false
};

const Module = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_MODULES:
            return { ...state, loading: true ,error: null ,close:false,modules:[]};
        case GET_ALL_MODULES_SUCCESS:
            return { ...state, modules: action.payload, loading: false, error: null };
        case GET_ALL_MODULES_FAILED:
            return { ...state, error: action.payload, loading: false };
        case GET_MODULE_BY_ID:
            return { ...state, loading: true  ,error: null};
        case GET_FIELDS:
            const fields = []
            state.modules.forEach(module => {
                fields.push(module.field)
            });
            return { ...state, fields: [...new Set(fields)] };
        case GET_MODULE_BY_ID_SUCCESS:
            const { module,notions} = action.payload;
            return { ...state,module,notions, loading: false, error: null };
        case GET_MODULE_BY_ID_FAILED:
            return { ...state, error: action.payload, loading: false };
        case REHYDRATE:
         
            return action.payload  ? {
                 ...state,
                 ...action.payload.Module
            } : {
                ...state,
               
           }
        case GET_CONFIGURATIONS_MODULE_BY_ID:
            return { ...state, loading: true ,error: null};
        case GET_CONFIGURATIONS_MODULE_BY_ID_SUCCESS:
            return { ...state, moduleConfiguration: action.payload, loading: false, error: null };
        case GET_CONFIGURATIONS_MODULE_BY_ID_FAILED:
            return { ...state, error: action.payload, loading: false };

        case SUBSCRIBE_TO_TRAININGSESSION:
            return { ...state, loading: true , error: null ,close:false};
        case SUBSCRIBE_TO_TRAININGSESSION_SUCCESS:
            state.modules.push(action.payload)
            return { ...state, module_: action.payload , loading: false, error: null ,close:true};
        case SUBSCRIBE_TO_TRAININGSESSION_FAILED:
            return { ...state, error: action.payload, loading: false };

        case DELETE_ERROR:
            return { ...state, error: null};
            
        default: return { ...state };
    }
}

export default Module;