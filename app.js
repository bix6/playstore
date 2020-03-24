const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req, res) => {
    res.send('Hello');
});

app.listen(8000, () => {
    console.log('Server started on Port 8000');
})