const { contactInfo } = require('../../sharable/applicationProp')
const sendSesEmail = require('../aws-ses-conf')
module.exports = (body) => {
    try {
        const to = [contactInfo.companyEmail];
        const from = contactInfo.companyEmail;
        const subject = 'New Contact Us form recieved';
        const textFormatData = 'this contains only text formated data';
        const htmlData = `<div style="background-color: #000000; color: #ffffff; padding: 10px;">
                        <h1 >Hello </h1>
                        <p>New contact us form recieved</p>
                        <div style="background-color: #000000; color: #ffffff; margin: 10px;">
                            <p>NAME: ${body.name}</p>
                            <p>Mobile: ${body.mobile}</p>
                            <p>email: ${body.email}</p>
                            <p>Message: ${body.comment}</p>
                        </div>
                    </div>`;
        
        const data = {
            to,
            subject,
            textFormatData,
            htmlData,
            from
        }
        sendSesEmail(data);
    } catch (error) {
        console.log('contactEmail : unexpected :',error);
    }
}