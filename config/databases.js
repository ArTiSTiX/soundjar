import { database as defaultConfig } from './config.default'
import { database as productionConfig } from './config.production'
import { database as developmentConfig } from './config.development'
import { database as localConfig } from './config.local'

const production = { ...defaultConfig, ...productionConfig, define: { ...defaultConfig.define, rejectOnEmpty: false } }
const development = { ...defaultConfig, ...developmentConfig, define: { ...defaultConfig.define, rejectOnEmpty: false } }
const local = { ...defaultConfig, ...localConfig, define: { ...defaultConfig.define, rejectOnEmpty: false } }

export { production, development, local }
