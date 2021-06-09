const User = require('../../../models/users');
const dotenv = require('dotenv');
const shortid = require('shortid');

dotenv.config();

module.exports = async (req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({response: 'user not found'});
        }

        if(!user.myReferalId){
            user.myReferalId = shortid.generate();
            await user.save();
        }

        res.send({myReferalId : user.myReferalId});
    } catch (error) {
        console.log(error);
        res.status('402').send();
    }
}