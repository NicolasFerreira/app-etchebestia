// file with routes for animals
const express = require('express');
const router = express.Router();
const animalController = require('../controllers/AnimalController');

// Animals Routes
    router.post('/animals', animalController.create);
    router.get('/animals', animalController.findAll);
    router.get('/animals/lambs', animalController.findAllLambs);
    router.get('/animals/sheep', animalController.findAllSheep);
    router.get('/animals/calves', animalController.findAllCalves);
    router.get('/animals/cows', animalController.findAllCows);
    router.get('/animals/:id', animalController.findOne);
    router.put('/animals/:id', animalController.update);
    router.delete('/animals/:id', animalController.delete);


module.exports = router;




