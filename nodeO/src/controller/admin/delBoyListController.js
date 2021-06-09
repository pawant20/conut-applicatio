const DeliveryBoyProfile = require('../../models/deliveryBoy');

// return list of all delivery boys
module.exports = async (req,res) => {

    try {
        const delBoy = await DeliveryBoyProfile.find();
        res.send(delBoy);
    } catch (error) {
        res.status(404).send()
    }    

}