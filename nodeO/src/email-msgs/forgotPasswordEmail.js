// *******************NOT USED ANY MORE*******************
const {myfrom,sgMail}  = require('../email-conf/sendGridAccount');

const forgotPasswordEmail = async (reqBody,data) => {
    try {
        const msg = {
            to: reqBody.email,
            from: myfrom,
            subject: 'Change Password Request',
            text: data.text,
            templateId: 'e-6b42764e8f7046568257e58e97f7c878',
            dynamic_template_data : data
        };
        let mail = await sgMail.send(msg);
        if (mail) {
            console.log('mail sent'); 
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = forgotPasswordEmail;

