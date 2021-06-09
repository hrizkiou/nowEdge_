import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import sagas from "./redux/sagas";

store.sagaMiddleware.run(sagas);

ReactDOM.render(
<Provider store={store.store}>
    <PersistGate  persistor={store.persistor}>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </PersistGate>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
