const jwt = require('jsonwebtoken');


/**
 * 
 * @param {String} userData generates token for the user specified field 
 * @returns status and generated token
 */

const generateToken = (userData) => {
    if(userData){
    const token =  jwt.sign({userData}, `${process.env.ACCESS_TOKEN_SECRET}`);
    return ({status: 'Success', data: token});
    }else {
        return({status: 'Failure', data: 'Invalid password'});
    }
}

/**
 * 
 * @param { {ignorePath: [ignorePaths], token: token, req: req, res: res, next: next} } propertys validate the api's
 * @returns status
 */

const checkingToken = (propertys) => {
	const ignorePaths = propertys.ignorePath;
	const receivedToken = propertys.token;
	const req = propertys.req ;
	const res = propertys.res;
	const next = propertys.next;
	const url = req.url;
	ignorePaths.map( (val) => {
		if(url === val && (receivedToken === undefined || receivedToken === null)){
			next();
		}
	})
	try{
		if(receivedToken && receivedToken !== ''){
			const token = jwt.verify(receivedToken,`${process.env.ACCESS_TOKEN_SECRET}`);
			console.log(token);
			 next();
			return ({status: 'success', data:token});
		} else {
			return ({status: 'Empty...'});
		}
	} catch{
		return ({status: 'invalid token'});
	}
}

module.exports = {
    generateToken,
    checkingToken,
}