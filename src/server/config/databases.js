import { database as defaultConfig } from './config.default'
import { database as productionConfig } from './config.production'
import { database as developmentConfig } from './config.development'
import { database as localConfig } from './config.local'

const production = { ...defaultConfig, ...productionConfig }
const development = { ...defaultConfig, ...developmentConfig }
const local = { ...defaultConfig, ...localConfig }

export { production, development, local }
