import { Router } from 'express'
import passport from 'passport'

export const authFacebook = passport.authenticate('facebook', { scope: 'email' })
export const authFacebookCallback = passport.authenticate('facebook', { session: false })

const routes = new Router()

function sendToken(req, res) {
  return res.json({ token: req.user.createToken() })
}

/** Facebook authenication routes */
routes.get('/facebook', authFacebook)
routes.get(
  '/facebook/callback',
  [
    authFacebookCallback,
    sendToken,
  ]
)

export default routes
