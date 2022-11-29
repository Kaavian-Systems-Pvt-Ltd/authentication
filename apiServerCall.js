const { generateToken } = require('./authentication');

const loginApi = (req, res) => {

    const userName = 'mani'
    const result = generateToken(userName);
    console.log( result );
};

module.exports = {
    loginApi,
};