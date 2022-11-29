const jwt = require('jsonwebtoken');

const generateToken = (userName,password) => {
    const name = userName;
    const pass = password;
    if(pass === password){
    console.log(name, 122);
    const token =  jwt.sign({name}, `${process.env.ACCESS_TOKEN_SECRET}`);
    return token;
    }else {
        return({status: 'failuer', data: 'invalied password'});
    }
}

const checkingToken = (token) => {
    if(token){
       jwt.verify(token,`${process.env.ACCESS_TOKEN_SECRET}`,(err, verifiedJwt) => {
        if(err){
            return(err.message);
        }else {
            const data = verifiedJwt
            return ({status: 'success', data});
        }
       });
    }
    return({status: 'failuer', message:'token is unavailable'});
}

module.exports = {
    generateToken,
}