let mongoose = require("mongoose");
let datefns = require("date-fns");
const { format } = datefns;
let Schema = mongoose.Schema;

let UserCommentSchema = new Schema({
  username: { type: String, required: true },
  // post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  postid: { type: String, required: true },
});

UserCommentSchema.virtual("dateFormatted").get(function () {
  // return this.date;
  return format(this.date, "PPpp");
});

module.exports = mongoose.model("UserComment", UserCommentSchema);
