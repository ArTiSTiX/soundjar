export function up(queryInterface, Sequelize) {
  queryInterface.createTable(
    'tracks',
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
      instrumental_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Instrumentals',
          key: 'id',
        },
      },
      title: { type: Sequelize.STRING(64), allowNull: true },
      start_at: { type: Sequelize.DATE },
      duration: { type: Sequelize.INTEGER },
      tempo: { type: Sequelize.FLOAT },
      scale: { type: Sequelize.STRING(16) },
    },
    {
      engine: 'InnoDB',
      charset: 'utf8',
    }
  )
}

export function down(queryInterface) {
  return queryInterface.dropTable('tracks')
}
