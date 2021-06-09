const sns = require('../aws-sns');
const { contactInfo } = require('../../sharable/applicationProp');
module.exports = async (data) => {
    const msg =
        `Hi ${data.name},
         Your order of ${data.name} was caceled.
         Sorry for the inconvenience.
        `;

    sns(data.mobile, msg);
}