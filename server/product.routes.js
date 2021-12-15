const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authorize = require('../middleware/authorize');

router.get('/', productController.findAll);
router.post('/', productController.create);
router.get('/:id', productController.findById);
router.put('/:id', productController.update);
router.get('/all-product/:id', productController.getProductList);



module.exports = router;
