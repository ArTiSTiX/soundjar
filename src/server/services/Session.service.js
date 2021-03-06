import {
  Session,
  Track,
  Audio,
  Region,
} from '../models'
import config from '../config'
import { transformQuery } from '../helpers/list'

const DEFAULT_ARTIST = config.get('defaults.artist')

class SessionService {
  constructor(context) {
    this.context = context
  }

  list(params) {
    this.context.authorize('session:list')
    const query = transformQuery(params)

    return Session.findAll({
      ...query,
    })
  }

  get(id) {
    return Session.findOne({
      where: { id },
    }).then(session => this.context.authorize('session:update', session))
  }

  detail(id) {
    return Session.findOne({
      where: { id },
      include: [
        {
          model: Track,
          as: 'tracks',
          include: [
            {
              model: Audio,
              as: 'audios',
            },
            {
              model: Region,
              as: 'regions',
            },
          ],
        },
      ],
    }).then(session => this.context.authorize('session:update', session))
  }

  async create(data) {
    this.context.authorize('session:create')
    const session = await Session.create(data)

    // TODO: Post actions

    return session
  }

  async update(id, data) {
    const session = await Session.findOne({
      where: {
        id,
      },
    })

    if (!session) {
      throw new Error(`Session not found for id ${id}`)
    }

    this.context.authorize('session:update', session)

    return session.update(data)
  }

  async delete(id) {
    const session = await Session.findOne({
      where: {
        id,
      },
    })

    if (!session) {
      throw new Error(`Session not found for id ${id}`)
    }

    this.context.authorize('session:delete', session)

    return session.delete()
  }

  findOrCreateByDirectory(directory) {
    return Session.findOrCreate({
      where: { directory },
      defaults: {
        artist: DEFAULT_ARTIST,
        title: directory,
      },
    })
  }
}

export default SessionService
