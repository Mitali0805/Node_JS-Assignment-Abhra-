const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        minlength:10,
        required:true,
        validate:/^$|^\d{10}$/ 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    },
    birthDate:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model('User',userSchema);