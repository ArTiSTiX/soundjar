import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import auth from './auth'
import sessions from './sessions'
import player from './player'

const reducers = combineReducers({
  auth,
  sessions,
  player,
  router,
})

export default reducers
