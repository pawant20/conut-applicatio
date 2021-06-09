const express = require('express');
const router = express.Router();
const products = require('../APIs/productsApi');
const adminAuth = require('../middelware/adminAuth')

const createProductController = require('../controller/products/createProduct');
const productById = require('../controller/products/getProductById');
const allProducts = require('../controller/products/getAllProducts');

router.post(products.createProduct,adminAuth,createProductController);
router.post(products.productById,productById);
router.get(products.getAllProducts,allProducts);

module.exports = router;