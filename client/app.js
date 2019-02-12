#!/usr/bin/env node

var express = require('express')
var app = express()
var path = require('path')

app.use('/', express.static(__dirname + '/dist'))

app.get('/*', function (req, res, next) {
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen(process.env.PORT || 8000, function () {
  console.log('Node server listening on port 8000')
})
