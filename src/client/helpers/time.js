import { padStart } from 'lodash'

export function secondsToTime(seconds, withMilliseconds = false) {
  if (seconds === null) return '--:--'

  const totalSeconds = Math.floor(seconds)
  const ms = Math.floor((seconds - totalSeconds) * 1000)
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds - (m * 60)
  return `${padStart(m, 2, '0')}:${padStart(s, 2, '0')}${withMilliseconds ? '.' : ''}${withMilliseconds ? padStart(ms, 3, '0') : ''}`
}
