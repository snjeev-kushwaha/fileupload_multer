const dotenv = require("dotenv")
dotenv.config({path:".env"});
const express = require("express");
const app = express();
const con = require("./modal/db");

// const process = dotenv.config({path:'.env'});
// console.log(process);

app.use(express.json());

const cors = require("cors");
app.use(cors());
const port = 3001;

// login crud operation
const {userRoutes} = require('./Rouutes/jwtRoutes');
app.use('/user', userRoutes);

app.get('/', (req, res) =>{
    res.send("Hellofrombhpal")
})

// image crud opertion
const {imageRoutes} = require("./Rouutes/imageRouts");
app.use('/', imageRoutes);


app.listen(port, (err) =>{
    console.log(`server is connected is port http://localhost:${port}`)
})