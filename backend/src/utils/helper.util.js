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