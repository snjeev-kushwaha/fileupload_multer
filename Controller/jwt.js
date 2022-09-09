const con = require('../modal/db');
const bcrypt = require('bcrypt');
// console.log(bcrypt);
const jwt = require('jsonwebtoken');

let userRegister = async (req, res) =>{
    try{
        // destructure
        let { fullname, email, phone_no,password} = req.body;
        // console.log(fullname, email, phone_no,password )
        const Salt = await bcrypt.genSalt(8);
        // console.log("generate salt",Salt)
        // console.log("password before hash",password)
        let hashPassword = bcrypt.hashSync(password, Salt);
        // console.log("password before hash", hashPassword)
        password = hashPassword
        // structure
        let data = { fullname, email, phone_no, password}
        let sqlQuery = "INSERT INTO user SET ?";
        await con.query(sqlQuery, data, (err, result) =>{
            if(err){
                return res.json({Error: err.message});
            }
            res.json({status: 200, "response": result});
        })
        // database store
    }
    catch(err){
        res.json({status: 400, response:err.message});
    }
}


let userLogin = async (req, res) =>{
    try{
      let{email, phone_no,password} = req.body;
      let sqlQuery = `SELECT * FROM user WHERE email ="${email}" OR phone_no ="${phone_no}"`
      await con.query(sqlQuery, async (err, result) =>{
        if(err){
            return res.json({Error: err.message})
        }
    //    console.log(result)
    if(result === [] || result == undefined){
        return res.json({response:"Email id or the phone number doesn't exists"})
    }
       // conditional statement if /else
    //    const userres = result[0].password
    //    // password check
       const passwordCheck = await bcrypt.compare(password, userres);
       if(!passwordCheck){
        return res.json({Error: "oops wrong password"});
       }
      const token = await jwt.sign({email},process.env.jwt_SECRET_KEY, {expiresIn:"1d"})
    //    console.log(respon)
       res.json({status: 200, response:"logged in successfully", token})
        // res.json({status:200, "response":result})
      })
    }catch(err){
        res.json({status:400, "response":err.message})
    }
} 

module.exports = {userRegister, userLogin}