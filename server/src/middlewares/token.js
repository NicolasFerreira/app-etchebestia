var jwt = require('jsonwebtoken');

module.exports = {
  validateUser: function(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
    
  },
  verifyToken: function (req, res, next) {
    var token = req.body.token;
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token found.' });
  
    jwt.verify(token, req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Invalid token.'});
      }else {
        return res.status(200).send({ auth: true, message: 'Valid token.'});
      }
    });
  }
}
