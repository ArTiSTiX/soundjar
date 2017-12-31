export function up(queryInterface, Sequelize) {
  queryInterface.createTable(
    'regions',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE },
      session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Sessions',
          key: 'id',
        },
      },
      track_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tracks',
          key: 'id',
        },
      },
      lyrics_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Lyrics',
          key: 'id',
        },
      },
      start: { type: Sequelize.FLOAT },
      end: { type: Sequelize.FLOAT },
    },
    {
      engine: 'InnoDB',
      charset: 'utf8',
    }
  )
}

export function down(queryInterface) {
  return queryInterface.dropTable('regions')
}
