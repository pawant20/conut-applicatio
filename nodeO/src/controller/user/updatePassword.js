const User = require('../../models/users');

module.exports = async (req,res)=>{
    try {

        const user = await User.findByCredentials(req.user.mobile,req.body.oldPassword);
        if (!user) {
            res.status('422').send({response:'Invalid old password'});
            return;
        }

        user.password = req.body.confirmPassword;

        // clear all the tokens i.e logout from all devices
        user.tokens.splice(0,user.tokens.length);

        // hash the password using pre-save in user Model
        await user.save();
        res.send({response:'updated succesfully'});
    } catch (error) {
        if (error.message==='WrongCredentials') {
            return res.status('422').send({response : 'password did not matched'});
        }
        console.log(error.message);
        res.status('404').send({response : 'errror'});
    }
}