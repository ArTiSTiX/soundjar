import { createAction, handleActions } from 'redux-actions'

const SET_POSITION = 'player/SET_POSITION'
const SET_PLAYING = 'player/SET_PLAYING'
const SET_READY = 'player/SET_READY'
const SET_CURRENT_TRACK = 'player/SET_CURRENT_TRACK'

export const setPosition = createAction(SET_POSITION, position => ({ position }))
export const setPlaying = createAction(SET_PLAYING, isPlaying => ({ isPlaying }))
export const setReady = createAction(SET_PLAYING, isReady => ({ isReady }))
export const setCurrentTrack = createAction(SET_CURRENT_TRACK, currentTrack => ({ currentTrack }))

export const playTrack = track => (dispatch, getState) => {
  const { player: { currentTrack, isPlaying } } = getState()
  if (!currentTrack || currentTrack.id !== track) {
    dispatch(setCurrentTrack(track))
    dispatch(setPlaying(false))
  }
  dispatch(setPlaying(!isPlaying))
}

const initialState = {
  isPlaying: false,
  position: null,
  currentTrack: null,
}

export default handleActions({
  [SET_POSITION]: (state, { payload: { position } }) => ({
    ...state,
    position,
  }),
  [SET_PLAYING]: (state, { payload: { isPlaying } }) => ({
    ...state,
    isPlaying,
  }),
  [SET_READY]: (state, { payload: { isReady } }) => ({
    ...state,
    isReady,
  }),
  [SET_CURRENT_TRACK]: (state, { payload: { currentTrack } }) => ({
    ...state,
    currentTrack,
  }),
}, initialState)
