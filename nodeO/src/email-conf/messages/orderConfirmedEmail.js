const { contactInfo } = require('../../sharable/applicationProp')
const sendSesEmail = require('../aws-ses-conf')

module.exports = (body) => {
    try {
        const to = [contactInfo.companyEmail, body.email];
        const from = contactInfo.companyEmail;
        const subject = 'Your Order is Confirmed by Admin';
        const textFormatData = 'Your Order is Confirmed by Admin';
        const htmlData =
            `<div style="background-color: #ffffff; box-sizing: border-box;">
                <h1 style="text-align : center; color : #60C322; font-size ">
                Pawan Singh
                </h1>
                <h3>Your Order is confirmed by our Team</h3>
                <p>Order was placed by ${body.name}, ${body.createdAt} </p>
                <h5 style="text-align: right; margin-right:2%">Thanks for Your Order</h5>
                </h5>
            </div>
            `

        const data = {
            to,
            subject,
            textFormatData,
            htmlData,
            from
        }
        sendSesEmail(data);
    } catch (error) {
        console.log('orderConfirmedEmail : unexpected :', error);
    }
}