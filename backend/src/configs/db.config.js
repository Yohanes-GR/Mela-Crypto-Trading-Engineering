const Pool = require('pg').Pool
require('dotenv').config();
const { Sequelize } = require('sequelize');

const USERNAME = process.env.POSTGRES_USER_NAME
const PSWD = process.env.POSTGRES_PASSWORD
const DBNAME = process.env.POSTGRES_DATABASE_NAME
const SCHEMA_NAME = process.env.SECRET_SCHEMA
const DBPORT = process.env.POSTGRES_PORT


const sequelize = new Sequelize(`postgres://${USERNAME}:${PSWD}@melachallengedatabase.crlafpfc5g5y.us-east-1.rds.amazonaws.com:${DBPORT}/${DBNAME}`);

const pool = new Pool({
  user: USERNAME,
  host: 'melachallengedatabase.crlafpfc5g5y.us-east-1.rds.amazonaws.com',
  database: DBNAME,
  schema:SCHEMA_NAME,
  password: PSWD,
  port: DBPORT
})

module.exports = {
  pool,
  sequelize
}
