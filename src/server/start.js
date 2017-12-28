import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'

import config from './config'
import db from './init/database'
import { authenticationMiddleware } from './init/passport'

import routes from './routes'

const port = config.get('servcer.port', 3000)
const host = config.get('servcer.host', '127.0.0.1')

const server = express()

server.enable('trust proxy')
server.disable('x-powered-by')

server.use(bodyParser.json())

server.use('/', passport.initialize())
server.use('/', authenticationMiddleware)
server.use('/', routes)

db.sequelize
  .sync()
  .then(() => server.listen(port, host, err => {
    if (err) { console.error('Cannot create HTTP server', err) }
    console.log('Listening...')
  }))
  .catch(err => console.log('Can\'t connect to database', err))

export default server
