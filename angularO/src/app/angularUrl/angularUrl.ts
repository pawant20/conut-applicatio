// used in main routing modules
export const modules = {
    lazy: 'lazy',
    lazyTwo: 'two',
    preLazy: 'pre',
    lazySaveRef: 'ref',
    admin: 'admin',
    deliver: 'delivery'
};


// used in sub modules
export const eagerUrl = {
    home: '',
    loginRegister: 'login-register'
};

export const preUrl = {
    product: 'product',
    prodDetails: 'product',
    myOrders: 'my-orders',
    orderDetails: 'my-orders',
    checkout: 'product-checkout'
};

export const lazyTwoUrl = {
    contactUs: 'contact-us',
    about: 'about-us',
    profile: 'profile'
};

export const lazyUrl = {
    tC: 'terms-and-conditions',
    resetPassword: 'reset-password'
};

export const adminUrl = {
    delBoyList: 'delivery-boy-list',
    allOrder: 'all-orders'
}

export const deliveryUrl = {
    createProfile: 'create-profile'
}


// used in HTML templates
export const completeUrl = {
    // eager
    home: eagerUrl.home,
    loginReg: eagerUrl.loginRegister,

    // Pre
    product: modules.preLazy + '/' + preUrl.product,
    prodDetail: modules.preLazy + '/' + preUrl.prodDetails,
    myOrders: modules.preLazy + '/' + preUrl.myOrders,
    checkout: modules.preLazy + '/' + preUrl.checkout,

    // lazyTwo
    contact: modules.lazyTwo + '/' + lazyTwoUrl.contactUs,
    about: modules.lazyTwo + '/' + lazyTwoUrl.about,
    profile: modules.lazyTwo + '/' + lazyTwoUrl.profile,

    // lazy
    tC: modules.lazy + '/' + lazyUrl.tC,
    resetPassword: modules.lazy + '/' + lazyUrl.resetPassword,

    // admin
    delBoyList: modules.admin + '/' + adminUrl.delBoyList,
    allOrders: modules.admin + '/' + adminUrl.allOrder
    // delivery
};
