const express = require('express');
const router = express.Router();

const deliveryApi = require('../../APIs/deliveryBoy/deliveryBoyApi')

const deliveryAuth = require('../../middelware/deliveryBoyAuth')

const createDeliveryBoyProfileController = require('../../controller/deliveryBoy/createDeliveryProfileController');
const isProfileExitsController = require('../../controller/deliveryBoy/isDelBoyProfileExistController');
const assignedDeliveriesListController = require('../../controller/deliveryBoy/assignedDeliveryListController');
const orderDeliveredController = require('../../controller/deliveryBoy/orderDeliveredController')

router.post(deliveryApi.createProfile,deliveryAuth,createDeliveryBoyProfileController);
router.get(deliveryApi.isProfileExist,deliveryAuth,isProfileExitsController);
router.post(deliveryApi.assignedDeliveriesList,deliveryAuth,assignedDeliveriesListController);
router.post(deliveryApi.orderDelivered,deliveryAuth,orderDeliveredController);

module.exports = router;