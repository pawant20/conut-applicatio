const Order = require('../../models/orders')

module.exports = async (req, res) => {
    try {    
        const order = await Order.findById(req.body.orderId);
        if (!order){
            return res.status(404).send({respone : 'order not found'});
        }  

        if (!req.user._id.equals(order.owner)) {
            return res.status(401).send({response :  `${req.user._id} and ${order.owner}`});
        }

        order.skippedDates = req.body.skippedDates;
        await order.save();

        res.send({response : `updated skipped`})
    } catch (e) {
        res.status(404).send()
    }
}