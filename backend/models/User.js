const mongoose = require('mongoose')

//user schema

const UserSchema = mongoose.Schema({
    name: {
        type:String,
    },
    email: {
        type:String,
        required:true
    },
    username: {
        type:String
    },
    location: {
      type:String
    },
    password: {
        type:String,
        required:true
    },
    joined: {
      type: Date,
      default: Date.now,
    }

    
})



const User = module.exports = mongoose.model("User", UserSchema)