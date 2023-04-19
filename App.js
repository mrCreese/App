const mysql = require('mysql2');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')


const app = express();
app.use(cors())
app.use(bodyParser.json())

/* const connection = mysql.createPool({
    host: 'iliade.polliniapp.it',
    user: 'impara',
    database: 'scuola_programmazione'
}) */

const connection = mysql.createPool({
    host: "iliade.polliniapp.it",
    port: 3306,
    user: "impara",
    password: "impara",
    database: "scuola_programmazione",
    connectionLimit: 10,
    });



async function getData(){
    return new Promise((resolve, reject)=>{
        connection.query(
            'SELECT * FROM `table_name`',
            function(err, results) {
             return resolve(results)
            }
        )  
    })
} 




app.get('/',async(req, res) => {
  res.json(await getData());
});

app.post('/',(req, res) => {
 console.log(req.body);
    connection.query("INSERT INTO table_name(UserID, Name, Email, City ) VALUES(" +`"${req.body.id}", "${req.body.name}", "${req.body.email}", "${req.body.city}"`+")",
                      (err,results)=> {
                            if(err) console.log(err);
                            res.end(JSON.stringify(results));              
                      })
     
         
   
})

app.listen(4050, () => console.log('Example app is listening on port 4050.'));