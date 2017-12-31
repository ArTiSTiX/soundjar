export function up(queryInterface, Sequelize) {
  queryInterface.createTable(
    'audios',
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
      duration: { type: Sequelize.FLOAT, allowNull: true },
      bits_per_sample: { type: Sequelize.INTEGER, allowNull: true },
      sample_rate: { type: Sequelize.INTEGER, allowNull: true },
      channel: { type: Sequelize.STRING(16), allowNull: false },
      source: { type: Sequelize.STRING(255), allowNull: true },
      mp3: { type: Sequelize.STRING(255), allowNull: true },
    },
    {
      engine: 'InnoDB',
      charset: 'utf8',
    }
  )
}

export function down(queryInterface) {
  return queryInterface.dropTable('audios')
}
