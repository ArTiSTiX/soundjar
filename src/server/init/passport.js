import _ from 'lodash'
import { Op } from 'sequelize'
import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as FacebookStrategy } from 'passport-facebook'

import config from '../config'
import { User } from '../models'

/** JWT strategy for authorize to protect routes  */
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: config.get('auth.jwt.secret'),
}

const jwtLogin = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findOne({ where: { fb_id: payload.sub } })
    if (!user) {
      return done(null, false)
    }
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
})

/** Facebook OAuth strategy login */
const facebookOpts = {
  clientID: config.get('auth.facebook.appId'),
  clientSecret: config.get('auth.facebook.secret'),
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'email', 'first_name', 'last_name'],
  passReqToCallback: true,
  proxy: true,
}

const facebookLogin = new FacebookStrategy(
  facebookOpts,
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      if (!req.user) {
        let user = await User.findOne({
          where: {
            [Op.or]: _.concat(
              [
                { fb_id: profile.id },
              ],
              (profile.email
                ? [
                  { email: profile.email },
                ]
                : [])
            ),

          },
        })

        if (!user) {
          user = User.build()
        }

        _.assign(
          user,
          {
            fb_id: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
          },
          (profile.emails ? { email: profile.emails[0].value } : {})
        )

        await user.save()
        return done(null, user)
      }
      return done(null, req.user)
    } catch (error) {
      return done(error, false)
    }
  }
)

/** Apply all login strategy */
passport.use(jwtLogin)
passport.use(facebookLogin)

export const authenticationMiddleware = (req, res, next) =>
  passport.authenticate(
    'jwt',
    { session: false },
    (err, user) => {
      req.user = user
      next()
    }
  )(req, res, next)
