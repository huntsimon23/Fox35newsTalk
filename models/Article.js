var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
  },
  link: {
    type: String,
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
  img: {
    type: String,
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
