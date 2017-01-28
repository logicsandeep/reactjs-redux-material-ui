import 'babel-polyfill'
import 'whatwg-fetch'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import configureStore from './store'

import App from './components/App'
import Test1 from './components/Test1'
import Test2 from './components/Test2'

import {
  ROUTE_INDEX,
  ROUTE_APP,
  ROUTE_TEST1,
  ROUTE_TEST2,
} from './constants'

import './style/app.css'

/*if(module.hot) {
  console.clear()
  module.hot.accept()
}*/

try { injectTapEventPlugin() } catch(ignore) { }

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={ROUTE_INDEX}>
        <IndexRedirect to={ROUTE_APP} />
        <Route path={ROUTE_APP}   component={App} />
        <Route path={ROUTE_TEST1} component={Test1}  />
        <Route path={ROUTE_TEST2} component={Test2} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
/*
function checkAuth(nextState, replace) {
  if (!isAuthenticated(auth.getToken())) {
    if (auth.loggedIn()) auth.logout()
    if (clearRoute(nextState.location.pathname) !== ROUTE_LIST)
      replace(ROUTE_LIST)
    auth.showWidget()
  }
  else if (!store.getState().rootReducer.app.isAuthenticated)
      auth.login()
}

function checkAuthNData(nextState, replace) {
  if (!Object.keys(store.getState().rootReducer.clients.client).length)
    replace(ROUTE_LIST)
  checkAuth(nextState, replace)
}*/
