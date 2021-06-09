require('dotenv').config();
const express = require('express');
const userRouter = require('./router/user');
const productRouter = require('./router/products');
const orderRouter = require('./router/order');
const contactUsRouter = require('./router/contactUs');
const deliveryBoyRouter = require('./router/deliveryBoy/deliveryBoyRouter');
const adminRouter = require('./router/admin/deliveryRelatedRouter');
const path = require('path');
require('./db/mongoose');

const app = express();
const port = process.env.PORT;

// for CORS
app.use('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept, Range");
    next();
});

app.use(express.json());

app.use(express.static(__dirname+'/angular'));

app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(contactUsRouter);
app.use(deliveryBoyRouter);
app.use(adminRouter);

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'angular/index.html'));
});

app.listen(port,()=>{
    console.log("listening on port",port);
})

