import Sequelize, { Model } from 'sequelize'

export default class Audio extends Model {
  static options = {
    tableName: 'Audios',
  }

  static fields = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    session_id: { // Id of session
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Sessions',
        key: 'id',
      },
    },
    track_id: { // Id of instrumental
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Tracks',
        key: 'id',
      },
    },
    channel: {
      type: Sequelize.STRING(16),
      allowNull: false,
    },
    source: { // Audio WAV file
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    mp3: { // Audio WAV file
      type: Sequelize.STRING(255),
      allowNull: true,
    },
  }

  static associate(db) {
    Audio.belongsTo(db.Session, {
      foreignKey: 'session_id',
      as: 'session',
    })

    Audio.hasMany(db.Track, {
      foreignKey: 'track_id',
      as: 'track',
    })
  }
}
