const express = require('express');
const { connectMongoDB } = require('./connect'); // Correct import statement
const urlRoutes = require('./routes/urlRoutes');
const app = express();
const port = 5008;

connectMongoDB('mongodb://127.0.0.1:27017/shortURL')
    .then(() => {
        console.log("MongoDB connected");
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/url', urlRoutes);
