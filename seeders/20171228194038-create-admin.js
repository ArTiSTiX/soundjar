export function up(queryInterface) {
  return queryInterface.bulkInsert('users', [
    {
      created_at: new Date(),
      updated_at: new Date(),
      first_name: 'Rémi',
      last_name: 'Jarasson',
      fb_id: '10214446174125139',
      status: 'admin',
    },
  ])
}

export function down() {

}
