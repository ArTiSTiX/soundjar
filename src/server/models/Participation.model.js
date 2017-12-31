import Sequelize, { Model } from 'sequelize'

export default class Participation extends Model {
  static options = {
    tableName: 'Participations',
  }

  static fields = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: { // Id of session
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    session_id: { // Session
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Sessions',
        key: 'id',
      },
    },
    track_id: { // Track in session
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Tracks',
        key: 'id',
      },
    },
    region_id: { // Region in track
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Regions',
        key: 'id',
      },
    },
    role: { // Participation role in jam
      type: Sequelize.STRING(32),
      allowNull: true,
      // TODO: use constants for validation
    },
  }

  static associate(db) {
    Participation.belongsTo(db.Session, {
      foreignKey: 'session_id',
      as: 'session',
    })

    Participation.belongsTo(db.Track, {
      foreignKey: 'track_id',
      as: 'track',
    })

    Participation.belongsTo(db.Region, {
      foreignKey: 'region_id',
      as: 'region',
    })

    Participation.belongsTo(db.User, {
      foreignKey: 'user_id',
      as: 'user',
    })
  }
}
