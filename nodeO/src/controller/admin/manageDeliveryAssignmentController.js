const Orders = require('../../models/orders');

module.exports = async (req,res) => {
    /**
     * here we can add or remove order from a particular delivery boy
     * we are getting delboy profile ID, new assigned and new unassigned arrays
     * first try Catch for assignment and second try catch for unassigned orders
     */
    
    try {
        for (var i = 0, len = req.body.newAssignedArray.length; i < len; i++) {
            const order = await Orders.findById(req.body.newAssignedArray[i]._id);
            if(!order){
                res.status(404).send({response : req.body.newAssignedArray[i]._id})
            }
            order.deliveryBoy = req.body.delboyId;
            await order.save();
        }

        for (var i = 0, len = req.body.newUnAssignedArray.length; i < len; i++) {
            const order = await Orders.findById(req.body.newUnAssignedArray[i]._id);
            if(!order){
                res.status(404).send({response : req.body.newUnAssignedArray[i]._id})
            }
            order.deliveryBoy = null;
            await order.save();
        }
        res.send({response : "updated"});
    }
    catch (error) {
        res.status(404).send();
    }
}