const mongoose = require('mongoose');
const validator = require('validator');

const deliverBoySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true
    },
    mobile : {
        type : String,
        unique : true,
        required : true,
        minlength : 10,
        maxlength : 10,
    },
    email : {
        type : String,
        lowercase: true,
        unique: true,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    address1 : String,
    address2 :String,
    landmark :String,
    city :String,
    zip :{
        type : String,
        minlength : 6,
        maxlength : 6
    },
    owner: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    dayWiseDelivery : [
        {
            date : {
                type : Date,
                default : Date.now
            },
            orders : [{
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : 'Order'
            }]
        }
    ]
},{
    timestamps : true
});

const DeliverBoy = mongoose.model('DeliverBoy',deliverBoySchema);

module.exports = DeliverBoy;