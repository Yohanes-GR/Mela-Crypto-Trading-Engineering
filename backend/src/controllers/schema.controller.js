// importing packages
const pool = require('../configs/db.config')
var fs = require('fs');

async  function createTables (request, response) {
	var sql = fs.readFileSync('schema.sql').toString();
    console.log(sql)
	pool.query(sql, function(err, result){
        if(err){
            console.log('error: ', err);
            process.exit(1);
        }
        process.exit(0);
    });
}

module.exports = {createTables}
