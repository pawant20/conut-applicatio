const Order = require('../../../models/orders');

module.exports = async (req, res) => {
    try {        
        
        const order = await Order.findById(req.body.orderId)
        if (!order){
            return res.status(404).send({respone : 'data not found'});
        }

        order.orderStatus = 'canceled';
        await order.save();
        // await Order.findOneAndRemove({_id : req.params.orderId, owner : req.params.ownerId});
        res.send({response : `order cancelled`})
    } catch (e) {
        console.log('cancelOrderAdmin : unexpected : ',e);
        res.status(400).send()
    }
}