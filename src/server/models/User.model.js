import Sequelize, { Model } from 'sequelize'
import jwt from 'jsonwebtoken'

import config from '../config'

export default class User extends Model {
  static options = {
    tableName: 'Users',
  }

  static fields = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    fb_id: {
      type: Sequelize.STRING,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    status: {
      type: Sequelize.ENUM('invited', 'active'),
      defaultValue: 'invited',
    },
  }

  createToken() {
    return jwt.sign(
      {
        sub: this.fb_id,
        expiresIn: config.get('auth.jwt.sign.expiresIn'),
        issuer: config.get('auth.jwt.sign.issuer'),
      },
      config.get('auth.jwt.secret')
    )
  }
}
