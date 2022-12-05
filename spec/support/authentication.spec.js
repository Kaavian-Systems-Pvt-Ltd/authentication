const jwt = require('jsonwebtoken');
const { generateToken, checkingToken } = require('../../authentication');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

describe('createToken', () => {
    afterEach(async () => {
        sandbox.restore();
    });
    it('generate token...', () => {
        sandbox.stub(jwt,'sign').returns('gascxgvsxhsbdiufhuiwksamdcjsdnvuasj');
        const value = generateToken({ data: { username: 'mani', id: 'KAVN1528' } });
        console.log(value, 1);
        expect(value.status).toEqual('Success');
    })
    it('fail to generate token...', () => {
        sandbox.stub(jwt,'sign').returns(undefined)
        const value = generateToken({ data: undefined });
        console.log(value, 2);
        expect(value.status).toEqual('Failure');
    })
})