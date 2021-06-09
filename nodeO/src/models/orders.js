const mongoose = require('mongoose');
const validator = require('validator');
const { payment } = require('../sharable/applicationProp')
const orderSchema = new mongoose.Schema({
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
    address1 : {
        type : String,
        required : true,
        lowercase : true
    },
    landmark : {
        type : String,
        lowercase : true
    },
    zip : {
        type : String,
        required : true,
        lowercase : true,
        minlength : 6,
        maxlength : 6,
    },
    additionalNote : {
        type :String,
        lowercase : true
    },
    productName : {
        type : String,
        required : true,
        lowercase : true
    },
    price : {
        type : Number,
        required : true,
        lowercase : true
    },
    city : {
        type : String,
        required : true,
        lowercase : true
    },
    owner: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    location: {
        lat: {
            type :Number,
            default : 0
        },
        lng: {
            type : Number,
            default : 0
        }
    },
    // confirmed,canceled,awaiting,completed
    orderStatus: {
        type : String,
        default: 'awaiting',
        required : true,
        lowercase : true
    },
    deliveryTime: {
        type : String,
        required : true
    },
    productId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    subscriptionDuration:{
        type : Number
    },
    category : {
        type : String
    },
    shortDescription : {
        type : String
    },
    image : {
        type : String
    },
    quantityLeft : {
        type : Number
    },
    bounusLeft : {
        type : Number
    },
    startDate : {
        type : Date
    },
    isPaused : Boolean,
    pausedDates : [
        Date
    ],
    skippedDates : [
        Date
    ],
    deliverdDates : [
        Date
    ],
    bonusDates : [
        Date
    ],
    deliveryBoy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'DeliverBoy',
        default: null
    },
    teamRemarks : [
        {
            remark : String,
            date : {
                type : Date,
                default : Date.now
            }
        }
    ],
    customerRemarks : [
        {
            remark : String,
            date : {
                type : Date,
                default : Date.now
            }
        }
    ],
    renewedAt : {
        type: Date,
        default: null
    },
    history : [{
        date: {
            type: Date,
            default: Date.now
        },
        // ENUM can used here
        paymentType: {
            type: String,
            default: payment.cod,
        },
        price: Number,
        status: {
            type: String,
            default: payment.unpaid
        }
    }]
},
{
    timestamps : true
});

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;
