var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MilkSchema = new Schema({
  date: Date,
  quantity:Number,
  campaign:String
});

var Milk = mongoose.model("Milk", MilkSchema);
module.exports = Milk;