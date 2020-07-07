var mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
  url: String,
  key: String,
  bucket:String

});

Image = mongoose.model("Image",imageSchema);

module.exports = Image;
