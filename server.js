const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use('*', (req, res) => {
	res.sendFile(path.resolve('/INV-MGMT-NEW/index.html', 'index.html'))
} );

app.listen(port);
console.log('server started');
