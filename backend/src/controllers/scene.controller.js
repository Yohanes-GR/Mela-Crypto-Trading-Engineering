// importing packages
const pool = require('../configs/db.config')
const produce = require("../kafka/kafka.producer")

async function handleScene(request, response) {
  const {id, from_date,to_date,indicator_id} = request.body

  //check if the scene exist
pool.query('SELECT * FROM scene WHERE (from_date = $1 and to_date = $2 and indicator_id = $3)',[from_date,to_date,indicator_id],(error,result)=>{
   if (result.rowCount == 0){
     //if not publish rscene
        produce(id, from_date,to_date,indicator_id).catch((err) => {
            console.error("error in producer: ", err)
          })
   }else{
    scene_id = result.rows[0].id
    pool.query('SELECT * FROM backtest_metrics  WHERE scene_id = $1', [scene_id], (error, get_results) => {
        if (get_results.rowCount == 0) {
           //publisch the scene
           produce(id, from_date,to_date,indicator_id).catch((err) => {
            console.error("error in producer: ", err)
          })
        }
        else{
          response.status(200).json(get_results.rows)          
        }
        });
   } 
  }) 
}

module.exports = {handleScene}
