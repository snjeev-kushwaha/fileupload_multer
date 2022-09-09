const mysql = require("mysql");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");

const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());
const port = 3001;

const connection = mysql.createConnection({
    host: "mysql -u admin -h e-commerce.czlhhsqijzkh.ap-south-1.rds.amazonaws.com -p",
    user: "admin",
    password: "12345678",
    database: "zomato"
})

connection.connect((err) =>{
    if(err){
        console.log(err.sqlMessage)
    }else{
        console.log("connection is connected ::")
    }
})

app.post("/post", async(req,res) =>{
    try{
        let {Email,password} =req.body;
        console.log(Email,password)

        // password hashing
        const salt = await bcrypt.genSalt(8)
        console.log(salt);

        pass = await bcrypt.hash(password, salt)
        password = pass;
        console.log(password)
        
        data = {Email, password}

        let query = "INSERT INTO Login SET ?";
        await connection.query(query, data, (error, result) =>{
            if(error){
                return res.json(error.sqlMessage)
            }
            res.json(result);
        })
    }catch(err){
        res.json({Error: error.sqlMessage})
    }
})

app.post("/login", async(req, res) =>{
    try{
        let {Email, password} = req.body;
      // data = {Email, password}
      let query ="SELECT * from Login WHERE Email =?";
      const value = await connection.query(query, Email, async(error, result) =>{
        if(error){
            return res.json({Error: error.sqlMessage})
        }
        // password compare
     const passwordMatch = await bcrypt.compare(password,result[0].password)
    if(!passwordMatch){
        return res.json({Error:"oops password does not match"})
    }
    // token generate
    const token = await jwt.sign({Email}, "my name is shanu", {expiresIN: '24h'})
    console.log(token)

    res.json({status:200, response:"Login", token})
    })
    // console.log(value)
    }catch(err){
        res.json({Error: error.message})
    }
})

app.get("/alluser", async(req, res) =>{
    try{
        let token = req.header("token")
        let tokenVerify = await jwt.verify(token, "my name is shanu")
        if(!token){
            return res.send({Error: "token does not match"})
        }
        let query = "SELECT * from Login"
        await connection.query(query, (error, output) =>{
            if(error){
                return res.send({Error: error.sqlMessage})
            }
            res.send(output)
        })
    }catch(error){
        res.send({Error: error.message})
    }
})

app.listen(port, (err) =>{
    console.log(`server is connected on port http://localhost:${port}`)
})