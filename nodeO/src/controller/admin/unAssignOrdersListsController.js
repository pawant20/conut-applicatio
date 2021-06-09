const Orders = require('../../models/orders');

// return list of orders which is not assigned to any deliveryboy
module.exports = async (req,res) => {
    
    try {
      // here if delboy is null the no del boy is assigned to the order
        const orders = await Orders.find({deliveryBoy : null,orderStatus: "confirmed"});
        res.send(orders);  
    } catch (error) {
        res.status(404).send();
    }

    
}