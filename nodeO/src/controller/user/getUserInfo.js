module.exports = async (req,res)=>{
    try{
        let userInfo = {
            zip : req.user.zip,
            address1 : req.user.address1,
            city : req.user.city,
            name : req.user.name,
            email : req.user.email,
            mobile : req.user.mobile,
            landmark : req.user.landmark,
        }
        res.send(userInfo);
    } catch (error) {
        res.status(400).send();
    }
}