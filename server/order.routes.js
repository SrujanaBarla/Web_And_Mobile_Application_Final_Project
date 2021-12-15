const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authorize = require('../middleware/authorize');

router.get('/',  orderController.findAll);
router.get('/get-orders/:id',  orderController.getAllOrders);
router.post('/',  orderController.create);
router.get('/:id',  orderController.findById);
router.put('/:id',  orderController.update);
router.delete('/:id',  orderController.delete);

module.exports = router;
