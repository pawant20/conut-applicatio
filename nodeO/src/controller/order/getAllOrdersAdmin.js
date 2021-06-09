const Orders = require('../../models/orders');

module.exports = async (req,res)=>{
    try {
        const orders = await Orders.find({}).sort({createdAt:-1});
        res.send(orders);
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}