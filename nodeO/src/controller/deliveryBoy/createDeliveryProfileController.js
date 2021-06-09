const DeliveryBoy = require('../../models/deliveryBoy');

module.exports = async (req,res)=>{
    
    try {
    const alreadyProfile = await DeliveryBoy.findOne({owner : req.user._id});
    if(alreadyProfile){
        res.status('400').send({response : 'profile already created'});
        return
    }

    const delboy = new DeliveryBoy({
        ...req.body,
        name : req.user.name,
        email : req.user.email,
        mobile : req.user.mobile,
        // assigning owners id who created it
        owner : req.user._id,

    });
        await delboy.save();
        res.send({response : 'delivery profile created'})
    } catch (error) {
        console.error(error);
        res.status(400).json();
    }
}