const express = require("express");

const imageRoutes = express.Router();
const multer = require("multer");
const {getData, postData} = require("../Controller/imageupload");
const path = require('path');

const storage = multer.diskStorage({
   destination:"./src/image/",
   filename:(req, file, cb)=>{
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
   }
})
const upload = multer({
    storage: storage
})
imageRoutes.get("/image", getData);
imageRoutes.post("/image", upload.single("photo"), postData);

module.exports = {imageRoutes}