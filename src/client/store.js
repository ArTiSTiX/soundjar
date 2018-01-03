import React from 'react'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from './actions'
import promiseMiddleware from './helpers/promiseMiddleware'

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(promiseMiddleware, thunk),
    // eslint-disable-next-line no-underscore-dangle
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ),
)

export const history = syncHistoryWithStore(createBrowserHistory(), store)

if (module.hot) {
  module.hot.accept('./actions', () => (
    store.replaceReducer(require('./actions').default) // eslint-disable-line
  ))
}

export const StoreProvider = ({ children }) => (
  <Provider store={store}>
    <Router history={history}>
      {children}
    </Router>
  </Provider>
)

export default { store, history, StoreProvider }
