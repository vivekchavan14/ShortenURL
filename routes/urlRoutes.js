
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/', urlController.generateShortUrl);
router.get('/analytics/:shortId', urlController.handleGetAnalystics);

module.exports = router;
