const orders = {
    createOrder : '/api/createOrder',
    getMyOrders : '/api/my-orders',
    cancleOrder : '/api/cancle-order',
    orderConfirmationMail : '/api/order-confirmation-mail',
    skippedArraySaveUrl : '/api/save-skipped-dates',
    specificOrderUrl : '/api/specific-order',
    bonusCoconutCalcUrl : '/api/bonus-coconut',
    renewOrderInfoUrl : '/api/renew-info',
    renewOrderUrl : '/api/renew',
    customerRemarkUrl : '/api/cust/remark',

    // ####admin######
    getAllOrders : '/api/owner/all-orders',
    updateOrderStatus : '/api/owner/updateOrderStatus'
}
module.exports = orders;