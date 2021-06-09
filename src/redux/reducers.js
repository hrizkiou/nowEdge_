import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {persistReducer} from 'redux-persist';
import Auth from './auth/reducers';
import Module from './module/reducers';
import Quiz from './quiz/reducers';
import Configuration from './configuration/reducers';
import Notion from './notions/reducers';
import Session from './sessions/reducers';
import StudentManagement from './studentManagement/reducers';
import StratEdge from './StratEdge/reducers';
import PvGame from './pvgame/reducers';
import Days from './days/reducers';
import FinEdge from './FinEdge/reducers';
import Wallet from './Wallet/reducers';
import MarketViews from './MarketViews/reducers';
import {LOGOUT_USER} from '../constants/actionTypes';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['Module', 'Quiz'],
};

const appReducer = combineReducers({
  Auth,
  Module,
  Quiz,
  Configuration,
  Notion,
  Session,
  StudentManagement,
  StratEdge,
  Days,
  FinEdge,
  MarketViews,
  Wallet,
  PvGame
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    // for all keys defined in your persistConfig(s)
    storage.removeItem('persist:root');
    // storage.removeItem('persist:otherKey')

    state = undefined;
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
