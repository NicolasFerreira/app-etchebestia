const Milk = require('../models/MilkModel');

module.exports = {
  // Create and Save a new Milk
  create: function(req, res) {
    
    var db = req.db;
    var date = req.body.date;
    var quantity = req.body.quantity;
    var campaign = req.body.campaign;
    
    var new_milk = new Milk({
      date: date,
      quantity: quantity,
      campaign: campaign
    })
    
    
    new_milk.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Production saved successfully!',
        data: new_milk
      })
    })
  },
  
  // Retrieve and return all milkTotal from the database.
  findAll: function(req, res) {
    Milk.find({}, 'date quantity campaign', function (error, milkTotal) {
      if (error) { console.error(error); }
      res.send({
        milkTotal: milkTotal
      })
    }).sort({_id:-1})
  },
  
  // Find a single Milk with a MilkId
  findOne: function(req, res) {
    var db = req.db;
    Milk.findById(req.params.id, 'date quantity campaign', function (error, milk) {
      if (error) { console.error(error); }
      res.send(milk)
    })
  },
  
  // Update a milk identified by the milkId in the request
  update: function(req, res) {
    var db = req.db;
    Milk.findById(req.params.id, 'date quantity campaign', function (error, milk) {
      if (error) { console.error(error); }
      
      milk.date = req.body.date;
      milk.quantity = req.body.quantity;
      milk.campaign = req.body.campaign;
      milk.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true,
          message: 'Production updated',
          data: milk
        })
      })
    })
  },
  
  // Delete a milk with the specified milkId in the request
  delete: function(req, res) {
    var db = req.db;
    Milk.remove({
      _id: req.params.id
    }, function(err, milk){
      if (err)
      res.send(err)
      res.send({
        success: true,
        message: "Production deleted",
        data: milk
      })
    })
  },
  
}
