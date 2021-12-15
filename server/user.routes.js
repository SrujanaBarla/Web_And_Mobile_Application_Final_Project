const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.login);
router.post('/register', userController.create);
router.get('/:id', userController.findById);
router.put('/:id', userController.update);

module.exports = router;
