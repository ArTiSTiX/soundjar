import React from 'react'
import ReactDom from 'react-dom'

import './style/main.scss'

import { StoreProvider } from './store'
import Routes from './routes'

if (module.hot) {
  module.hot.accept()
}

ReactDom.render(
  <StoreProvider>
    <Routes />
  </StoreProvider>,
  document.getElementById('app')
)
