const shortid = require('shortid');
const URL = require('../models/urlModel');

async function generateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });

    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirectedURL: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortID });
}

async function handleGetAnalystics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    generateShortUrl,
    handleGetAnalystics,
};
