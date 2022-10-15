require('dotenv').config();
//const { Sequelize } = require('sequelize');
//const USERNAME = process.env.POSTGRES_USER_NAME
//const PSWD = process.env.POSTGRES_PASSWORD
//const DBNAME = process.env.POSTGRES_DATABASE_NAME
//const DBPORT = process.env.POSTGRES_PORT

//const sequelize = new Sequelize(`postgres://${USERNAME}:${PSWD}@melachallengedatabase.crlafpfc5g5y.us-east-1.rds.amazonaws.com:${DBPORT}/${DBNAME}`);
//module.exports = sequelize;

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'huuser',
  host: 'melachallengedatabase.crlafpfc5g5y.us-east-1.rds.amazonaws.com',
  database: 'hudb',
  schema:'public',
  password: 'hupass',
  port: 5432,
})

module.exports = pool
