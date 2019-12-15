const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const authMiddleware = require('../middleware/is-auth');

describe('Auth Middleware', function () {

    it('should throw an error if not authorization header is present', function () {
        const req = {
            get: function () {
                return null
            }
        }
        // expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated.');
        expect(() => authMiddleware(req, {}, () => { })).to.throw('Not authenticated.');
    })

    it('should throw an error if authorizaton header is not two part string', function () {
        const req = {
            get: function () {
                return 'abc'
            }
        }
        expect(() => authMiddleware(req, {}, () => { })).to.throw();
    })

    it('should return user ID', function () {
        const req = {
            get: function (headerName) {
                return 'Beared dfgfhfhghfg';
            }
        };

        sinon.stub(jwt, 'verify'); // pass object and function name to tetmporary replace it
        jwt.verify.returns({userId: '12345'}); 
        authMiddleware(req, {}, () => { })
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId', '12345');
        expect(jwt.verify.called).to.be.true;
        jwt.verify.restore();
    })

    it('should return an error if token is not correct', function () {
        const req = {
            get: function () {
                return 'Beared abc'
            }
        }
        expect(() => authMiddleware(req, {}, () => { })).to.throw();

    })
})