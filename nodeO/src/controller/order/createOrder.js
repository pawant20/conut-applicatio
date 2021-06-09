const Order = require('../../models/orders');
const moment = require('moment');
const mFormat = require('../../sharable/momentDateFormat');
const newOrderEmail = require('../../email-conf/messages/orderSuccessEmail');

module.exports = async (req,res)=>{

    try {
        const startDateC = mFormat(moment(moment()).add(1, 'day')); 

        const order = new Order({
            ...req.body,
            // assigning owners id who created it
            owner : req.user._id,
            quantityLeft : req.body.subscriptionDuration,
            // clear bonus###
            bounusLeft : req.body.bounusLeft,
            startDate : startDateC,

            history : [{
                price : req.body.pricess
            }]
        });
    
        await order.save();
        newOrderEmail(req.body);
        res.send({response : 'order created'})
    } catch (error) {
        console.error(error);
        res.status(400).json();
    }
}

