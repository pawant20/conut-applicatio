// *******************NOT USED ANY MORE*******************
const sgMail = require('@sendgrid/mail');
const sendGridApiKey = 'SG';
sgMail.setApiKey(sendGridApiKey);
const myfrom = 'email@gmail.com'

module.exports = {
    myfrom,
    sgMail
}

const forgetPasswordEmail = async (data,output) => {
    const msg = {
        to: data.email,
        from: myfrom,
        subject: 'data.subject',
        text: data.text,
        templateId: 'f-53527607de4b467397fcbe35ab375ean',
        dynamic_template_data: {
            pawan:"singh"
        }
      };    
    try {
        let mail = await sgMail.send(msg);
        if (mail) {
            return mail;
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const contactUsFormEmail = async (data) => {
    const msg = {
        to: data.email,
        from: myfrom,
        subject: 'data.subject',
        text: data.text,
        templateId: 'e-53527607de4b467397fcbe35ab375ebf',
        dynamic_template_data: {
            pawan:"singh"
        }
      };    
    try {
        let mail = await sgMail.send(msg);
        if (mail) {
            return mail;
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}