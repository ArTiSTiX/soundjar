import { Router } from 'express'

import AuthController from './controllers/auth.controller'
import ApiController from './controllers/api.controller'
import SessionsController from './controllers/sessions.controller'

const routes = new Router()

routes.use('/auth', AuthController)
routes.use('/api', ApiController)
routes.use('/api/sessions', SessionsController)

routes.use('/*', (req, res) => res.status(404).json({ status: 404, message: 'Endpoint not found' }))

export default routes
