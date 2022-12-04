const jwt = require("jsonwebtoken");

/**
 * 
 * @param {String} userData generates token for the user specified field 
 * @returns status and generated token
 * this function is used for generate token 
 */

const generateToken = (userData) => {
  if (userData) {
    const token = jwt.sign({ userData }, `${process.env.ACCESS_TOKEN_SECRET}`);
    return { status: "Success", data: token };
  } else {
    return { status: "Failure", data: "Invalid password" };
  }
};

/**
 * 
 * @param { {ignorePath: [ignorePaths], token: token, req: req, res: res, next: next} } propertys validate the api's 
 * @returns status
 */

const checkingToken = (propertys) => {
  const ignorePaths = propertys.ignorePath[0];
  const receivedToken = propertys.token;
  const req = propertys.req;
  const res = propertys.res;
  const next = propertys.next;
  const url = req.url;
  try {
    if (url === ignorePaths && receivedToken === undefined) {
      next();
    }
    if (receivedToken === '') {
      return { status: 'invalidToken'};
    }
    if (receivedToken) {
      const token = jwt.verify(receivedToken,`${process.env.ACCESS_TOKEN_SECRET}`);
      next();
      return { status: "success", data: token };
    }
  } catch {
    return { status: "invalidToken" };
  }
};

module.exports = {
  generateToken,
  checkingToken,
};
