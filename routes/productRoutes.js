const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

// Products route
router.post('/', productController.createProduct);
router.get('/', productController.getProduct);
router.put('/', productController.updateProduct);
router.delete('/', productController.deleteProduct);

module.exports = router;