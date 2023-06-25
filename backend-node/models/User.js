const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  session: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'user-info' });
 
module.exports = mongoose.model("User", userSchema);