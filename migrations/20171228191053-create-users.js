export function up(queryInterface, Sequelize) {
  queryInterface.createTable(
    'users',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE },
      deleted_at: { type: Sequelize.DATE },
      fb_id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
      },
      first_name: { type: Sequelize.STRING(32), allowNull: false },
      last_name: { type: Sequelize.STRING(32), allowNull: false },
      status: { type: Sequelize.ENUM('guest', 'invited', 'active', 'admin') },
      email: {
        type: Sequelize.STRING(64),
        allowNull: true,
        unique: true,
      },
    },
    {
      engine: 'InnoDB',
      charset: 'utf8',
    }
  )
}

export function down(queryInterface) {
  return queryInterface.dropTable('users')
}
