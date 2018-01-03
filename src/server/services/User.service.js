import {
  User,
} from '../models'
import { transformQuery } from '../helpers/list'

class UserService {
  constructor(context) {
    this.context = context
  }

  list(params) {
    this.context.authorize('user:list')
    const query = transformQuery(params)

    return User.findAll({
      ...query,
    })
  }

  get(id) {
    return User
      .findOne({
        where: { id },
      })
      .then(user => this.context.authorize('user:read', user))
  }

  detail(id) {
    return User
      .findOne({
        where: { id },
      })
      .then(user => this.context.authorize('user:read', user))
  }

  async create(data) {
    this.context.authorize('user:create')
    const user = await User.create(data)

    // TODO: Post actions

    return user
  }

  async update(id, data) {
    const user = await User.findOne({
      where: {
        id,
      },
    })

    if (!user) {
      throw new Error(`User not found for id ${id}`)
    }

    this.context.authorize('user:update', user)

    return user.update(data)
  }

  async delete(id) {
    const user = await User.findOne({
      where: {
        id,
      },
    })

    if (!user) {
      throw new Error(`User not found for id ${id}`)
    }

    this.context.authorize('user:delete', user)

    return user.delete()
  }
}

export default UserService
