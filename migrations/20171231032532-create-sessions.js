export function up(queryInterface, Sequelize) {
  queryInterface.createTable(
    'sessions',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE },
      directory: { type: Sequelize.STRING(255) },
      title: { type: Sequelize.STRING(64), allowNull: false },
      artist: { type: Sequelize.STRING(32), allowNull: false },
      cover: { type: Sequelize.STRING(255) },
      start_at: { type: Sequelize.DATE },
      end_at: { type: Sequelize.DATE },
    },
    {
      engine: 'InnoDB',
      charset: 'utf8',
    }
  )
}

export function down(queryInterface) {
  return queryInterface.dropTable('sessions')
}
