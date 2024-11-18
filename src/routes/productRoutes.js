const express = require('express');
const router = express.Router();
const {authenticateToken,authorizeRoles} = require('../middlewares/auth');
const productController = require('../controllers/productController');

// Protected route to get all products
router.get('/get', authenticateToken, productController.getProducts);
router.post('/add', authenticateToken, productController.addProduct);
router.post('/top', authenticateToken, productController.getTop);

module.exports = router;
