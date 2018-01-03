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
    duration: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    sample_rate: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    bits_per_sample: {
      type: Sequelize.INTEGER,
      allowNull: true,
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

    Audio.belongsTo(db.Track, {
      foreignKey: 'track_id',
      as: 'track',
    })
  }

  toJSON() {
    return {
      id: this.id,
      duration: this.duration,
      sample_rate: this.sample_rate,
      bits_per_sample: this.bits_per_sample,
      channel: this.channel,
      source: this.source ? `/files/sessions/${this.source}` : null,
      mp3: this.mp3 ? `/files/sessions/${this.mp3}` : null,
    }
  }
}
