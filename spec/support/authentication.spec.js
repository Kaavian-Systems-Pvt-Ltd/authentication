/* eslint-disable no-console */
const jwt = require ('jsonwebtoken');
const { generateToken ,  verifyToken } = require ('../../authentication');
const sinon = require ('sinon');
const { request } = require ('express');

const sandbox = sinon.createSandbox ();

describe ('createToken' , ()=> {
  afterEach (async ()=> {
    sandbox.restore ();
  });
  it ('generate token...' , ()=> {
    sandbox.stub (jwt , 'sign').returns ('gascxgvsxhsbdiufhuiwksamdcjsdnvuasj');
    const value = generateToken ({ 'data' : { 'username' : 'mani' , 'id' : 'KAVN1528' } });
    expect (value).toEqual ('gascxgvsxhsbdiufhuiwksamdcjsdnvuasj');
  });
  it ('fail to generate token...' , ()=> {
    sandbox.stub (jwt , 'sign').throws (new Error ('fails'));
    expect ( ()=> generateToken ({ 'data' : { undefined } })).toThrow ();
    // expect (value.status).toEqual ('Failure');
  });
});

describe ('check and verify token..' , ()=> {
  afterEach (async ()=> {
    sandbox.restore ();
  }); 
  it ('check ignore path...' , ()=> {
    const value = verifyToken ({ 'ignorePath' : [ '/login' ] , 'token' : undefined , 'req' : req , 'res' : res , 'next' : next });
    sandbox.stub (req , 'url').value ('/login');
    console.log (value);
    sandbox.stub (ignorePath , 'map').returns (next ());
  });
  it ('verify the token...' , ()=> {
    sandbox.stub (jwt , 'verify').returns ({ 'username' : 'mani' });
    const value = verifyToken ({ 'ignorePath' : [ '/login' ] , 'token' : 'cdfvgbhngbvfcdrtfvyguhiytr' , 'req' : 'req' , 'res' : 'res' , 'next' : 'next' });
    expect (value).toEqual ({ 'username' : 'mani' });
  });
  it ('the token is empty' , ()=> {
    const value = verifyToken ({ 'ignorePath' : [ '/login' ] , 'token' : '' , 'req' : 'req' , 'res' : 'res' , 'next' : 'next' });
    expect (value.status).toEqual ('received token is empty...');
  });
  it ('verify the token...' , async ()=> {
    sandbox.stub (jwt , 'verify').throws (new Error ('failure'));
    expect ( ()=> verifyToken ({ 'ignorePath' : [ '/login' ] , 'token' : 'cdfvgbhngbvfcdrtfvyguhiytr' , 'req' : 'req' , 'res' : 'res' , 'next' : 'next' })).toThrow ();
  });
});
