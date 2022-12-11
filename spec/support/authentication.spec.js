/* eslint-disable no-console */
const jwt = require ('jsonwebtoken');
const { generateToken ,  verifyToken } = require ('../../authentication');
const tokenGeneration = require ('../../authentication');
const sinon = require ('sinon');
let req = {};
let res = {};
let next;
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
  
  it ('verify the token...' , ()=> {
    next = sandbox.spy ();
    sandbox.stub ( tokenGeneration , 'verifyToken').returns (next);
    const ignorePath = [ '/login' ];
    req.url = '/login';
    sandbox.stub (ignorePath , 'includes').returns (true);
    const value = verifyToken ({ 'ignorePath' : [ '/login' ] , 'token' : null , 'req' : req , 'res' : res , 'next' : next });
    expect (value).toEqual ('given ignore path is ignored');
  });

  it ('verify the token...' , ()=> {
    const ignorePath = [ '/login' ];
    req.url = '/add';
    sandbox.stub (ignorePath , 'includes').returns (false);
    sandbox.stub (jwt , 'verify').returns ({ 'username' : 'mani' });
    const value = verifyToken ({ 'ignorePath' : [ '/login' ] , 'token' : 'cdfvgbhngbvfcdrtfvyguhiytr' , 'req' : req , 'res' : res , 'next' : next });
    expect (value).toEqual ({ 'username' : 'mani' });
  });
  it ('the token is empty' , ()=> {
    const ignorePath = [ '/login' ];
    req.url = '/add';
    sandbox.stub (ignorePath , 'includes').returns (false);
    const value = verifyToken ({ 'ignorePath' : [ '/login' ] , 'token' : '' , 'req' : req , 'res' : res , 'next' : next });
    expect (value.status).toEqual ('received token is empty...');
  });
  it ('verify the token...' , async ()=> {
    const ignorePath = [ '/login' ];
    req.url = '/add';
    sandbox.stub (ignorePath , 'includes').returns (false);
    sandbox.stub (jwt , 'verify').throws (new Error ('failure'));
    expect ( ()=> verifyToken ({ 'ignorePath' : [ '/login' ] , 'token' : 'cdfvgbhngbvfcdrtfvyguhiytr' , 'req' : req , 'res' : res , 'next' : next })).toThrow ();
  });

});
