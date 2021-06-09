const express = require('express');
const router = express.Router();
const auth  = require('../middelware/authentication');
const adminAuth = require('../middelware/adminAuth');
const orders  = require('../APIs/ordersApi');


const createOrderController = require('../controller/order/createOrder');
const myOrdersController = require('../controller/order/myOrders');
const cancleOrderController = require('../controller/order/cancleOrder');
const orderConfirmationMailController = require('../controller/order/orderConfirmationMail');
const saveSkippedOrdersController = require('../controller/order/saveSkippedOrders');
const specificOrderController = require('../controller/order/specificOrderController');
const bonusCalculatorController = require('../controller/order/bonusCalculatorController');
const renewOdrerInfoController = require('../controller/order/renewOrderInfoController');
const renewOrderController = require('../controller/order/renewOrderController');
const customerRemarkCntrlr = require('../controller/order/customerRemarkCntrlr');
const cancelOrderAdminCntrlr = require('../controller/order/admin/cancelOrderAdmin');
const getAllOrdersController = require('../controller/order/getAllOrdersAdmin'); 
const updateOrderStatusController = require('../controller/order/updateOrderStatusAdmin');

router.post(orders.createOrder,auth,createOrderController);
router.get(orders.getMyOrders,auth,myOrdersController); 
router.delete('/cancle-order/:orderId/:ownerId',auth,cancleOrderController);
router.post(orders.orderConfirmationMail,auth,orderConfirmationMailController);
router.post(orders.skippedArraySaveUrl,auth,saveSkippedOrdersController);
router.post(orders.specificOrderUrl,auth,specificOrderController);
router.post(orders.bonusCoconutCalcUrl,auth,bonusCalculatorController);
router.post(orders.renewOrderInfoUrl,auth,renewOdrerInfoController);
router.post(orders.renewOrderUrl, auth, renewOrderController);
router.post(orders.customerRemarkUrl, auth, customerRemarkCntrlr);

// not used any more, Remove in future
const tempGetremark = require('../controller/order/temp');
router.post('/api/temp/getremark',auth, tempGetremark);

// ####################admin########################
router.get(orders.getAllOrders,adminAuth,getAllOrdersController);
router.post(orders.updateOrderStatus,adminAuth,updateOrderStatusController);
router.post('/api/cancle-order',adminAuth,cancelOrderAdminCntrlr);

module.exports = router;