const { contactInfo } = require('../../sharable/applicationProp')
const sendSesEmail = require('../aws-ses-conf')
module.exports = (body) => {
    try {
      const to = [body.email];
      const from = contactInfo.companyEmail;
      const subject = 'Welcome!!';
      const textFormatData = 'Welcome!!';
      const htmlData = `<div style="background-color: #ffffff; box-sizing: border-box;">
        <h2 style="text-align : center; color : #60C322; font-size ">
          Pawan Singh
        </h2>
        <p>Hi,</p>
        <p>Welcome!!</p>
      `;
      
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