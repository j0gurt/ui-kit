import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import AppStore from './store';
import routes from './routes';

import '../scss/main.scss';
const store = AppStore();

render(
    <Provider store={store.state}>
        <Router history={store.history}>
            { routes() }
        </Router>
    </Provider>,
    document.getElementById('root')
);