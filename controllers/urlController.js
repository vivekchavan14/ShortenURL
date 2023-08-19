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

    return res.redirect('/');
}

async function redirectToOriginalURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    if (entry) {
        res.redirect(entry.redirectedURL);
    } else {
        res.status(404).send('URL not found');
    }
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });

    if (entry) {
        res.render('analytics', { entry });
    } else {
        res.status(404).send('URL not found');
    }
}

module.exports = {
    generateShortUrl,
    redirectToOriginalURL,
    getAnalytics,
};
