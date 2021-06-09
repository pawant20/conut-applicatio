const User = require('../../../models/users');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const myOrderProp = require('../../../sharable/orders/myOrdersProp')
dotenv.config();
const { refReward } = require('../../../sharable/applicationProp')

// omited from method input refUserID
/**
 * Input=>referalId,refOwnerId,subscriptionDuration
 */
module.exports = async (req,res) => {
    try {
        const subscriptionDuration = parseInt(req.body.subscriptionDuration,10)

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({response: 'user not found'});
        }

        if (subscriptionDuration<30) {
            return res.status(404).send({response: 'only applicaple for subscription'});
        }

        //we are again checking if user have previous subscription or not
        await req.user.populate(myOrderProp).execPopulate();
        if (req.user.orders) {
            let subscriptionCount = 0;
            for (const key of req.user.orders) {
                if (key.subscriptionDuration>29) {
                    //for the first generated subscription we will allow
                    // for second subscrption there wont' be reward
                    subscriptionCount++;
                    if(subscriptionCount>1){
                        return res.status(405).send({response: 'already subscription'});
                    }
                }
            }
        }

        const refOwner = await User.findById(req.body.refOwnerId);
        if (!refOwner) {
            return res.status(404).send({response: 'user not found'})
        }

        // check if passed referid is tsame for saved owner ID
        if (refOwner.myReferalId !== req.body.referalId) {
            return res.status(404).send({response : 'invalid request'});
        }

        // there mmight be chances where passed Id might be manipulated 
        // so we can again verify with signed JWT 
        const usedRefcode = jwt.verify(
            req.user.useReferalId,
            process.env.JWT_SPK
        )
        if (usedRefcode.referalId !== req.body.referalId) {
            return res.status(404).send({response: 'invlaind refcode'})
        }

        const pushInReferedArray = async () =>{
            refOwner.refered.push({
                name: req.user.name,
                mobile: req.user.mobile,
                plan: subscriptionDuration
            }); 
        }

        // finally after all success we will add wallet amount
        if (subscriptionDuration === 30) {
            await pushInReferedArray();

            refOwner.wallet = refOwner.wallet + refReward.monthly;
            await refOwner.save();

            user.useReferalId = null;
            await user.save();

            return res.send({response: 'amount added for 30day subs'});
        }

        if (subscriptionDuration === 90 || subscriptionDuration > 90) {
            await pushInReferedArray();

            refOwner.wallet = refOwner.wallet + refReward.quarterly;
            await refOwner.save();

            user.useReferalId = null;
            await user.save();

            return res.send({response: 'amount added for 90day subs'});
        }

        // else throw error
        throw new Error('final : not applicable for referal');
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            // handle the expired token in frontend
            return res.status(406).send({response : 'ref id expired'});
        }
        res.status(404).send();
    }  
    
}

