const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore.js');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req, res) => {

    const { sort="", genres="" } = req.query;

    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res.status(400).send('Sort must be rating or app');
        }
    }

    if (genres) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res.status(400).send('Genres must be Action, Puzzle, Strategy, Casual, Arcade or Card');
        }
    }

    let results = playstore.filter(app => app.Genres.toLowerCase().includes(genres.toLowerCase()));

    if (sort) {
        const properSort = sort.charAt(0).toUpperCase() + sort.slice(1);
        if (sort === 'rating') {
            results.sort((a, b) => {
                return a[properSort] > b[properSort] ? -1 : a[properSort] < b[properSort] ? 1 : 0;
            });
        }
        if (sort === 'app') {
            results.sort((a, b) => {
                return a[properSort].toLowerCase() > b[properSort].toLowerCase() ? 1 : a[properSort].toLowerCase() < b[properSort].toLowerCase() ? -1 : 0;
            });
        }
    }

    res.json(results);
});

module.exports = app;