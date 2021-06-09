// *******************NOT USED ANY MORE*******************
const { myfrom, sgMail } = require('../email-conf/sendGridAccount');

const contactUsFormEmail = async (data) => {
    const msg = {
        to: 'email@gmail.com',
        from: myfrom,
        subject: 'Message from Contact UsForm',
        text: data.text,
        templateId: 'e-7efe1a4d34ba4b8cb241c5bf60251c58',
        dynamic_template_data: {
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            comment: data.comment,
        },
    };
    try {
        let mail = await sgMail.send(msg);
        if (mail) {
            // return mail;
            // console.log(mail);
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = contactUsFormEmail;
