const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId, ref: 'User'
},
  name:{
    type: String,
  },
  art:{
    type: Boolean,
  },
  thumbnails: {
    type:Array
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },


});

module.exports = mongoose.model("Board", BoardSchema);
