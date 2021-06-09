module.exports = async (req,res) => {
    try {
        if (!(req.body.category == 'coconut' && req.body.deliveryPlan == 'subscription')) {
            return res.send({bonusQuantity : 0});
        }
        const orders = await req.user.populate({
            path:'orders',
            options:{
                sort:{
                    createdAt:-1
                }
            }
        }).execPopulate();

        for (const i of orders.orders) {
            if(i.subscriptionDuration > 29){
                return res.send({bonusQuantity : 0});
            }
        }

        // for referal calculation
        if(req.body.deliveryPlan == 'subscription' && parseInt(req.body.subscriptionDuration, 10) == 30 && req.body.refCode){
            return res.send({bonusQuantity : 2});
        }
        if(req.body.deliveryPlan == 'subscription' && parseInt(req.body.subscriptionDuration, 10) > 89 && req.body.refCode){
            return res.send({bonusQuantity : 7});
        }
        
        return res.send({bonusQuantity : 0,final : 'in final response'});
    } catch (error) {
        res.status(404).send();
    }
} 