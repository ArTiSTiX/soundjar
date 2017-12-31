import { Router } from 'express'

import ContextService from '../services/Context.service'

const routes = new Router()

function initialize(req, res, next) {
  req.local = {}
  req.local.context = new ContextService('api', req.user)
  return next()
}

routes.all('/*', initialize)

export default routes
