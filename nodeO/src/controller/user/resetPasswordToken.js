const User = require('../../models/users');
const jwt = require('jsonwebtoken');

module.exports = async (req,res)=>{
    try {
        
        const bodyToken = req.body.token;
        const user = await User.findOne({reset_password_token:bodyToken})

        if (!user) {
            return res.status(404).send({response:'token not found'});
        }
        // this will verfy that token is valid or not i.e the set-expiered date is over or not
        // if it is expired then it will directly go in catch block
        const decode = jwt.verify(bodyToken,'pawansinghforgetemailtoken');

        if (decode) {
            user.password = req.body.newpassword;
            
            // removing reset key and all the tokens from from DB so the user is logged out from all devices
            user.reset_password_token = undefined;
            user.tokens = undefined;
            // there is pre save function written in which we will hashthe updated password
            await user.save();
        } else {
            return res.status(400).send('token has expired')
        }
        res.send('successful reset')
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(422).send('invalid token')
        }
        
        res.status(404).send();
    }
}