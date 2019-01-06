import { createAction, handleActions } from 'redux-actions'
import { findIndex } from 'lodash'

import { createPlaylistItem, getPlaylistItem, transformSessionToPlaylist } from 'helpers/playlist'

const SET_POSITION = 'player/SET_POSITION'
const SET_PLAYING = 'player/SET_PLAYING'
const SET_READY = 'player/SET_READY'
const SET_CURRENT = 'player/SET_CURRENT'
const ADD_PLAYLIST = 'player/ADD_PLAYLIST'

export const setPosition = createAction(SET_POSITION, position => ({ position }))
export const setPlaying = createAction(SET_PLAYING, isPlaying => ({ isPlaying }))
export const setReady = createAction(SET_READY, isReady => ({ isReady }))
export const setCurrent = createAction(SET_CURRENT, current => ({ current }))
export const addPlaylist = createAction(ADD_PLAYLIST, playlist => ({ playlist }))

export const playTrack = (track, session = null) => (dispatch, getState) => {
  const { player: { current, isPlaying, playlist } } = getState()
  if (!current || current.type !== 'track' || current.id !== track.id) {
    const existingPlaylistItem = getPlaylistItem(playlist, track.id, 'track')
    if (existingPlaylistItem) {
      dispatch(setCurrent(existingPlaylistItem))
    } else if (session) {
      dispatch(addPlaylist(transformSessionToPlaylist(session)))
      dispatch(setCurrent(createPlaylistItem(track, 'track')))
    } else {
      const playlistItem = createPlaylistItem(track, 'track')
      dispatch(addPlaylist([playlistItem]))
      dispatch(setCurrent(playlistItem))
    }
  } else {
    dispatch(setPlaying(!isPlaying))
  }
}

export const play = item => (dispatch, getState) => {
  const { player: { current, isPlaying } } = getState()

  if (!current || current.type !== item.type || current.id !== item.id) {
    dispatch(setCurrent(item))
  } else {
    dispatch(setPlaying(!isPlaying))
  }
}

export const next = () => (dispatch, getState) => {
  const { player: { current, playlist } } = getState()

  if (!current) {
    if (playlist.length) {
      dispatch(setCurrent(playlist[0] || null))
    }
  } else {
    const index = findIndex(playlist, { id: current.id, type: current.type })
    if (index > -1) {
      dispatch(setCurrent(playlist[index + 1] || null))
    }
  }
}
export const previous = () => (dispatch, getState) => {
  const { player: { current, playlist } } = getState()

  if (!current) {
    if (playlist.length) {
      dispatch(setCurrent(playlist[0]))
    }
  } else {
    const index = findIndex(playlist, { id: current.id, type: current.type })
    if (index > 0) {
      dispatch(setCurrent(playlist[index - 1] || null))
    } else {
      dispatch(setCurrent(null))
    }
  }
}

const initialState = {
  isPlaying: false,
  position: null,
  playlist: [],
  current: null,
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
  [SET_CURRENT]: (state, { payload: { current } }) => ({
    ...state,
    current,
    isPlaying: false,
    position: 0,
  }),
  [ADD_PLAYLIST]: (state, { payload: { playlist } }) => ({
    ...state,
    playlist: [
      ...state.playlist,
      ...playlist,
    ],
  }),
}, initialState)
