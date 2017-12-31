import Sequelize, { Model } from 'sequelize'

export default class Region extends Model {
  static options = {
    tableName: 'Regions',
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
    track_id: { // Start date of session
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Track',
        key: 'id',
      },
    },
    lyrics_id: { // Lyrics
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Lyrics',
        key: 'id',
      },
    },
    start: { // Start of region in seconds
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    end: { // End of region in seconds
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  }

  static associate(db) {
    Region.belongsToMany(db.User, {
      as: 'users',
      through: db.Participation,
      foreignKey: 'region_id',
      otherKey: 'user_id',
    })

    Region.hasMany(db.Participation, {
      foreignKey: 'region_id',
      as: 'participations',
    })

    Region.belongsTo(db.Session, {
      foreignKey: 'session_id',
      as: 'session',
    })

    Region.belongsTo(db.Track, {
      foreignKey: 'track_id',
      as: 'track',
    })

    Region.belongsTo(db.Lyrics, {
      foreignKey: 'lyrics_id',
      as: 'lyrics',
    })
  }
}
