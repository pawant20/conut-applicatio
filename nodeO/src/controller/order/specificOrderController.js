const Orders = require('../../models/orders');
module.exports = async (req,res)=>{
    try {   

        const orders = await Orders.findById(req.body.data);
        if(!orders.owner.equals(req.user._id)){
            return res.status('401').send({response:'unauthorized access'});
        }

        res.send(orders);
    } catch (error) {
        console.error(error);
        res.status(400).json();
    }
}