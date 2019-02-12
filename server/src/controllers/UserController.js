var userModel = require('../models/UserModel');
var bcrypt = require('bcrypt'); 
var jwt = require('jsonwebtoken');

module.exports = {
  create: function(req, res, next) {
    userModel.create({ name: 'public', password: 'public' }, function (err, result) {
      if (err) 
      next(err);
      else
      res.json({status: "success", message: "User added successfully!!!", data: null});    
    });
  },
  
  authenticate: function(req, res, next) {
    userModel.findOne({name:req.body.name}, function(err, userInfo){
      if (err) {
        next(err);
      } else {     
        if(userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {       
          var token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '24h' });         
          res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});         
        }else{          
          res.json({status:"error", message: "Invalid name/password!!!", data:null});         
        }  
      }
    });
  }
}



// const bcrypt = require("bcrypt");
// const User = require("../models/UserModel");
// const jwt = require("jsonwebtoken");

// exports.signup = (req, res) => {
//   User.find({ login: req.body.login })
//   .exec()
//   .then(user => {
//     if (user.length >= 1) {
//       return res.status(409).json({
//         message: "Login exists"
//       });
//     } else {
//       bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err) {
//           return res.status(500).json({
//             error: err
//           });
//         } else {
//           const new_user = new User({
//             login: req.body.login,
//             password: hash
//           });
//           new_user
//           .save()
//           .then(result => {
//             console.log(result);
//             res.status(201).json({
//               message: "User created"
//             });
//           })
//           .catch(err => {
//             console.log(err);
//             res.status(500).json({
//               error: err
//             });
//           });
//         }
//       });
//     }
//   });
// };

// exports.login = (req , res) => {
//   const JWT_KEY = "secret";
//   User.find({ login: req.body.login })
//   .exec()
//   .then(user => {
//     if (user.length < 1) {
//       return res.status(401).json({
//         message: "Auth failed"
//       });
//     }
//     bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//       if (err) {
//         return res.status(401).json({
//           message: "Auth failed"
//         });
//       }
//       if (result) {
//         const token = jwt.sign(
//         {
//           login: user[0].login,
//           userId: user[0]._id
//         },
//         process.env.JWT_KEY,
//         {
//           expiresIn: "1h"
//         }
//         );
//         return res.status(200).json({
//           message: "Auth successful",
//           token: token
//         });
//       }
//       res.status(401).json({
//         message: "Auth failed"
//       });
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({
//       error: err
//     });
//   });
// }

// exports.delete = (req, res) => {
//   User.remove({ _id: req.params.id })
//   .exec()
//   .then(result => {
//     res.status(200).json({
//       message: "User deleted"
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({
//       error: err
//     });
//   });
// };
