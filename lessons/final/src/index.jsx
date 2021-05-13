import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import initStore, { history } from './utils/store';
import Router from './containers/Router';
import './styles/app.css';

const { store, persistor } = initStore();

ReactDom.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <Router/>
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('app')
);
