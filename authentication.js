const jwt = require('jsonwebtoken');

const generateToken = (userName,password) => {
    const name = userName;
    const pass = password;
    if(pass === password){
    const token =  jwt.sign({name}, `${process.env.ACCESS_TOKEN_SECRET}`);
    console.log( token);
    return token;
    }else {
        return({status: 'failuer', data: 'invalied password'});
    }
}

const checkingToken = (propertys) => {
    const ignorePaths = propertys.ignorePaths[0];
    const token = propertys.token;
    console.log(token);
    const req = propertys.req ;
    const res = propertys.res;
    const url = req.url;
    if(url === ignorePaths){
        const message = 'loginApi';
        return(message);
    }
    try{
    if(token){
    const data = jwt.verify(token,`${process.env.ACCESS_TOKEN_SECRET}`);
    console.log(data);
    return {status: 'success', token:data};
    }
}catch{
    return ({status:"invalidToken"});
}
    return ({status:'can not find'});
}

module.exports = {
    generateToken,
    checkingToken,
}


    //jwt.verify(token,`${process.env.ACCESS_TOKEN_SECRET}`,(err, verifiedJwt) => {
    //     if(err){
    //         return(err.message);
    //     }else {
    //         const data = verifiedJwt
    //         return ({status: 'success', data});
    //     }
    //    });