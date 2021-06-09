const myOrderProp = require('../../sharable/orders/myOrdersProp')
module.exports = async (req, res) => {
    try {
        await req.user.populate(myOrderProp).execPopulate();

        res.send(req.user.orders)
    } catch (e) {
        res.status(400).send()
    }
}