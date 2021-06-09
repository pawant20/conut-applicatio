const Orders = require('../../models/orders');
// import * as moment from 'moment';
const moment = require('moment');
const mFormat = require('../../sharable/momentDateFormat');

module.exports = async (req,res) => {
    let assignedOrders = [];
    let sendAssigned = [];
    // it will return list of assigned deliveries to any delivery boy
    try {
        assignedOrders = await Orders.find({deliveryBoy : req.body.delBoyId});
        if(!assignedOrders){
            return res.status(202).send({response : 'No orders'})
        }
        
        for (const i of assignedOrders) {
            const formatedStartDate = mFormat(i.startDate)
            
            if ((i.quantityLeft>0 || i.bounusLeft>0) &&
                 i.orderStatus ==='confirmed' 
                 &&
                 moment(formatedStartDate).isSameOrBefore(req.body.date)
                 ) {
                sendAssigned.push(i);
            }
        }
        
        res.send(sendAssigned);
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
}