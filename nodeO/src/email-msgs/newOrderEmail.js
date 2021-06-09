// *******************NOT USED ANY MORE*******************
require('dotenv').config();
const {myfrom,sgMail}  = require('../email-conf/sendGridAccount');

const contactUsFormEmail = async (data) => {    
    try {
        if (process.env.email === 'false') {
            console.log('newOrderEmail : email sending disabled');
            return;
        }
    
        const msg = {
            to: ['email@gmail.com',data.email],
            from: myfrom,
            subject: 'New Order',
            text: data.text,
            templateId: 'd-4ea1ef959ce047bfb071731a37b30ce4',
            dynamic_template_data : data
        };

        let mail = await sgMail.send(msg);
        if (mail) {
            // return mail;
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
module.exports = contactUsFormEmail;
