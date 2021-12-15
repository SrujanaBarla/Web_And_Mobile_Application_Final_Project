const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const authorize = require('../middleware/authorize');

router.get('/',  categoryController.findAll);
router.post('/',  categoryController.create);
router.get('/:id',  categoryController.findById);
router.put('/:id',  categoryController.update);
router.delete('/:id',  categoryController.delete);

module.exports = router;
