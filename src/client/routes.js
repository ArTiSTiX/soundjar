import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import { App } from './views'

const Test = () => (<div>Contenu</div>)

const Root = () => (
  <App>
    <Switch>
      <Route path='/' component={Test} />
    </Switch>
  </App>
)

export default Root
