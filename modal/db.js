const mysql = require("mysql");

let con= mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_database
})

con.connect((err) => {
   if(err){
    console.log(err.sqlMessage)
   }else{
    console.log("MYSQL connected ")
   }
})

module.exports = con;