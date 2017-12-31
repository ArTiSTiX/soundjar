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
    })
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
    })
  }

  async create(sessionId, data) {
    const session = await Track.create(data)

    // TODO: Post actions

    return session
  }

  async update(id, data) {
    const session = await Track.findOne({
      where: {
        id,
      },
    })

    if (!session) {
      throw new Error(`Track not found for id ${id}`)
    }

    return session.update(data)
  }

  async delete(id) {
    const session = await Track.findOne({
      where: {
        id,
      },
    })

    if (!session) {
      throw new Error(`Track not found for id ${id}`)
    }

    return session.delete()
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
