const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  session_id: {
    type: String,
  },
  deck: {
    type:Array
  },
  listacartas: {
    type:Array
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'user-info' });
 
module.exports = mongoose.model("User", userSchema);