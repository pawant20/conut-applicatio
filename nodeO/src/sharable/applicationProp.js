try {
    /**
     * dataTypes -> cod,online,paid,unpaid : string, 
     * used in ordersModel,
     */
    const payment = {
        cod : 'cash',
        online : 'online',
        paid : 'paid',
        unpaid : 'unpaid'
    }

    const refReward = {
        monthly : 100,
        quarterly : 300
    }

    // dataTypes companyMobile,companyEmail: string
    const contactInfo = {
        companyMobile : '8097253947',
        companyEmail : 'email@gmail.com'
    }


    module.exports = {
        payment,
        refReward,
        contactInfo
    };
} catch (error) {
    console.log('applicationProp : unexpected :', error);
}

