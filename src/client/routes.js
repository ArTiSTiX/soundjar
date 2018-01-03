import React from 'react'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import {
  App,
  Sessions,
  SessionDetail,
} from './views'

const Root = () => (
  <App>
    <Switch>
      <Route exact path='/' component={Sessions} />
      <Route path='/sessions/:sessionId' component={SessionDetail} />
      <Redirect to='/' />
    </Switch>
  </App>
)

export default Root
