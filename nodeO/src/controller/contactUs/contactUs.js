const ContactUs = require('../../models/contactUsData');

const contactEmail = require('../../email-conf/messages/contactEmail');

module.exports = async (req,res) => {
    try {
        const contactUs = new ContactUs({
            ...req.body
        });
        await contactUs.save();
        contactEmail(req.body);
        res.send({response : 'contactUs info created'})
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
}