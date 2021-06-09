require('dotenv').config();
const AWS = require("aws-sdk");

const SESConfig = {
    apiVersion: '2010-12-01',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_ID,
    region: process.env.AWS_REGION
}

module.exports = sendSesEmail = async (data) => {
    if (process.env.EMAIL === 'false') {
        console.log('aws-ses-conf : Email Sending Disabled');
        return;
    }

    const params = {
        Destination: {
            //   CcAddresses: [
            // 'EMAIL_ADDRESS',
            /* more items */
            //   ],
            ToAddresses: data.to
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: data.htmlData
                },
                Text: {
                    Charset: "UTF-8",
                    Data: data.textFormatData
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: data.subject
            }
        },
        Source: data.from,
        ConfigurationSetName: process.env.CONFIG_SET_NAME,
        ReplyToAddresses: [
            data.from
        ]
    };

    const sendPromise = new AWS.SES(SESConfig).sendEmail(params).promise();
    sendPromise.then(function (data) {
        console.log(data.MessageId);
    }).catch(function (err) {
        console.error('aws-ses-conf : unexpected : ', err, err.stack);
    });
}

