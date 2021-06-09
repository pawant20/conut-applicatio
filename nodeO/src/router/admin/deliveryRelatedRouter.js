const express = require('express');
const router = express.Router();

const adminApi = require('../../APIs/admin/adminApi')

const adminAuth = require('../../middelware/adminAuth')

const unassignedOrdersController = require('../../controller/admin/unAssignOrdersListsController');
const allDelBoyController = require('../../controller/admin/delBoyListController');
const manageDelOrdAssController = require('../../controller/admin/manageDeliveryAssignmentController');
const assignedOrdersController = require('../../controller/admin/assignedDeliveriesControllers');

router.get(adminApi.unAssignedOrders,adminAuth,unassignedOrdersController);
router.get(adminApi.allDelBoyApi,adminAuth,allDelBoyController);
router.post(adminApi.manageDelOrdAss,adminAuth,manageDelOrdAssController);
router.post(adminApi.assignedOrders,adminAuth,assignedOrdersController);

module.exports = router;