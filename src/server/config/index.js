import _ from 'lodash'

class ConfigurationNotFound extends Error {}

const { NODE_ENV: env = 'local' } = process.env

console.log(`Using ENV = ${env}`)

let config = require('./config.default')

try {
  config = _.extend(config, require(`./config.${env}`)) // eslint-disable-line global-require
} catch (err) {
  throw new ConfigurationNotFound(`Configuration for ${env} environment not found`)
}

const get = (path, defaultValue) => {
  const value = _.get(config, path)
  return _.cloneDeep(value || defaultValue)
}

export default { env, get }
