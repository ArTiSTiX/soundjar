import bluebird from 'bluebird'
import moment from 'moment'
import config from '../config'

bluebird.config(config.get('bluebird'))
moment.locale('fr')

global.Promise = bluebird
