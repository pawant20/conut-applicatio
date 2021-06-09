const Order  = require('../../models/orders');
const Product = require('../../models/products');

module.exports = async (req,res) => {
    try {
        
        const order = await Order.findById(req.body.orderId);

        if(order.quantityLeft>5 && order.subscriptionDuration<29){
            return res.status(405).send({response : `not applicable for renew check qnty left ${order.quantityLeft} and subs duration ${order.subscriptionDuration}`})
        }

        const product = await Product.findById(order.productId);
        const renewInfo = {
            product,
            order
        }

        res.send(renewInfo);
    } catch (error) {
        console.log('Renew-order-Info-controller : ', error);
        res.status(400).send();
    }
    
}