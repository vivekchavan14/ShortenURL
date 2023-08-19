const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/generate', urlController.generateShortUrl);
router.get('/:shortId', urlController.redirectToOriginalURL);
router.get('/:shortId/analytics', urlController.getAnalytics);

module.exports = router;
