const User = require('../../models/users');
const newUserEmail = require('../../email-conf/messages/registrationEmail')

module.exports = async (req,res)=>{

    try {
        const user = new User(
            req.body
        );
        await user.save();

        const token = await user.generateAuthToken();
        const name = user.name;
        newUserEmail(req.body);

        res.status(200).send({name,token});
    } catch (error) {
        if (error.name == 'ValidationError') {
            res.status(422).json(error);
        } else if(error.name == 'MongoError'){
            res.status(443).json(eror)
        }
        else{
            console.error(error);
            res.status(500).send();
        }
    }
}