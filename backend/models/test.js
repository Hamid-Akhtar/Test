var mongoose = require("mongoose");
var Schema = mongoose.Schema;

testSchema = new Schema({
  title: { type: String, required: true },
  phone: String,
});

module.exports = mongoose.model("Test", testSchema);
