const pgp = require('pg-promise')()

const{DB_USER,
    DB_PASS,
    DB_HOST,
    DB_PORT,
    DB_DATABASE} = process.env

    const cn = `postgres://postgres:123456@localhost:5432/db_movies`

    const db = pgp(cn)

    module.exports = db