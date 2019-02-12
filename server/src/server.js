#!/usr/bin/env node

//import dependencies
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
const app = express();

//import routes
const users = require('./routes/UserRoute');
const animals = require('./routes/AnimalRoute');
const milk = require('./routes/MilkRoute');
const campaigns = require('./routes/CampaignRoute');
const areas = require('./routes/AreaRoute');

//import middlewares (token)
const token = require('./middlewares/token');

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(cors())


//jwt secret token
app.set('secretKey', 'changeByYourSecretKeyOfYourChoice');

// Welcome message when go on the / 
app.get('/', function(req, res){
res.json({"welcome" : "Etchebstia REST API "});
});

// public route
app.use('/users', users);
app.post('/check',token.verifyToken); // test pour voir si le token est valide

// private route
app.use('/',token.validateUser, animals);
app.use('/',token.validateUser, milk);
app.use('/',token.validateUser, campaigns);
app.use('/',token.validateUser, areas);


// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Something looks wrong :( !!!"});

});

app.listen(process.env.PORT || 3000, function(){
 console.log('Node server listening on port 3000');
});

