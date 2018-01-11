import { createAction, handleActions } from 'redux-actions'
import {
  fetchAllSessions,
  fetchSession,
} from '../api/sessions'

const LIST_SESSIONS = 'sessions/LIST_SESSIONS'
const LIST_SESSIONS_LOADING = 'sessions/LIST_SESSIONS/LOADING'
const LIST_SESSIONS_ERROR = 'sessions/LIST_SESSIONS/ERROR'
const GET_SESSION = 'sessions/GET_SESSION'
const GET_SESSION_LOADING = 'sessions/GET_SESSION/LOADING'
const GET_SESSION_ERROR = 'sessions/GET_SESSION/ERROR'

export const listSessions = createAction(LIST_SESSIONS, () => fetchAllSessions())
export const getSession = createAction(GET_SESSION, sessionId => fetchSession(sessionId))

const initialState = {
  list: {
    items: [],
    isLoading: false,
    error: false,
  },
  detail: {
    data: null,
    isLoading: false,
    error: false,
  },
}

export default handleActions({
  [LIST_SESSIONS]: (state, { payload: items }) => ({
    ...state,
    list: {
      items,
      isLoading: false,
      error: false,
    },
  }),
  [LIST_SESSIONS_LOADING]: state => ({
    ...state,
    list: {
      ...state.list,
      items: [],
      isLoading: true,
    },
  }),
  [LIST_SESSIONS_ERROR]: (state, { payload: error }) => ({
    ...state,
    list: {
      items: [],
      error,
      isLoading: false,
    },
  }),
  [GET_SESSION]: (state, { payload: data }) => ({
    ...state,
    detail: {
      data,
      isLoading: false,
      error: false,
    },

  }),
  [GET_SESSION_LOADING]: state => ({
    ...state,
    detail: {
      ...state.detail,
      data: null,
      isLoading: true,
    },

  }),
  [GET_SESSION_ERROR]: (state, { payload: error }) => ({
    ...state,
    detail: {
      data: null,
      error,
      isLoading: false,
    },
  }),
}, initialState)
