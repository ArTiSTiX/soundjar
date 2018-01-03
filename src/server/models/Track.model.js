import _ from 'lodash'
import Sequelize, { Model } from 'sequelize'

export default class Track extends Model {
  static options = {
    tableName: 'Tracks',
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
    instrumental_id: { // Id of instrumental
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Instrumentals',
        key: 'id',
      },
    },
    title: { // Track title
      type: Sequelize.STRING(64),
      allowNull: true,
    },
    start_at: { // Date of track beginning
      type: Sequelize.DATE,
      allowNull: false,
    },
    duration: { // Time length in seconds
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tempo: { // BPM
      type: Sequelize.FLOAT,
    },
    scale: { // Music scale
      type: Sequelize.STRING(16),
    },
    render: {
      type: Sequelize.VIRTUAL,
      get: function getRenderAudio() {
        const audios = this.get('audios') || []
        return _.find(audios, { channel: 'render' }) || _.find(audios, { channel: 'master' })
      },
    },
  }

  static associate(db) {
    Track.hasMany(db.Audio, {
      foreignKey: 'track_id',
      as: 'audios',
    })

    Track.hasMany(db.Region, {
      foreignKey: 'track_id',
      as: 'regions',
    })
  }

  toJSON(context) {
    return {
      title: this.title,
      start_at: this.start_at,
      duration: this.duration,
      tempo: this.tempo,
      scale: this.scale,
      render: this.render,
      audios: context && context.can('track:read-audio', this) ? this.audios : undefined,
    }
  }
}
