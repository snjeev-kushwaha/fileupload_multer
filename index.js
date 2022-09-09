// const express = require("express");
// const jwt = require("jsonwebtoken");

// const app = express();

// app.get('/api', (req, res) => {
//     res.json({
//         message:"welcome to the api"
//     });
// });

// app.post('/api/post', varifyToken, (req, res) =>{
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if(err){
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 message: "Post created...",
//                 authData
//             });
//         }
//     });
// }); 

// app.post('/api/login', (req, res) => {
//     // Mock user
//      const user = {
//         id: 1,
//         username: 'Rajkumar',
//         email: 'Rajkumar@gmail.com'
//      }
    
//    jwt.sign({user}, 'secretkey',{expiresIn: '30s'}, (err, token) => {
//     res.json({
//         token
//     });
//    });
// })

// // FORMAT OF TOKEN
// // Authorization: Bearer <access_token>

// // Verify Token 
// function varifyToken(req, res, next) {
//     // Get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if(typeof bearerHeader !== 'undefined') {
//         // Split at the space
//        const bearer = bearerHeader.split(' ')
//        // Get token from array
//        const bearerToken = bearer[1];
//       // Set the token
//        req.token = bearerToken;
//        // Next middleware
//        next();
//     } else {
//         // Foorbidden
//         res.sendStatus(403);
//     }
// }

// app.listen(4000, (err) => {
//     console.log("server is connected on port http://localhost:4000");
// })
