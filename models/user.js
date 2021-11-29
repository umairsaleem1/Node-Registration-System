const mongoose = require('mongoose');
const validator = require('validator');

// Defining Schema
const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    lname:{
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid');
            }
        }
    },
    phone:{
        type: Number,
        unique: true,
        trim: true,
        validate(value){
            if(String(value).length!==11){
                throw new Error('Phone No must be of 11 digits');
            }
        }
    },
    age:{
        type: Number,
        trim: true,
        validate(value){
            if(value<0){
                throw new Error('Age cannot be negative');
            }
        }
    },
    password:{
        type: String,
        minlength:8,
        trim: true
    },
    confirmpassword:{
        type: String,
        trim: true
    },
    gender:{
        type: String
    }
});




// Creating collection
const User = mongoose.model('User', userSchema);

module.exports = User;