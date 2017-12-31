import Sequelize, { Model } from 'sequelize'

export default class Lyrics extends Model {
  static options = {
    tableName: 'Lyrics',
    name: {
      plural: 'Lyrics',
      singular: 'Lyrics',
    },
  }

  static fields = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: { // Author
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    title: { // Lyrics title
      type: Sequelize.STRING(64),
      allowNull: true,
    },
    content: { // Lyrics Text
      type: Sequelize.TEXT,
      allowNull: true,
    },
  }

  static associate(db) {
    Lyrics.belongsTo(db.User, {
      foreignKey: 'user_id',
      as: 'user',
    })
  }
}
