var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AnimalSchema = new Schema({
  id_work: String,
  id_temp: String,
  id_national: String,
  id_user: Number,
  type:String,
  sexe: Boolean,
  id_father:String,
  id_mother:String,
  birth_date: Date,
  category: String,
  for_sale: Boolean,
  gestation: Boolean,
  end_gestation_date: Date,
  comments: String
});

var Animal = mongoose.model("Animal", AnimalSchema);
module.exports = Animal;
