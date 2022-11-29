const jwt = require('jsonwebtoken');

const generateToken = (userName) => {
    const name = userName;
    console.log(name, 122);
    const token =  jwt.sign({name}, `${process.env.ACCESS_TOKEN_SECRET}`);
    return token
    
}

module.exports = {
    generateToken,
}