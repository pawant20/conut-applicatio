import { environment } from '../../environments/environment';
import { Injectable } from "@angular/core";

@Injectable()
export class ApiUrls {
    domain = environment.domain;

    /*##############Users################*/
    loginUrl = this.domain + '/api/user/login';
    logoutUrl = this.domain + '/api/user/logout';
    createUserUrl = this.domain + '/api/users';
    forgotPasswordUrl = this.domain + '/api/forgot/email';
    emailResetPasswordUrl = this.domain + '/api/reset_password';
    updateUserUrl = this.domain + '/api/userUpdate/me';
    getUserInfoUrl = this.domain + '/api/getUserInfo';
    userProfile = this.domain + '/api/usersRead/me';
    updatePassword = this.domain + '/api/updatePassword';
    insertDeliverDateUrl = this.domain + '/api/user/insertData';

    // #############referal ##############
    saveRefUrl = this.domain + '/api/save-refId';
    generateRefId = this.domain + '/api/gen/ref/id';
    getRefInfoUrl = this.domain + '/api/ref-info';
    saveRefRewardsUrl = this.domain + '/api/save/ref/rewards';
    myReferalDataUrl = this.domain + '/api/my/ref/data';

    /*##############Products################*/
    productByIdUrl = this.domain + '/api/product/id';
    allProductsUrl = this.domain + '/api/all-Products';

    /*##############Orders################*/
    createOrderUrl = this.domain + '/api/createOrder';
    getMyOrdersUrl = this.domain + '/api/my-orders';
    cancleOrderUrl = this.domain + '/api/cancle-order';
    orderConfirmationMailUrl = this.domain + '/api/order-confirmation-mail';
    skippedArrayUrl = this.domain + '/api/save-skipped-dates';
    specificOrderUrl = this.domain + '/api/specific-order';
    bonusCoconutCalcUrl = this.domain + '/api/bonus-coconut';
    renewOrderInfoUrl = this.domain + '/api/renew-info';
    renewOrderUrl = this.domain + '/api/renew';


    // /**##############contactUs################ */
    contactUsDataUrl = this.domain + '/api/contactUs/info';


    // ######################################
    // #############ADMIN
    // #####################################

    // Order
    getAllOrdersUrl = this.domain + '/api/owner/all-orders';
    updateOrderStatusUrl = this.domain + '/api/owner/updateOrderStatus';

    // ###############Delivery URL###########
    createDeliveryProfileUrl = this.domain + '/api/delivery/create-profile';
    isProfileExistUrl = this.domain + '/api/delivery/is-profile';
    assignedDeliveryList = this.domain + '/api/delivery/assigned-deliveries';
    orderDeliveredUrl = this.domain + '/api/delivery/order-delivered';


    // ###################Admin URL ############
    unAssignedOrdersUrl = this.domain + '/api/admin/un-assigned-orders';
    assignedOrdersUrl = this.domain + '/api/admin/assigned-orders';
    allDelBoyUrl = this.domain + '/api/admin/all-delBoy';
    manageDeliveryAssignmentUrl = this.domain + '/api/admin/mng-del-ass';

    cancelOrderAdminUrl = this.domain + '/api/cancle-order';
    constructor() { }
}
