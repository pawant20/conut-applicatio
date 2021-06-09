const mongoose = require('mongoose');
const validator = require('validator');

const contactUsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true
    },
    mobile : {
        type : String,
        required : true,
        minlength : 10,
        maxlength : 10,
    },
    email : {
        type : String,
        lowercase: true,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    comment : {
        type : String,
        required : true,
        lowercase : true
    }
},
{
    timestamps : true
});
module.exports = mongoose.model('ContactUs',contactUsSchema);