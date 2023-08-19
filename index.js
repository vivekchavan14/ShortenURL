const express = require('express');
const urlRoutes = require('./routes/urlRoutes');
const { connectMongoDB } = require('./connect');
const mongoose = require('mongoose');  
const URL = require('./models/urlModel'); 

const app = express();
const port = 5007;

connectMongoDB('mongodb://127.0.0.1:27017/shortURL')
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use(express.json());
app.use('/url', urlRoutes);

app.get('/:shortId', async (req, res) => {
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
            }
        }
    );
    res.redirect(entry.redirectedURL);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
