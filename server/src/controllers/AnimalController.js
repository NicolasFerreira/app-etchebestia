const Animal = require('../models/AnimalModel');

module.exports = {
	// Create and Save a new animal
	create: function(req, res) {
		
		var db = req.db;
		var id_work = req.body.id_work;
		var id_temp = req.body.id_temp;
		var id_national = req.body.id_national;
		var id_user = req.body.id_user;
		var type = req.body.type;
		var sexe = req.body.sexe;
		var id_father = req.body.id_father;
		var id_mother = req.body.id_mother;
		var birth_date = req.body.birth_date;
		var category = req.body.category;
		var for_sale = req.body.for_sale;
		var gestation = req.body.gestation;
		var end_gestation_date = req.body.end_gestation_date;
		var comments = req.body.comments;
		
		var new_animal = new Animal({
			id_work: id_work,
			id_temp: id_temp,
			id_national: id_national,
			id_user: id_user,
			type: type,
			sexe: sexe,
			id_father:id_father,
			id_mother:id_mother,
			birth_date: birth_date,
			category: category,
			for_sale: for_sale,
			gestation: gestation,
			end_gestation_date: end_gestation_date,
			comments: comments	
		})
		
		new_animal.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true,
				message: 'Animal saved successfully!'
			})
		})
	},
	
	// Retrieve and return all animals from the database.
	findAll: function(req, res) {
		Animal.find({}, 'id_work id_temp id_national id_user type sexe id_father id_mother birth_date category for_sale gestation end_gestation_date comments', function (error, animals) {
			if (error) { console.error(error); }
			res.send({
				animals: animals
			})
		}).sort({_id:+1})
	},
	
	
	// Sort Lambs request 
	findAllLambs: function(req, res) {
		Animal.find({type:"lamb"}, 'id_work id_temp id_national id_user type sexe id_father id_mother birth_date category for_sale gestation end_gestation_date comments', function (error, animals) {
			if (error) { console.error(error); }
			res.send({
				animals: animals
			})
		}).sort({id_temp:+1})
	},
	
	// Sort Sheep request 
	findAllSheep: function(req, res) {
		Animal.find({type:"sheep"}, 'id_work id_temp id_national id_user type sexe id_father id_mother birth_date category for_sale gestation end_gestation_date comments', function (error, animals) {
			if (error) { console.error(error); }
			res.send({
				animals: animals
			})
		}).sort({id_temp:+1})
	},

	// Sort Calves request 
	findAllCalves: function(req, res) {
		Animal.find({type:"calve"}, 'id_work id_temp id_national id_user type sexe id_father id_mother birth_date category for_sale gestation end_gestation_date comments', function (error, animals) {
			if (error) { console.error(error); }
			res.send({
				animals: animals
			})
		}).sort({id_temp:+1})
	},

	// Sort Cows request 
	findAllCows: function(req, res) {
		Animal.find({type:"cow"}, 'id_work id_temp id_national id_user type sexe id_father id_mother birth_date category for_sale gestation end_gestation_date comments', function (error, animals) {
			if (error) { console.error(error); }
			res.send({
				animals: animals
			})
		}).sort({id_temp:+1})
	},
	
	// Find a single animal with a animalId
	findOne: function(req, res) {
		var db = req.db;
		Animal.findById(req.params.id, 'id_work id_temp id_national id_user type sexe id_father id_mother birth_date category for_sale gestation end_gestation_date comments', function (error, animal) {
			if (error) { console.error(error); }
			res.send(animal)
		})
	},
	
	// Update a animal identified by the animalId in the request
	update: function(req, res) {
		var db = req.db;
		Animal.findById(req.params.id, 'id_work id_temp id_national id_user type sexe id_father id_mother birth_date category for_sale gestation end_gestation_date comments', function (error, animal) {
			if (error) { console.error(error); }
			
			animal.id_work = req.body.id_work;
			animal.id_temp = req.body.id_temp;
			animal.id_national = req.body.id_national;
			animal.id_user = req.body.id_user
			animal.type = req.body.type
			animal.sexe = req.body.sexe
			animal.id_father = req.body.id_father
			animal.id_mother = req.body.id_mother
			animal.birth_date = req.body.birth_date
			animal.for_sale = req.body.for_sale
			animal.category = req.body.category
			animal.comments = req.body.comments
			animal.save(function (error) {
				if (error) {
					console.log(error)
				}
				res.send({
					success: true
				})
			})
		})
	},
	
	// Delete a animal with the specified animalId in the request
	delete: function(req, res) {
		var db = req.db;
		Animal.remove({
			_id: req.params.id
		}, function(err, animal){
			if (err)
			res.send(err)
			res.send({
				success: true,
				message: animal
			})
		})
	},
	
}
