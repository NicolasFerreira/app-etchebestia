const Area = require('../models/AreaModel');


module.exports = {
  // Create and Save a new Area
  create: function(req, res) {
    
    var db = req.db;
    var name = req.body.name;
    var type = req.body.type;
    var culture = req.body.culture;
    var surface = req.body.surface;
    var description = req.body.description;
    var date = req.body.date;
    var coords = req.body.coords;
    var productivity = req.body.productivity;
    
    var new_area = new Area({
      name: name,
      type: type,
      culture: culture,
      surface: surface,
      description: description,
      date: date,
      coords: coords,
      productivity: productivity
    })
    
    
    new_area.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: new_area.type + ' saved successfully!',
        data: new_area
      })
    })
  },
  
  // Retrieve and return all areas from the database.
  findAll: function(req, res) {
    Area.find({}, 'name type culture surface description date coords productivity', function (error, areas) {
      if (error) { console.error(error); }
      res.send({
        areas: areas
      })
    }).sort({_id:-1})
  },
  
  // Find a single area with a areaId
  findOne: function(req, res) {
    var db = req.db;
    Area.findById(req.params.id, 'name type culture surface description date coords productivity', function (error, area) {
      if (error) { console.error(error); }
      res.send(area)
    })
  },
  
  // Update a area identified by the areaId in the request
  update: function(req, res) {
    var db = req.db;
    Area.findById(req.params.id, 'name type culture surface description date coords productivity', function (error, area) {
      if (error) { console.error(error); }
      
      area.name = req.body.name;
      area.type = req.body.type;
      area.culture = req.body.culture;
      area.surface = req.body.surface;
      area.description = req.body.description;
      area.date = req.body.date;
      area.coords = req.body.coords;
      area.productivity = req.body.productivity;
      area.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true,
          message: area.type + ' updated',
          data: area
        })
      })
    })
  },
  
  // Delete a area with the specified areaId in the request
  delete: function(req, res) {
    var db = req.db;
    Area.remove({
      _id: req.params.id
    }, function(err, area){
      if (err)
      res.send(err)
      res.send({
        success: true,
        message: area.type + ' deleted',
        data: area
      })
    })
  },

  // productivity part
  createProd: function(req, res) {
    Area.update({ _id: req.params.id}, { $push: { productivity: [req.body.productivity] }}, function(err, values) {
      if (!err) {
        res.json("okay");
      } else {
        res.write("fail");
      }
    })
  },

  deleteProd: function(req, res) {
    Area.update({ _id: req.params.id}, { $pull: {'productivity':{ _id: [req.body.id] }}}, function(err, prod) {
      if (!err) {
        res.send({
          success: true,
          message: prod._id + ' deleted',
          data: prod
        })
      } else {
        res.write("fail");
      }
    })
  },
  
}
