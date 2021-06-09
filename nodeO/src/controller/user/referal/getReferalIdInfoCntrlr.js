require('dotenv').config();
const User = require('../../../models/users');
const jwt = require('jsonwebtoken');
const myOrderProp = require('../../../sharable/orders/myOrdersProp');

/**
 * input "subscriptionDuration" : "29"
 */
module.exports = async (req, res) => {
    try {

        if(req.body.subscriptionDuration<30){
            return res.status(404).send({response: 'applicable for subscrition only'});
        }
        
        const usedRefcode = jwt.verify(
            req.user.useReferalId,
            process.env.JWT_SPK
        )
        
        const refOwner = await User.findById(usedRefcode.referalOwnerId);
        if (!refOwner) {
            return res.status(404).send({refOwner: 'ref owner not found'});
        }

        // to check if saved referal id is same with owner's genrated ID
        if (refOwner.myReferalId !== usedRefcode.referalId) {
            return res.status(404).send({response: 'invalied ref ID'});
        }

        await req.user.populate(myOrderProp).execPopulate();
        if (req.user.orders) {
            for (const key of req.user.orders) {
                if (key.subscriptionDuration>29) {
                    return res.status(405).send({response: 'already subscription'});
                }
            }
        }
        
        res.send({
            refOwnerName: refOwner.name,
            refOwnerMobile: refOwner.mobile,
            refOwnerId: refOwner._id,
            referalId: usedRefcode.referalId
        });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            // handle the expired token in frontend
             return res.status(406).send({response : 'ref id expired'});
        }        
        console.log('getReferalIdInfoCntrlr : unexpected : ', error);
        res.status(400).send();
    }
}