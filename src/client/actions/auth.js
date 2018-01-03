import { createAction, handleActions } from 'redux-actions'
import { parseHashFragment } from '../helpers/url'
import { setAuthorizationToken } from '../api/request'
import { fetchUser } from '../api/users'

const GET_USER_ME = 'auth/GET_USER_ME'
const SET_TOKEN = 'auth/SET_TOKEN'

const getUserMe = createAction(GET_USER_ME, () => fetchUser('me'))
const setToken = createAction(SET_TOKEN, token => dispatch => {
  localStorage.setItem('auth.token', token)
  setAuthorizationToken(token)
  dispatch(getUserMe())
  return { token }
})

const initialState = {
  token: null,
  user: null,
}

export const handleAuthentication = () => dispatch => {
  const {
    token = null,
  } = parseHashFragment(window.location.hash)

  if (token) {
    if (window.location.hash) { window.location.hash = '' }
    dispatch(setToken(token))
  }

  const localStorageToken = localStorage.getItem('auth.token')
  if (localStorageToken) { dispatch(setToken(localStorageToken)) }
}

export default handleActions({
  [SET_TOKEN]: (state, { payload: { token } }) => ({
    ...state,
    token,
  }),
  [GET_USER_ME]: (state, { payload: user }) => ({
    ...state,
    user,
  }),
}, initialState)
