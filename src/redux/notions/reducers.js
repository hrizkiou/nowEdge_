import {
    GET_NOTIONS_MODULE_BY_ID,
    GET_NOTIONS_MODULE_BY_ID_SUCCESS,
    GET_NOTIONS_MODULE_BY_ID_FAILED,
    ADD_NOTIONS_MODULE,
    ADD_NOTIONS_MODULE_SUCCESS,
    ADD_NOTIONS_MODULE_FAILED,
    INIT_SUCCESS_NOTION,
    EDIT_NOTIONS_MODULE,
    EDIT_NOTIONS_MODULE_SUCCESS,
    EDIT_NOTIONS_MODULE_FAILED,
    DELETE_NOTIONS_MODULE,
    DELETE_NOTIONS_MODULE_SUCCESS,
    DELETE_NOTIONS_MODULE_FAILED,
    INIT_ERROR_NOTION,
    ORDER_NOTIONS_MODULE,
    ORDER_NOTIONS_MODULE_SUCCESS,
    ORDER_NOTIONS_MODULE_FAILED
} from '../../constants/actionTypes';
import { REHYDRATE } from 'redux-persist';


const INIT_STATE = {
    moduleNotions: [],
    loading: false
};

const Notion = (state = INIT_STATE, action) => {
    let moduleNotions;
    switch (action.type) {
        
        case GET_NOTIONS_MODULE_BY_ID:
            return { ...state, loading: true ,error: null};
        case GET_NOTIONS_MODULE_BY_ID_SUCCESS:
            return { ...state, moduleNotions: action.payload, loading: false, error: null };
        case GET_NOTIONS_MODULE_BY_ID_FAILED:
            return { ...state, error: action.payload, loading: false };
        
        case ADD_NOTIONS_MODULE:
            return { ...state, loading: true ,error: null};
        case ADD_NOTIONS_MODULE_SUCCESS:
            moduleNotions = state.moduleNotions;
            moduleNotions.push(action.payload);
            return { ...state, moduleNotions, loading: false, addSuccess: true, error: null };
        case ADD_NOTIONS_MODULE_FAILED:
            return { ...state, error: action.payload, loading: false };
        
        case EDIT_NOTIONS_MODULE:
            return { ...state, loading: true ,error: null};
        case EDIT_NOTIONS_MODULE_SUCCESS:
            moduleNotions = state.moduleNotions;
            moduleNotions = moduleNotions.map((notion) => {
                if (notion.notionId === action.payload.notionId) {
                    notion = { ...action.payload };
                }
                return notion;
            });
            return { ...state, moduleNotions, loading: false, editSuccess: true, error: null };
        case EDIT_NOTIONS_MODULE_FAILED:
            return { ...state, error: action.payload, loading: false };
        
        case DELETE_NOTIONS_MODULE:
            return { ...state, loading: true ,error: null};
        case DELETE_NOTIONS_MODULE_SUCCESS:
            moduleNotions = state.moduleNotions;
            moduleNotions = moduleNotions.filter((notion) => {
                return notion.notionId !== action.payload;
            });
            return { ...state, moduleNotions, loading: false, deleteSuccess: true, error: null };
        case DELETE_NOTIONS_MODULE_FAILED:
            return { ...state, error: action.payload, loading: false };
        
        case ORDER_NOTIONS_MODULE:
            return { ...state, loading: true ,error: null};
        case ORDER_NOTIONS_MODULE_SUCCESS:
            return { ...state, moduleNotions: action.payload, loading: false, orderSuccess: true, error: null };
        case ORDER_NOTIONS_MODULE_FAILED:
            return { ...state, error: action.payload, loading: false };
        
        case INIT_SUCCESS_NOTION:
            return {
            ...state,
            addSuccess: false,
            deleteSuccess: false,
            editSuccess: false,
            orderSuccess: false,
            };
        
        case INIT_ERROR_NOTION:
            return {
            ...state,
            error: false
            };
        case REHYDRATE:
        
                return action.payload  ? {
                        ...state,
                        ...action.payload.Notion
                } : {
                    ...state,
                    
                }
        default: return { ...state };
    }
}

export default Notion;