require('dotenv').config();
const User = require('../../models/users');
const jwt = require('jsonwebtoken');
const angularUrl = process.env.SITE_DOMAIN+'/lazy/reset-password/';
const  forgetPasswordEmail  = require('../../email-conf/messages/forgotPasswordEmail ');

module.exports = async (req,res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            res.status('422').send({respons:'user does not exist'});
        }

        //creating a token which will be sent through email 
        const token = jwt.sign({ _id : user._id.toString()},'pawansinghforgetemailtoken',{ expiresIn: '1h' });
        console.log(token);
    
        // updaing reset_password_token with generated token
        const userUpdated = await User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token}, { new:true,useFindAndModify: false });
        console.log("user updated",userUpdated);

        const data = {
            angularUrl,
            token
        }
        forgetPasswordEmail(req.body,data);
 
        res.send({response:'mail sent'});  
    }
    catch (error) {
        res.status('404').send();
    }
}