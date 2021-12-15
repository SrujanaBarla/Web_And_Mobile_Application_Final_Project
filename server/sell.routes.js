const express = require('express');
const router = express.Router();
const sellController = require('../controllers/sell.controller');
const authorize = require('../middleware/authorize');

router.get('/', sellController.findAll);
router.get('/order-details/:id', sellController.orderDetails);
router.get('/all-sells/:id', sellController.orderItems);
router.post('/', sellController.create);
router.get('/:id', sellController.findById);
router.put('/:id', sellController.update);
router.delete('/:id', sellController.delete);

module.exports = router;
