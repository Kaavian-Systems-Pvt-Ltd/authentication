const express = require('express');
const { loginApi } = require('./apiServerCall');
const app = express();

app.get('/hello', loginApi)

app.listen(3001, (req, res) => {
    console.log('server is running...');
});