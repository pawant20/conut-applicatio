require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const adminAuth  =async (req,res,next) => {
    try {
        const token = req.header('authorization').replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.JWT_SPK);
        const user = await User.findOne({user : 2,_id : decoded._id, 'tokens.token': token});
        
        if(!user){
            return res.status('404').send({response: 'Un authorized access'})
        }
        req.token = token;
        req.user = user;
                
        next();
    } catch (error) {
        res.status('401').send({error: 'Please authenticate'});
    }
}

module.exports = adminAuth;