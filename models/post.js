let mongoose = require("mongoose");
let datefns = require("date-fns");
const { format } = datefns;
let Schema = mongoose.Schema;

let PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  published: { type: Boolean, default: false },
  image: { type: String },
  // author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  author: { type: String, required: true },
  comments: [Object],
});

PostSchema.virtual("url").get(function () {
  return "/posts/" + this._id;
});

PostSchema.virtual("dateFormatted").get(function () {
  // return this.date;
  return format(this.date, "PPpp");
});

module.exports = mongoose.model("Post", PostSchema);
