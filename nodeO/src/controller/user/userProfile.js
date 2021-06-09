module.exports = async (req,res)=>{
    try {

        const {name , email , mobile , address1 , city, zip ,landmark } = req.user
        res.send({name , email , mobile , address1 , city, zip ,landmark });
    } catch (error) {
        res.status(500).send();
    }
}