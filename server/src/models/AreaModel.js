var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AreaSchema = new Schema({
  name: String,
  type: String,
  culture: String,
  surface: Number,
  description: String,
  date: Date,
  coords:[[ Number, Number ]],
  productivity: [{balls: Number, date: Date}]
});

var Area = mongoose.model("Area", AreaSchema);
module.exports = Area;