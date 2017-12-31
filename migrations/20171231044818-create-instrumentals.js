export function up(queryInterface, Sequelize) {
  queryInterface.createTable(
    'instrumentals',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE },
      title: { type: Sequelize.STRING(64) },
      artist: { type: Sequelize.STRING(32) },
      source: { type: Sequelize.STRING(255) },
      url: { type: Sequelize.STRING(255) },
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
  return queryInterface.dropTable('instrumentals')
}
