import Sequelize from 'sequelize'

import config from '../config'
import models from '../models'

Sequelize.Promise = global.Promise

const sequelize = new Sequelize(config.get('database'))
const db = {}

Object.keys(models).forEach(name => {
  const modelClass = models[name]
  const model = modelClass.init(
    modelClass.fields,
    {
      sequelize,
      ...modelClass.options,
    }
  )
  db[model.name] = model
})

Object.keys(models).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
