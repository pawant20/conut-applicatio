const Orders = require('../../models/orders');
const orderConfirmedEmail = require('../../email-conf/messages/orderConfirmedEmail');
const orderCancelledEmail = require('../../email-conf/messages/orderCancelledEmail');

module.exports = async (req,res)=>{
    try {
        let orderId = req.body.orderId;
        let orderStatus =req.body.orderStatus;

        const orders = await Orders.findById(orderId);
        if (!orders) {
            return res.status(400).send({response : 'not found'});
        }

        orders.orderStatus = orderStatus;

        await orders.save();

        if (orderStatus == 'confirmed') {
            orderConfirmedEmail(orders)
        }
        if (orderStatus == 'awaiting') {
            orderCancelledEmail(orders);
        }

        res.send({response:"updated"});
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}
