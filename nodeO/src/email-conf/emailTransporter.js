// *******************NOT USED ANY MORE*******************
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
    user: 'email@gmail.com', 
    pass: 'password' 
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;