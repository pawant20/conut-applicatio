require('dotenv').config();
const AWS = require('aws-sdk');
const AccessKeyID = process.env.SNS_ACCESS_KEY_ID;
const SecretAccessKey = process.env.SNS_SECRET_KEY_ID;
const region = process.env.AWS_REGION;

module.exports = async (mobile,messageTxt) => {
    if (process.env.SMS === 'false') {
        console.log('aws-sns : SMS Sending Disabled');
        return;
    }
    AWS.config.update({
        region: region,
        accessKeyId: AccessKeyID,
        secretAccessKey: SecretAccessKey
    });
    var params = {
        Message: messageTxt,
        PhoneNumber: '+91' + mobile,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': 'PAWAN'
            },
            'AWS.SNS.SMS.SMSType': {
                DataType: 'String',
                StringValue: 'Transactional'
             }
        }
    };
    
    const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
    
    publishTextPromise.then(function (data) {
        console.log('aws-sns',data);
    }).catch(function (err) {
        console.log('aws-sns : unexpected :',err); 
    });
}
