// importing packages
const pool = require('../configs/db.config')

async  function getIndicator (request, response) {
	const id = parseInt(request.params.id)
	pool.query('SELECT * FROM indicator', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
async  function postIndicatorParam (request, response) {
	 const {id,param_name,from,to,indicator_id} = request.body
	pool.query('INSERT INTO indicator_param VALUES ($1,$2,$3,$4,$5) RETURNING *',[id,param_name,from,to,indicator_id], (error, results) => {
        if (error) {
            throw error
        }
            response.status(201).send(`User added with ID: ${results.rows[0].id}`)
        })
}
async  function postIndicator (request, response) {
	 const {id, name} = request.body
	pool.query('INSERT INTO indicator (name) VALUES ($1) RETURNING *',[name], (error, results) => {
        if (error) {
            throw error
        }
            response.status(201).send(`User added with ID: ${results.rows[0].id}`)
        })
}


module.exports = {getIndicator,postIndicatorParam,postIndicator}