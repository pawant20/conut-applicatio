// require('dotenv').config();
const { contactInfo } = require('../../sharable/applicationProp')
const sendSesEmail = require('../aws-ses-conf');
module.exports = (body,data) => {
    try {
        const to = [body.email];
        const from = contactInfo.companyEmail;
        const subject = 'Password Reset Request';
        const textFormatData = 'Password Reset Request';
        const htmlData = `<div style="background-color: #ffffff; box-sizing: border-box;">
          <h2 style="text-align : center; color : #60C322; font-size ">
            Pawan Singh
          </h2>
          <p>Hi,</p>
          <p>Greeting from Pawan Singh</p>
          
          <br>
          <p><b>You requested for password reset.</b></p>
          <p>
            Use the below link to <b>Reset password</b>
          </p>
        
          <p>${data.angularUrl}${data.token}</p>
          <br>
          <p style="color:#FF0000"><b>
            Ignore if you did not requested for password reset
          </b></p>
          <h5 style="text-align: right; margin-right:2%">Thanks You</h5>
        </div>
        `;
        
        const datas = {
            to,
            subject,
            textFormatData,
            htmlData,
            from
        }
        sendSesEmail(datas);
    } catch (error) {
      console.log('contactEmail : unexpected :',error);
    }
}