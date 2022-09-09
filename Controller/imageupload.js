const con = require("../modal/db");

const getData = async (req, res) =>{
    try{
    let sqlQuery = "SELECT * FROM Imageupload";
    await con.query(sqlQuery, (err, result) =>{
        if(err){
          return res.json({Error: err.message})
        }
        res.json({status:200, "response":result})
    })
}
catch(err){
    res.json({status:400, "response": err.message})
}
}

const postData = async (req, res)=>{
    try{
        let data ={
            id:req.body.id,
            fullname:req.body.fullname,
            phone_no: req.body.phone_no,
            password: req.body.password,
            photo:req.file.filename,
        }
        let sqlQuery = "INSERT INTO Imageupload SET ?";
        await con.query(sqlQuery, data, (err, result) =>{
            if(err){
                return res.json({Error: err.message})
            }
            res.json({status:200, "response":result})
        })
    }
    catch(err){
        console.log({status:400, "reponse":result})
    }
}
module.exports = {getData, postData}