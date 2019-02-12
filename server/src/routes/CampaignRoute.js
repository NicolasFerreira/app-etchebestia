const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/CampaignController');

// Production campaign Routes
    router.post('/campaigns', campaignController.create);
    router.get('/campaigns', campaignController.findAll);
    router.get('/campaigns/:id', campaignController.findOne);
    router.put('/campaigns/:id', campaignController.update);
    router.delete('/campaigns/:id', campaignController.delete);

module.exports = router;