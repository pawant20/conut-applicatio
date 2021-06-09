const Orders = require('../../models/orders');

// it will return list of assigned deliveries to any delivery boy
module.exports = async (req,res) => {

    try {
        const assignedOrders = await Orders.find({deliveryBoy : req.body.delBoyId});
        if(!assignedOrders){
            return res.status(202).send({response : 'No orders'})
        }
        res.send(assignedOrders);
    } catch (error) {
        res.status(404).send()
    }

}