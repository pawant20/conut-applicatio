const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true
    },
    shortDescription : {
        type : String,
        required : true
    },
    longDescription : {
        type : String,
        required : true
    },
    deliveryPlan : {
        type : String
    },
    coconutCategory : {
        type : String
    },
    subscriptionDuration : {
        type : Number,
        // by default in case of regular delivery null is required for comparision in angular
        default : null
    },
    inStock : {
        type : Boolean,
        default : true
    },
    price : {
        type : Number,
        required : true,
        lowercase : true
    },
    image : {
        type : String
    },
    perPeice : {
        type : Number
    },
    category : {
        type : String
    }
},{
    timestamps : true
});
const Product = mongoose.model('Product',productSchema);

module.exports = Product;