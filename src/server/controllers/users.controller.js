import { Router } from 'express'
import { Unauthorized } from '../errors'
import UserService from '../services/User.service'

const routes = new Router()

function initialize(req, res, next) {
  req.local.userService = new UserService(req.local.context)
  return next()
}

async function populateUser(req, res, next) {
  const { local: { userService }, params: { userId } } = req
  try {
    if (userId === 'me') {
      if (!req.user) {
        throw new Unauthorized()
      }
      req.local.user = req.user
    } else {
      req.local.user = await userService.get(userId)
    }
    return next()
  } catch (err) {
    return next(err)
  }
}

function list(req, res) {
  const { local: { userService }, query } = req
  return res.api(userService.list(query))
}

function detail(req, res) {
  return res.api(req.local.user)
}

routes.all('/*', initialize)
routes.param('userId', populateUser)

routes.get('/', list)
routes.get('/:userId', detail)

export default routes
