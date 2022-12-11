/* eslint-disable no-unused-vars */
const jwt = require ('jsonwebtoken');

/**
 *
 * @param {{data: {name,id}}} userData generates token for the user specified field
 * @returns status and generated token
 * this function use for generatetoken
 */

const generateToken = (userData)=> {
  const data = userData.data;
  try {
      const token = jwt.sign (data , `${process.env.ACCESS_TOKEN_SECRET}`);
      return token;
  } catch (error) {
    throw new Error ('can not generate token');
  }
};

/**
 *
 * @param { {ignorePath: ['ignorePaths'], token: 'token', req: req, res: res, next: next} } propertys validate the api's
 * @returns status
 */

const verifyToken = ({ ignorePath , token , req , res , next })=> {
  const url = req.url;
 
  try {
    const validateIgnorePath = ignorePath.includes (url);
    if(validateIgnorePath === true){
       next ();
       return 'given ignore path is ignored';
    }
    if (token) {
      const data = jwt.verify (token , `${process.env.ACCESS_TOKEN_SECRET}`); 
      next ();
      return data;
    } else {
      return { 'status' : 'received token is empty...' };
    }
  } catch (error) {
    throw new Error ('received token is invalid token');
  }
};

module.exports = {
  generateToken ,
  verifyToken
};
