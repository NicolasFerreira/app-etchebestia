const express = require('express');
const router = express.Router();
const areaController = require('../controllers/AreaController');

// Production area Routes
    router.post('/areas', areaController.create);
    router.get('/areas', areaController.findAll);
    router.get('/areas/:id', areaController.findOne);
    router.put('/areas/:id', areaController.update);
    router.delete('/areas/:id', areaController.delete);

    router.put('/areas/prod/push/:id', areaController.createProd);
    router.put('/areas/prod/pull/:id', areaController.deleteProd);

module.exports = router;