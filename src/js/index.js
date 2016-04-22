import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './components/App'
import configureStore from './store/configureStore'
import { getProject } from './actions'
import '../scss/main.scss'

const store = configureStore(applyMiddleware(thunk))
store.dispatch(getProject('http://design.oweather.net/'))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react')
)