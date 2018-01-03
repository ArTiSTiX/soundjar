import _ from 'lodash'
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

  toJSON(context) {
    return {
      fb_id: this.fb_id,
      email: context && context.can('user:read-all', this) ? this.email : undefined,
      last_name: this.last_name,
      first_name: this.first_name,
      status: this.status,
      created_at: this.created_at,
    }
  }
}
