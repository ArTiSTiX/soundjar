import { Router } from 'express'

import AuthController from './controllers/auth.controller'

const routes = new Router()

routes.use('/auth', AuthController)

routes.use('/*', (req, res) => {
  if (req.user) {
    return res.json({ isAuthenticated: true, user: req.user })
  }
  return res.json({ isAuthenticated: false, message: 'Coucou' })
})

export default routes
