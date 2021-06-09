const Order = require('../../models/orders');

// input -> orderId,remark : {remark : 'remark value'}
module.exports = async (req,res) => {
    try {
        const order = await Order.findById(req.body.orderId);
        if (!order) {
            return res.status(404).send({respnose : 'not found'})
        }
        order.customerRemarks.push(req.body.remark);
        await order.save();

        res.send({response : 'remark saved'});
    } catch (error) {
        console.log('userRemarkCntrlr : unexpected : ',error);
        return res.status(400).send();
    }
}