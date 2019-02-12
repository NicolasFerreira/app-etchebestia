// var Animal = require("./models/animal");

///////////////////// CREATE ////////////////////////

// Add new post
// app.post('/animals', (req, res) => {
//   var db = req.db;
//   var id_work = req.body.id_work;
//   var id_national = req.body.id_national;
//   var id_user = req.body.id_user;
//   var sexe = req.body.sexe;
//   var id_father = req.body.id_father;
//   var id_mother = req.body.id_mother;
//   var birth_date = req.body.birth_date;
//   var categories = req.body.categories;
//   var comments = req.body.comments;

//   var new_animal = new Animal({
//   id_work: id_work,
//   id_national: id_national,
//   id_user: id_user,
//   sexe: sexe,
//   id_father:id_father,
//   id_mother:id_mother,
//   birth_date: birth_date,
//   categories: categories,
//   comments: comments
//   })


//   new_animal.save(function (error) {
//     if (error) {
//       console.log(error)
//     }
//     res.send({
//       success: true,
//       message: 'Animal saved successfully!'
//     })
//   })
// })

///////////////////// READ ////////////////////////

// Fetch all Animal
// app.get('/animals', (req, res) => {
//   Animal.find({}, 'id_work id_national id_user sexe id_father id_mother birth_date categories comments', function (error, animals) {
//     if (error) { console.error(error); }
//     res.send({
//       animals: animals
//     })
//   }).sort({_id:-1})
// })

///////////////////// UPDATE ////////////////////////

// Fetch single post
// app.get('/animals/:id', (req, res) => {
//   var db = req.db;
//   Animal.findById(req.params.id, 'id_work id_national id_user sexe id_father id_mother birth_date categories comments', function (error, animal) {
//     if (error) { console.error(error); }
//     res.send(animal)
//   })
// })

// Update a post
// app.put('/animals/:id', (req, res) => {
//   var db = req.db;
//   Animal.findById(req.params.id, 'id_work id_national id_user sexe id_father id_mother birth_date categories comments', function (error, animal) {
//     if (error) { console.error(error); }

//     animal.id_work = req.body.id_work
//     animal.id_national = req.body.id_national
//     animal.id_user = req.body.id_user
//     animal.sexe = req.body.sexe
//     animal.id_father = req.body.id_father
//     animal.id_mother = req.body.id_mother
//     animal.birth_date = req.body.birth_date
//     animal.categories = req.body.categories
//     animal.comments = req.body.comments
//     animal.save(function (error) {
//       if (error) {
//         console.log(error)
//       }
//       res.send({
//         success: true
//       })
//     })
//   })
// })


///////////////////// DELETE ////////////////////////
// Delete a post
// app.delete('/animals/:id', (req, res) => {
//   var db = req.db;
//   Animal.remove({
//     _id: req.params.id
//   }, function(err, animal){
//     if (err)
//       res.send(err)
//     res.send({
//       success: true
//     })
//   })
// })