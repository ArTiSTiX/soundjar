import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import auth from './auth'
import sessions from './sessions'

const reducers = combineReducers({
  auth,
  sessions,
  routing,
})

export default reducers
