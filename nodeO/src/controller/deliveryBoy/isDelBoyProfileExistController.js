const DeliveryBoy = require('../../models/deliveryBoy');

module.exports = async (req,res)=>{
    try {
        const alreadyProfile = await DeliveryBoy.findOne({owner : req.user._id});
        if(!alreadyProfile){
            res.send({isProfile : false})
            return;
        }
        res.send({isProfile : true, delProfileId: alreadyProfile._id});
    } catch (error) {
        res.status(400).send();
    }
}