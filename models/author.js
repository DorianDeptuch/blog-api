let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let AuthorSchema = new Schema({
  author: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Author", AuthorSchema);
