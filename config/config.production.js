const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env

export const database = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  dialect: 'mysql',
}
