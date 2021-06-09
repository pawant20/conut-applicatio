require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../../../models/users');

module.exports = async (req,res) => {
    try {

        const refUser = await User.findOne({myReferalId: req.body.useReferalId});
        if (!refUser) {
            return res.status(443).send({response: 'refer code not found'});
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(443).send({response: 'user not found'});
        }
        
        if (user.myReferalId === req.body.useReferalId) {
            return res.status(442).send({response: 'can not use own referal code'});
        }

        const referalId = req.body.useReferalId;
        if (!req.body.useReferalId) {
            return res.status(441).send({response: 'please provide referal code'});
        }
        const referalOwnerId = refUser._id;
        const token = jwt.sign(
            {
                referalId,
                referalOwnerId
            },
            process.env.JWT_SPK,
            { expiresIn: '5d' }
        );

        user.useReferalId = token;
        
        await user.save();

        res.send({response: 'referal id saved'});
    } catch (error) {
        console.log('saveRefIdCntrlr : unexpected : ',error);
        return res.status(400).send();
    }
}