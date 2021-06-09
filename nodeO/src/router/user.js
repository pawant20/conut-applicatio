const express = require('express');
const router = express.Router();
const auth  = require('../middelware/authentication');
const users = require('../APIs/usersApi');

const loginController = require('../controller/user/login');
const updatePassordController = require('../controller/user/updatePassword');
const createUserController = require('../controller/user/createUser');
const logoutController = require('../controller/user/logout');
const resetPasswordTokenController = require('../controller/user/resetPasswordToken');
const forgotPasswordEmailController = require('../controller/user/forgotPasswordEmail');
const updateUserController = require('../controller/user/updateUser');
const getUserInfoController = require('../controller/user/getUserInfo');
const userProfileController = require('../controller/user/userProfile');
const insertDateController = require('../controller/user/insertDateController');
const generateMyRefIdController = require('../controller/user/referal/generateMyRefId');
const saveRefIdController = require('../controller/user/referal/saveRefIdCntrlr');
const getReferalInfoCntrlr = require('../controller/user/referal/getReferalIdInfoCntrlr');
const refRewardsCntrlr = require('../controller/user/referal/refCashRewardCntrlr');
const myRefInfoCntrlr = require('../controller/user/referal/myRefDataCntrlr');
 
router.post(users.createUser,createUserController);
router.post(users.login,loginController);
router.post(users.logout, auth , logoutController);
router.post(users.forgotMail ,forgotPasswordEmailController );
router.post(users.resetPasswordToken , resetPasswordTokenController )
router.post(users.updatePassword ,auth, updatePassordController);
router.patch(users.updateUser,auth ,updateUserController);
router.get(users.getUserInfo, auth ,getUserInfoController);
router.post(users.readUser, auth ,userProfileController);
router.post(users.insertDataApi, auth, insertDateController);
router.get(users.generateRefIdUrl, auth, generateMyRefIdController);
router.post(users.saveRefIDUrl, auth, saveRefIdController);
router.get(users.getRefInfoUrl, auth, getReferalInfoCntrlr);
router.post(users.saveRefRewardsUrl, auth, refRewardsCntrlr);
router.get(users.myReferalDataUrl, auth, myRefInfoCntrlr);

module.exports = router;