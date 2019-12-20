const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const open = require('open');
const app = express();

app.use(express.static('dist'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(process.env.PORT, '0.0.0.0');
console.log('server started');