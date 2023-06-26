const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const cardSchema = new Schema({
  card_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  values: {
    type: Array,
    required: true
  },
  file_link: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
}, { collection: 'cards' });
 
module.exports = Card = mongoose.model("Card", cardSchema);