import { Router } from 'express'
import { NotFound } from './errors'

import AuthController from './controllers/auth.controller'
import ApiController from './controllers/api.controller'
import UsersController from './controllers/users.controller'
import SessionsController from './controllers/sessions.controller'

const routes = new Router()

routes.use('/auth', AuthController)
routes.use('/api', ApiController)
routes.use('/api/users', UsersController)
routes.use('/api/sessions', SessionsController)

routes.use('/api/*', (_req, _res, _next) => { throw new NotFound('Endpoint not found') })
routes.use('/api/*', (err, req, res, _next) => res.api(err))

export default routes
