const express = require('express');
const router = express.Router();
const milkController = require('../controllers/MilkController');

// Production Milk Routes
    router.post('/milk', milkController.create);
    router.get('/milk', milkController.findAll);
    router.get('/milk/:id', milkController.findOne);
    router.put('/milk/:id', milkController.update);
    router.delete('/milk/:id', milkController.delete);

module.exports = router;