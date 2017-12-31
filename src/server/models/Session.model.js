import Sequelize, { Model } from 'sequelize'

export default class Session extends Model {
  static options = {
    tableName: 'Sessions',
  }

  static fields = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    directory: { // FS Path to session directory
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    title: { // Album title
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    artist: { // Album artist
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    cover: { // Album tumbnail and cover
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    start_at: { // Start date of session
      type: Sequelize.DATE,
    },
    end_at: { // End date of session
      type: Sequelize.DATE,
    },
  }

  static associate(db) {
    Session.hasMany(db.Track, {
      foreignKey: 'session_id',
      as: 'tracks',
    })

    Session.hasMany(db.File, {
      foreignKey: 'session_id',
      as: 'files',
    })
  }
}
