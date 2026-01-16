const mongoose = require('mongoose');
const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  image: String,
  location: String,
  description: String,
  traits: [String]
});
module.exports = mongoose.model('Pet', petSchema);