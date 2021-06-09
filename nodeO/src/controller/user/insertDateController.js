
module.exports = async (req,res)=>{
    try {

        const user = req.user;
        if (!user) {
            return res.status(400).send({response : 'bad request'});
        }

        user.deliveryDates = req.body.insertDate;
        await user.save();

        res.send({response : user.deliveryDates});
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}