const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const cardSchema = new Schema({
  card_id: String,
  name: String,
  values: Array,
  file_link: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
}, { collection: 'cards' });
 
module.exports = mongoose.model("Card", cardSchema);