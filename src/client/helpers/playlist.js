import { map, find, compact } from 'lodash'
import moment from 'moment'

export function getTrackDefaultTitle(track) {
  if (!track) { return '' }
  if (track.start_at) {
    return moment(track.start_at).format('HH[h]mm')
  }
  return 'No title'
}

export function createPlaylistItem(element, type = 'track') {
  switch (type) {
    case 'track':
      if (element.render && element.render.mp3) {
        return {
          id: element.id,
          type,
          file: element.render.mp3,
          duration: element.render.duration,
          title: getTrackDefaultTitle(element),
        }
      }
      return null
    default:
      return null
  }
}

export function transformSessionToPlaylist(session) {
  return compact(map(
    session.tracks,
    track => createPlaylistItem(track, 'track')
  ))
}


export function getPlaylistItem(playlist, id, type = 'track') {
  return find(playlist, { id, type })
}
