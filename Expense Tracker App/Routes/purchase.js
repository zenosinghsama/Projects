const express = require('express');

const router = express.Router();

const authMiddleware = require('../Middleware/auth');

const purchaseController = require('../Controllers/purchase');

router.get('/purchase/premiummembership', authMiddleware.authenticateToken, purchaseController.purchasePremium);

router.post('/purchase/updatestatus', authMiddleware.authenticateToken, purchaseController.updateStatus)

module.exports = router;