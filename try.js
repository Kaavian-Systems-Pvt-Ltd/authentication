const  login  = require('./authentication');

const username = 'mani'
const password = 'mani123'
const result = login.generateToken(username,password);

const trial = result 
// const trial = 'dcfvgtybhujikgbsdcfvgfvgbhjbghnjmk';
const final = login.checkingToken(trial);
