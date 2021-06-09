const { contactInfo } = require('../../sharable/applicationProp')
const sendSesEmail = require('../aws-ses-conf')

module.exports = (body) => {
    try {
      const to = [contactInfo.companyEmail, body.email];
      const from = contactInfo.companyEmail;
      const subject = 'Your Order was Cancelled by Admin';
      const textFormatData = 'Your Order was Cancelled by Admin';
      const htmlData =
      `
      <div style="background-color: #ffffff; box-sizing: border-box;">
        <h2 style="text-align : center; color : #60C322; font-size ">
          Pawan Singh
        </h2>
        <h2 style="text-align : center; color : #FF0000; font-size ">
          Your order was cancelled
        </h2>
        <p><b>Please contact our team for more details</b></p>
        <p style="text-align: center">Below are the details of your Order</p>
      
        <p>Order From ${body.name} recieved at ${body.createdAt}</p>
        <p><b>We will confirm your order and will notify you soon</b></p>
      </div>
      <div>
        <h3 style="color: e7ebe4">Product</h3>
        <div style="display: grid;
                    grid-template-columns: 49% 49%;
                    grid-gap: 2%;">
          <div style="">
            <p>${body.productName}</p>
            <p>
            ${body.shortDescription}
            </p>
          </div>
          <div style="">
            <P>
                Duration: ${body.subscriptionDuration} days
            </P>
            <P>
              Type : ${body.category}
            </P>
            <h4>
                Amount ${body.price}
            </h4>
          </div>
        </div>
        
        <div style="border-style: groove;"></div>
        <div style="display: grid;
                    grid-template-columns: 49% 49%;
                    grid-gap: 2%;">
          <div style="">
            <p>${body.address1}, ${body.city}, ${body.zip}, ${body.landmark}</p>
            <p>
                ${body.email}
            </p>
            <p>
                ${body.mobile}
            </p>
          </div>
          <div style="">
            <P>
                Note : ${body.additionalNote}
            </P>
            <P>
                Delivery Time : ${body.deliveryTime}
            </P>
          </div>
        </div>
          <h5 style="text-align: right; margin-right:2%">Sorry for the inconvenience</h5>
          <h5 style="text-align: right; margin-right:2%">Thank you!</h5>
      </div>`
      
      const data = {
        to,
        subject,
        textFormatData,
        htmlData,
        from
      }
      sendSesEmail(data);

    } catch (error) {
        console.log('orderCancelledEmail : unexpected :', error);
    }
}