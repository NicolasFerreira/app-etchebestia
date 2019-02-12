const Campaign = require('../models/CampaignModel');

module.exports = {
  // Create and Save a new campaign
  create: function(req, res) {
    
    var db = req.db;
    var name = req.body.name;
    var date_start = req.body.date_start;
    var date_end = req.body.date_end;
    
    var new_campaign = new Campaign({
      name: name,
      date_start: date_start,
      date_end: date_end,
    })
    
    new_campaign.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'New Campaign saved successfully!',
        data: new_campaign
      })
    })
  },
  
  // Retrieve and return all campaigns from the database.
  findAll: function(req, res) {
    Campaign.find({}, 'name date_start date_end', function (error, campaigns) {
      if (error) { console.error(error); }
      res.send({
        campaigns: campaigns
      })
    }).sort({_id:-1})
  },
  
  // Find a single campaign with a campaignId
  findOne: function(req, res) {
    var db = req.db;
    Campaign.findById(req.params.id, 'name date_start date_end', function (error, campaign) {
      if (error) { console.error(error); }
      res.send(campaign)
    })
  },
  
  // Update a campaign identified by the campaignId in the request
  update: function(req, res) {
    var db = req.db;
    Campaign.findById(req.params.id, 'name date_start date_end', function (error, campaign) {
      if (error) { console.error(error); }
      
      campaign.name = req.body.name;
      campaign.date_start = req.body.date_start;
      campaign.date_end = req.body.date_end;
      campaign.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true,
          message: 'Campaign updated',
          data: campaign
        })
      })
    })
  },
  
  // Delete a campaign with the specified campaignId in the request
  delete: function(req, res) {
    var db = req.db;
    Campaign.remove({
      _id: req.params.id
    }, function(err, campaign){
      if (err)
      res.send(err)
      res.send({
        success: true,
        message: "Campaign deleted",
        data: campaign
      })
    })
  },
  
}
