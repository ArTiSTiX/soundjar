import moment from 'moment'
import {
  Track,
} from '../models'
import { transformQuery } from '../helpers/list'

class TrackService {
  constructor(context) {
    this.context = context
  }

  list(sessionId, params) {
    this.context.authorize('track:list')
    const query = transformQuery(params)
    query.where = query.where || {}
    query.where.session_id = sessionId
    return Track.findAll({
      ...query,
    })
  }

  get(id) {
    return Track.findOne({
      where: { id },
    }).then(track => this.context.authorize('track:read', track))
  }

  detail(id) {
    return Track.findOne({
      where: { id },
      include: [
        {
          model: Track,
          as: 'tracks',
        },
      ],
    }).then(track => this.context.authorize('track:read', track))
  }

  async create(sessionId, data) {
    this.context.authorize('track:create')
    const track = await Track.create(data)

    // TODO: Post actions

    return track
  }

  async update(id, data) {
    const track = await Track.findOne({
      where: {
        id,
      },
    })

    if (!track) {
      throw new Error(`Track not found for id ${id}`)
    }

    this.context.authorize('track:update', track)

    return track.update(data)
  }

  async delete(id) {
    const track = await Track.findOne({
      where: {
        id,
      },
    })

    if (!track) {
      throw new Error(`Track not found for id ${id}`)
    }

    this.context.authorize('track:delete', track)

    return track.delete()
  }

  findOrCreateByDate(sessionId, startAt, data) {
    return Track.findOrCreate({
      where: { start_at: startAt },
      defaults: {
        start_at: startAt,
        session_id: sessionId,
        ...data,
      },
    })
  }

  findByDate(sessionId, date) {
    return Track.findOne({
      where: {
        start_at: {
          $gte: moment(date).startOf('minutes').toDate(),
          $lte: moment(date).endOf('minutes').toDate(),
        },
      },
    })
  }
}

export default TrackService
