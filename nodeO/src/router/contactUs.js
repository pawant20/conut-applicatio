const express = require('express');
const router = express.Router();

const createContactUsDataController = require('../controller/contactUs/contactUs');

const contactUsApi = require('../APIs/contactUsApi')

router.post(contactUsApi.contactUsMail,createContactUsDataController);

module.exports = router;