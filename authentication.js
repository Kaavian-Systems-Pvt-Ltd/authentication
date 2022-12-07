/* eslint-disable no-console */
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
    if (data) {
      const token = jwt.sign (data , `${process.env.ACCESS_TOKEN_SECRET}`);
      return token;
    }
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
  ignorePath.map ((val)=> {
    if (url === val && (token === undefined || token === null)) {
      return next ();
    }
  });
  try {
    if (token) {
      const data = jwt.verify (token , `${process.env.ACCESS_TOKEN_SECRET}`);
      next ();
      return data;
    } else {
      return { 'status' : 'received token is empty...' };
    }
  } catch (error) {
    throw new Error ('received token is invalid token' , console.error (error));
  }
};

module.exports = {
  generateToken ,
  verifyToken
};
