const users = {
    createUser : '/api/users',
    login : '/api/user/login',
    logout : '/api/user/logout',

    //forgot password setup
    forgotMail : '/api/forgot/email',

    //User Reset Password Token
    resetPasswordToken : '/api/reset_password',

    updatePassword : '/api/updatePassword',
    readUser : '/api/usersRead/me',
    updateUser : '/api/userUpdate/me',

    getUserInfo : '/api/getUserInfo',
    insertDataApi : '/api/user/insertData',

    generateRefIdUrl : '/api/gen/ref/id',
    saveRefIDUrl: '/api/save-refId',
    getRefInfoUrl: '/api/ref-info',
    saveRefRewardsUrl: '/api/save/ref/rewards',
    myReferalDataUrl: '/api/my/ref/data'
}
module.exports = users;