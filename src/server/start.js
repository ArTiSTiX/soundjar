import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'

import config from './config'
import db from './init/database'
import { authenticationMiddleware } from './init/passport'
import webpackMiddleware from './init/webpack'

import routes from './routes'

const port = config.get('server.port', 3000)
const host = config.get('server.host', '127.0.0.1')

const server = express()

server.enable('trust proxy')
server.disable('x-powered-by')

server.use(bodyParser.json())

server.use('/files/sessions', express.static(config.get('storage.sessions')))
server.use('/files/instrumentals', express.static(config.get('storage.instrumentals')))

server.use('/', passport.initialize())
server.use('/', authenticationMiddleware)
server.use('/', routes)
webpackMiddleware(server)

db.sequelize
  .authenticate()
  .then(() =>
    server.listen(port, host, err => {
      if (err) {
        console.error('Cannot create HTTP server', err)
      }
      console.log('Listening...')
    }))
  .catch(err => console.log('Can\'t connect to database', err))

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message)
})


export default server
