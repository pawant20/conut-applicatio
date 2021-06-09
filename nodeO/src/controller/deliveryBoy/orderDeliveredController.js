const Order = require('../../models/orders');
const DeliveryBoy = require('../../models/deliveryBoy');
const moment = require('moment');
const fMoment = require('../../sharable/momentDateFormat');

module.exports = async (req,res) => {
    //  to maintain the local timezone we have passed 'true' and toISOString is to format for MOngoDB friendly 
    const currentMoment = moment().toISOString(true);

    const formatedMoment = fMoment(moment());

    try {
        if(!moment(formatedMoment).isSame(req.body.date)){
            return res.status(406).send({response : 'Future delivery not allowed'})
        }
        const deliveryBoy = await DeliveryBoy.findOne({owner : req.user._id});
        if(!deliveryBoy){
            return res.status(401).send({response : 'unuthorized delivery update'})
        }
        
        const order = await Order.findById(req.body.orderId);
        order.deliverdDates.push(currentMoment);

        if(parseInt(order.quantityLeft, 10) === 0 && parseInt(order.bounusLeft, 10)>0) {
            order.bounusLeft--;
            order.bonusDates.push(currentMoment);
        }
        if(parseInt(order.quantityLeft)>0) {
            order.quantityLeft--;
        }

        /**
         * After above calc if both qty and bonus is zero that means 
         * it was last delivery and will be marked as 'completed'
         */
        if (parseInt(order.quantityLeft, 10) === 0 && parseInt(order.bounusLeft, 10) === 0) {
            order.orderStatus = 'completed';
        }

        await order.save()
  
        res.send(order);
    } catch (error) {
        console.log(error);
        res.status(404).send();
    }
}