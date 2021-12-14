const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authorize = require('../middleware/authorize');

router.get('/', authorize, orderController.findAll);
router.post('/', authorize, orderController.create);
router.get('/:id', authorize, orderController.findById);
router.put('/:id', authorize, orderController.update);
router.delete('/:id', authorize, orderController.delete);

module.exports = router;
