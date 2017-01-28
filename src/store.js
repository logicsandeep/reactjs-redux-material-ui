import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { browserHistory } from 'react-router'
import { routerMiddleware, routerReducer } from 'react-router-redux'

import rootReducer from './reducers'
//import middleware from './middlewares/middleware'

export default function configureStore() {
  const store = createStore(
    combineReducers({
    rootReducer,
    routing: routerReducer
    }),
    applyMiddleware(
      //middleware,
      routerMiddleware(browserHistory),
      thunkMiddleware,
      createLogger()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/', () => {
      const nextRootReducer = require('./reducers/');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store
}
