import { Router } from 'express'

import SessionService from '../services/Session.service'

const routes = new Router()

function initialize(req, res, next) {
  req.local.sessionService = new SessionService(req.local.context)
  return next()
}

async function populateSession(req, res, next) {
  const { local: { sessionService }, params: { sessionId } } = req
  req.local.session = await sessionService.get(sessionId)
  return next()
}

function list(req, res) {
  const { local: { sessionService }, query } = req
  return res.api(sessionService.list(query))
}

function detail(req, res) {
  const { local: { sessionService }, params: { id } } = req
  return res.api(sessionService.detail(id))
}

routes.all('/*', initialize)
routes.param('sessionId', populateSession)

routes.get('/', list)
routes.get('/:id', detail)

export default routes
