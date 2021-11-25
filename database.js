<<<<<<< HEAD
const pgp = require('pg-promise')()

const{DB_USER,
    DB_PASS,
    DB_HOST,
    DB_PORT,
    DB_DATABASE} = process.env

    const cn = `postgres://postgres:123456@localhost:5432/db_movies`

    const db = pgp(cn)

    module.exports = db
=======
const pgp = require("pg-promise")();

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const connectionString = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const db = pgp(connectionString);

module.exports = db;
>>>>>>> e87ffcf6d7dc6fe91a7a0ef0ab65b151bfa71f45
