const Order = require('../../models/orders');

// input -> orderId
module.exports = async (req, res) => {
    try {
        const order = await Order.findById(req.body.orderId);
        res.send(order.customerRemarks);
    } catch (error) {
        console.log('temp : unexpected : ',error);
        res.status(400).send();
    }
}