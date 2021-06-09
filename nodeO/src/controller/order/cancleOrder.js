const Order = require('../../models/orders');

// currently not called by front-end
module.exports = async (req, res) => {
    try {        
        // check if requstin user is the one who created the order
        if (req.user._id!=req.params.ownerId) {
            return res.status(401).send({response :  `${req.user._id}`});
        }

        const order = await Order.findOneAndRemove({_id : req.params.orderId, owner : req.params.ownerId});
        if (!order){
            return res.status(404).send({respone : 'data not found'});
        }

        // await Order.findOneAndRemove({_id : req.params.orderId, owner : req.params.ownerId});
        res.send({response : `delete count`})
    } catch (e) {
        res.status(400).send()
    }
}