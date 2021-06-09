require('dotenv').config();
const jwt = require('jsonwebtoken');
let decoded;
const otpValue = Math.floor(Math.random()*(10000-1000)+1000);

const token = jwt.sign(
    {
        otp : otpValue
    },
    process.env.JWT_SPK,
    { 
        expiresIn: '5m' 
    }
);

try {
    decoded = jwt.verify(token, process.env.JWT_SPK);
} catch (error) {
    console.log(error);
    
}


