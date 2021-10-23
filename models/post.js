let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  published: { type: Boolean, default: false },
});

PostSchema.virtual("url").get(function () {
  return "/posts/" + this._id;
});

module.exports = mongoose.model("Post", PostSchema);
