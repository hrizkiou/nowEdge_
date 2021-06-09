import {all} from 'redux-saga/effects';
import authSaga from './auth/saga';
import moduleSaga from './module/saga';
import quizSaga from './quiz/saga';
import ConfigurationSaga from './configuration/saga';
import NotionSaga from './notions/saga';
import SessionSaga from './sessions/saga';
import StudentManagementSaga from './studentManagement/saga';
import StratEdgeSaga from './StratEdge/saga';
import DaysSaga from './days/saga';
import PvGameSaga from './pvgame/saga';
import FinEdgeSaga from './FinEdge/saga';
import WalletSaga from './Wallet/saga';
import MarketViewsSaga from './MarketViews/saga';

export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    moduleSaga(),
    quizSaga(),
    ConfigurationSaga(),
    NotionSaga(),
    SessionSaga(),
    StudentManagementSaga(),
    StratEdgeSaga(),
    DaysSaga(),
    PvGameSaga(),
    FinEdgeSaga(),
    MarketViewsSaga(),
    WalletSaga(),
  ]);
}
