let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserCommentSchema = new Schema({
  username: { type: String, required: true },
  post: { type: Schema.types.ObjectId, ref: "Post", required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("UserComment", UserCommentSchema);
