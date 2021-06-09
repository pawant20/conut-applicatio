const sns = require('../aws-sns');
const { contactInfo } = require('../../sharable/applicationProp');
module.exports = async (data) => {
    const msg = 
    `Hi ${data.name},
     Your order was succesfully placed.We will confirm your order and notify you Shortly.
    `;
    sns(data.mobile,msg);
    const adminMsg = `New order ${data.productName} for ${data.subscriptionDuration} Day received from ${data.name}`;

    sns(contactInfo.companyMobile,adminMsg);
}