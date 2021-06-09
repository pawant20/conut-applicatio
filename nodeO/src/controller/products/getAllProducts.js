const Product = require('../../models/products');

module.exports = async (req,res)=>{
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}