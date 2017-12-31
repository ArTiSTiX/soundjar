import Sequelize, { Model } from 'sequelize'

export default class Instrumental extends Model {
  static options = {
    tableName: 'Instrumentals',
  }

  static fields = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: { // Instrumental title
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    artist: { // Instrumental author
      type: Sequelize.STRING(32),
      allowNull: true,
    },
    source: { // Source file in mp3
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    url: { // Youtube URL
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    tempo: { // BPM
      type: Sequelize.FLOAT,
    },
    scale: { // Music scale
      type: Sequelize.STRING(16),
    },
  }

  static associate(db) {
    Instrumental.hasMany(db.Track, {
      foreignKey: 'instrumental_id',
      as: 'tracks',
    })
  }
}
