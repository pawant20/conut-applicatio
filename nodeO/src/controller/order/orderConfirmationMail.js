const orderMail = require('../../email-msgs/newOrderEmail')

module.exports = async (req,res) => {
    try {
        orderMail(req.body);
        res.send();
    } catch (error) {
        res.status('400').send({response : 'could not send email'});
    }
}