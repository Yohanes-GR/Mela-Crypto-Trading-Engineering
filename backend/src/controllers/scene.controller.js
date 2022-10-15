// importing packages
const pool = require('../configs/db.config')

async function handleScene(request, response) {
  const {id, from_date,to_date,indicator_id} = request.body

  //check if the scene exist
pool.query('SELECT * FROM scene WHERE (from_date = $1 and to_date = $2 and indicator_id = $3)',[from_date,to_date,indicator_id],(error,result)=>{
   if (result.rowCount == 0){
     //if not publish rscene
        pool.query('INSERT INTO scene VALUES ($1, $2, $3, $4) RETURNING *', [id, from_date,to_date,indicator_id], (error, insert_result) => {
        if (error) {
            throw error
        }
            response.status(201).send(`User added with ID: ${insert_result.rows[0].id}`)
        })
   }else{
    scene_id = result.rows[0].id
    pool.query('SELECT * FROM backtest_metrics  WHERE scene_id = $1', [scene_id], (error, get_results) => {
        if (get_results.rowCount == 0) {
           //publisch the scene
        }
        else{
          console.log(get_results)
          response.status(201).send(`User added with ID: ${get_results.rows[0].id}`)
        }
        });
   } 
  }) 
}

module.exports = {handleScene}
