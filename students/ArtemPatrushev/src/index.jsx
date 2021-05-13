import React from 'react';
import ReactDom from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './containers/Router.js';
import { Provider } from 'react-redux';
import initStore, { history } from './Utils/store.js';

const { store, persistor } = initStore();

window.store = store;

ReactDom.render (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <Router />
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('app')
);