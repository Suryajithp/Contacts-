const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    firstname:{
        type:String,
        reuired:true
    },
    lastname:{
        type:String,
        reuired:true
    },
    dob:{
        type:Date,
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
    },
    company:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("users",userschema)