const Product = require('../../models/products');

module.exports = async (req,res)=>{
    try {
        const product = await Product.findById(req.body.productId);
        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}