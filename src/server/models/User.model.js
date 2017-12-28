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
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
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
      type: Sequelize.ENUM('guest', 'invited', 'active', 'admin'),
      defaultValue: 'guest',
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

  setProfileFields(profile) {
    this.fb_id = profile.id
    this.first_name = profile.name.givenName
    this.last_name = profile.name.familyName
    if (profile.emails) {
      this.email = profile.emails[0].value
    }
  }

  acceptInvitation() {
    if (this.status === 'invited') {
      this.status = 'active'
    }
  }
}
