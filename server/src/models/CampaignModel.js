var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CampaignSchema = new Schema({
    name: String,
    date_start: Date,
    date_end: Date,
});

var Campaign = mongoose.model("Campaign", CampaignSchema);
module.exports = Campaign;


//Generate all campaigns 2000 to 2050
/* let tab = [];
for (let i = 0; i < 50; i++) {
  let year = 2000+i;
  let next = year+1;

  tab.push(
    {
      "name": (year)+'-'+(next),
      "date_start": year+"-10-01", 
      "date_end": next+"-09-30",
    }
  )
  
}
console.log(JSON.stringify(tab)) */