const User = require('../../models/users');

module.exports = async (req,res) => {
    try {
        // custom defined method findByCredentials() at "src>model>user"
        const user = await User.findByCredentials(req.body.mobile,req.body.password);
        const name = user.name;
        const token = await user.generateAuthToken();

        res.send({name,token});
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}