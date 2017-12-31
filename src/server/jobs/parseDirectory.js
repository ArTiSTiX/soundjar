import fs from 'fs'
import path from 'path'
import moment from 'moment'
import _ from 'lodash'
import config from '../config'
import SessionService from '../services/Session.service'
import AudioService from '../services/Audio.service'

const SESSIONS_DIRECTORY = config.get('storage.sessions')

const walkSync = async (dir, callback) => {
  const files = fs.readdirSync(dir)
  const directories = []

  for (const file of files) { // eslint-disable-line
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      directories.push(filePath)
    } else {
      await callback(filePath) // eslint-disable-line
    }
  }

  for (const directory of directories) { // eslint-disable-line
    await walkSync(directory, callback) // eslint-disable-line
  }
}

export const execute = context => async (dir = SESSIONS_DIRECTORY) => {
  const sessionService = new SessionService(context)
  const audioService = new AudioService(context)

  const directory = path.isAbsolute(dir) ? dir : path.join(SESSIONS_DIRECTORY, dir)
  await walkSync(directory, async file => {
    try {
      if (!_.startsWith(file, SESSIONS_DIRECTORY)) {
        throw new Error(`Path ${path} is not in sessions directory`)
      }

      const relativePath = _.trim(path.relative(SESSIONS_DIRECTORY, file), './')
      const [sessionDirectory] = relativePath.split(path.sep)
      if (relativePath === sessionDirectory) {
        throw new Error(`${sessionDirectory} is not a session`)
      }
      const [session] = await sessionService.findOrCreateByDirectory(sessionDirectory)
      const extension = _.trim(path.parse(file).ext, '.')
      if (_.includes(['mp3', 'wav'], extension)) {
        const [track, audio] = await audioService.findOrCreateByFile(session, relativePath)
        const endAt = moment(track.start_at).add(audio.duration, 'seconds')
        const sessionUpdate = {}
        if (session.start_at === null || moment(session.start_at).isAfter(track.start_at)) {
          sessionUpdate.start_at = track.start_at
        }
        if (session.end_at === null || moment(session.end_at).isBefore(endAt)) {
          sessionUpdate.end_at = endAt.toDate()
        }

        if (!_.isEmpty(sessionUpdate)) {
          await session.update(sessionUpdate)
        }
      } else if (extension === 'jpg' && !session.cover) {
        session.update({ cover: relativePath })
      }
    } catch (err) {
      console.error(err)
    }
  })
}

export default { execute }
