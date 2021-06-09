const Order  = require('../../models/orders');
const Product = require('../../models/products');

// input -> orderId
module.exports = async (req,res) => {

    try {
        const order = await Order.findById(req.body.orderId);
        if(!order){
            return res.status(404).send({response : 'not found'});
        }

        if (!req.user._id.equals(order.owner)) {
            return res.status(401).send({response : 'un authorized access'});
        }

        if(order.quantityLeft>5 || order.subscriptionDuration<29){
            return res.status(405).send({response : `not applicable for renew check qnty left ${order.quantityLeft} and subs duration ${order.subscriptionDuration}`})
        }

        const product = await Product.findById(order.productId);
        const renewInfo = {
            product,
            order
        }

        order.quantityLeft = order.quantityLeft + order.subscriptionDuration;

        order.price = product.price;
        order.productName = product.name;

        order.renewedAt = new Date();

        order.history.push({
            price: product.price
        })

        await order.save();
        /**
         * ########FOR ANGULAR FLOW#########
         * when response is recieved then redirect to my orders page with renewed order in top
         * with help of sort by quantityLeft
         */
        res.send(renewInfo);
    } catch (error) {
        console.log('Renew-order-Info-controller : ', error);
        res.status(400).send();
    }
    
}