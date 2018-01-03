import fs from 'fs'
import path from 'path'
import moment from 'moment'
import Promise from 'bluebird'
import ffprobe from 'node-ffprobe'
import {
  Audio,
} from '../models'
import config from '../config'
import { transformQuery } from '../helpers/list'
import TrackService from './Track.service'

const probe = Promise.promisify(ffprobe)

const SESSIONS_PATH = config.get('storage.sessions')
const AUDIO_PATTERN = config.get('storage.audioPattern')
const RENDER_PATTERN = config.get('storage.renderPattern')

class AudioService {
  constructor(context) {
    this.context = context
    this.trackService = new TrackService(context)
  }

  list(sessionId, params) {
    this.context.authorize('audio:list')
    const query = transformQuery(params)
    query.where = query.where || {}
    query.where.session_id = sessionId
    return Audio.findAll({
      ...query,
    })
  }

  get(id) {
    return Audio.findOne({
      where: { id },
    }).then(audio => this.context.authorize('audio:read', audio))
  }

  detail(id) {
    return Audio.findOne({
      where: { id },
      include: [
        {
          model: Audio,
          as: 'tracks',
        },
      ],
    }).then(audio => this.context.authorize('audio:read', audio))
  }

  async create(sessionId, data) {
    this.context.authorize('audio:create')
    const audio = await Audio.create(data)

    // TODO: Post actions

    return audio
  }

  async update(id, data) {
    const audio = await Audio.findOne({
      where: {
        id,
      },
    })

    if (!audio) {
      throw new Error(`Audio not found for id ${id}`)
    }
    this.context.authorize('audio:update', audio)

    return audio.update(data)
  }

  async delete(id) {
    const audio = await Audio.findOne({
      where: {
        id,
      },
    })

    if (!audio) {
      throw new Error(`Audio not found for id ${id}`)
    }

    this.context.authorize('audio:delete', audio)

    return audio.delete()
  }

  async findOrCreateByFile(session, file) {
    const {
      dir,
      name,
      ext: extension,
    } = path.parse(file)

    const fullPath = path.join(SESSIONS_PATH, file)

    let info
    let channel
    let track

    const audioMatches = name.match(AUDIO_PATTERN.regex)
    const renderMatches = name.match(RENDER_PATTERN.regex)
    if (audioMatches) { // File is a raw audio file
      info = await probe(fullPath) // Parse audio file infos
      const { duration } = info.streams[0]

      const birthtime = moment(fs.statSync(fullPath).birthtime) // get file creation date
      // const date = moment(matches[AUDIO_PATTERN.groups.date], AUDIO_PATTERN.dateFormat).toDate()
      const startAt = birthtime.toDate()

      channel = audioMatches[AUDIO_PATTERN.groups.channel];

      [track] = await this.trackService
        .findOrCreateByDate(session.id, startAt, { duration })
    } else if (renderMatches) { // File is a rendered file
      info = await probe(fullPath) // Parse audio file infos
      const { duration } = info.streams[0]

      let startAt = moment(session.start_at)
        .hours(Number(renderMatches[RENDER_PATTERN.groups.hours]))
        .minutes(Number(renderMatches[RENDER_PATTERN.groups.minutes]))

      if (startAt.isBefore(session.start_at)) {
        startAt = startAt.add(1, 'day')
      }

      channel = 'render'

      track = await this.trackService
        .findByDate(session.id, startAt)

      if (!track) {
        throw new Error(`Cannot find track for renderFile: ${name}`)
      }

      const title = renderMatches[RENDER_PATTERN.groups.title]
      const trackUpdate = {}

      if (!track.title && title) {
        trackUpdate.title = title
      }
      trackUpdate.duration = duration

      track = await track.update(trackUpdate)
    } else {
      throw new Error(`Cannot parse file: ${name}`)
    }

    const {
      bits_per_sample: bitsPerSample,
      sample_rate: sampleRate,
      duration,
    } = info.streams[0]

    let audio
    let created
    switch (extension) {
      case '.mp3':
        [audio, created] = await Audio
          .findOrCreate({
            where: { $or: [{ mp3: file }, { source: `${dir}/${name}.wav` }] },
            defaults: {
              session_id: session.id,
              track_id: track.id,
              mp3: file,
              duration,
              channel,
              bits_per_sample: bitsPerSample,
              sample_rate: sampleRate,
            },
          })

        if (!created) {
          await audio.update({ mp3: file })
        }
        break
      case '.wav':
        [audio, created] = await Audio
          .findOrCreate({
            where: { $or: [{ source: file }, { mp3: `${dir}/${name}.mp3` }] },
            defaults: {
              session_id: session.id,
              track_id: track.id,
              source: file,
              duration,
              channel,
              bits_per_sample: bitsPerSample,
              sample_rate: sampleRate,
            },
          })
        if (!created) {
          await audio.update({ source: file, duration })
        }
        break
      default:
        throw new Error('Not an audio file')
    }
    return [track, audio]
  }
}

export default AudioService
