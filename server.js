const express = require('express');
const { generateToken, checkingToken } = require('./authentication');
const app = express();

app.use((req, res, next) => {
    // const token = localStorage.getItem('token');
    const token = '';
    console.log(token);
    // const ignorePaths = '/login';
    const result =  checkingToken({ignorePaths:['/login'], token: token, req: req, res: res});
    // const result =  checkingToken(ignorePaths, token, req, res);
    console.log(result);
    const status = result.status;
    if(result === 'loginApi'){
        next();
    }if(status === 'success'){
        next();
    }if(status === 'invalidToken'){
        // res.redirect('/login')
        console.log('invaliedToken in comming');
        res.send(401)
    }if(status === 'can not find'){
        // res.redirect('/login');
        console.log('token ins not coming');
        res.send(403);
    }
})

app.get('/login', (req, res) => {
    const userName = 'mani'
    const password = 'mani123';
    const getToken = generateToken(userName, password);
    res.send(getToken);
})

app.listen(3001, (req, res) => {
    console.log('server is running...');
});