require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
    password : {
        type : String,
        required : true,
        minlength : [6,'Password should be atleast 6 character long']
    },
    email : {
        type : String,
        lowercase: true,
        // to make uniqueness effective we need to wipe database and restart server
        unique: true,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    deliveryDates : {
        type: Date
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
    reset_password_token : {
        type : String
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }],
    user : {
        type : Number
    },
    myReferalId : String,
    useReferalId: String,
    wallet : {
        default: 0,
        type: Number
    },
    refered : [
        {
            name : String,
            mobile : String,
            plan : Number
        }
    ]
},{
    timestamps : true
});

/**
 * This will create a virtual property which is not actually stored in database
 * it just find the relation between two models
 * Two parameters accepted here are
 * 1) Name of the virtual property
 * 2) object refering to other model, field name local model, field of foreign model
 * on which basis we will make relationship between two model */ 
userSchema.virtual('orders',{
    ref : 'Order',
    localField : '_id',
    foreignField : 'owner'
});


/*
    Defining custom method 
    static functions are accesible on instances or individual users,
    somtime called instance methods
    We are not using arrow function as we need "THIS" binding
*/
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        {
            _id : user._id.toString(),
            name : user.name,
            user : user.user
        },
        process.env.JWT_SPK
    );

    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

/*
    Defining custom method to login
    static functions are accesible on model functions, sometime called model methods
*/
userSchema.statics.findByCredentials = async (mobile,password) =>{
    const user = await User.findOne({mobile});
    if(!user){
        throw new Error('WrongCredentials');
    }

    const isMatched = await bcrypt.compare(password,user.password);
    if (!isMatched) {
        throw new Error('WrongCredentials');
    }

    return user;
}


/**Using middleware for preprocessing to hash the password 
    In our app there are to scenarios where we need to hash the password
        1)When new user is created 
        2)When user update its password

    The below middleware runs only on save() method.
    There is no issue in creating user. But, For update we are using findByIdAndUpdate()
    which will bypass the below middleware.
    So, we have modified "src>router>user" file from findByIdAndUpdate() to save()
*/

userSchema.pre('save', async function(next){
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})

const User = mongoose.model('User',userSchema);
module.exports = User;