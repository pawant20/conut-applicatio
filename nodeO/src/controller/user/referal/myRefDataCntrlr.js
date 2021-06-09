require('dotenv').config();
const User = require('../../../models/users');

module.exports = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({response: 'user not found'});
        }
        const data = {
            refered : user.refered,
            wallet : user.wallet
        }
        res.send(data);
    } 
    catch (error) {
        res.status(404).send();
    }
}