require('dotenv').config();
const { Sequelize } = require('sequelize');
const USERNAME = process.env.POSTGRES_USER_NAME
const PSWD = process.env.POSTGRES_PASSWORD
const DBNAME = process.env.POSTGRES_DATABASE_NAME
const DBPORT = process.env.POSTGRES_PORT

const sequelize = new Sequelize(`postgres://${USERNAME}:${PSWD}@melachallengedatabase.crlafpfc5g5y.us-east-1.rds.amazonaws.com:${DBPORT}/${DBNAME}`);
module.exports = sequelize;
