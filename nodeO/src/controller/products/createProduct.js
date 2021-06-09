const Product = require('../../models/products');

module.exports = async (req,res)=>{
    try {
        const product = new Product(
            req.body
        );

        await product.save();
        res.send('product created')
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}

