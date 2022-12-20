const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
user: {
    type:mongoose.Schema.Types.ObjectId, ref: 'User'
},
board: {
  type:mongoose.Schema.Types.ObjectId, ref: 'Board'
},
name: {
  type: String
},
year: {
  type: Number
},
description: {
  type: String
},
source: {
  type: String
},
artist: {
  image: String,
  name:String
},
image: {
  type: String
},
  createdAt: {
    type: Date,
    default: Date.now,
  }


});

module.exports = mongoose.model("Gallery", GallerySchema);
