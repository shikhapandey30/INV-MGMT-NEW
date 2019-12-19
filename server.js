const express = require('express');
const path = require('path');
const port = process.env.PORT || "https://ls-inv-mgt.herokuapp.com/";
const open = require('open');
const app = express();

app.use(express.static('dist'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(process.env.PORT || 5000);
console.log('server started');
