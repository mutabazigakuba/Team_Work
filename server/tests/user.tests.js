import chai from 'chai';
import mocha from 'mocha';
import app from '../index';
import chai_http from 'chai-http';

chai.use(chai_http);
const expect = chai.expect;
chai.should()


describe('WELCOME', () =>{
    it('User should see hello team work ', (done) =>{
        chai.request(app)
            .get('/')
            .end ((req, res) => {
                res.should.have.status(200)
            })
            done()
    });
})
describe('CREATE USER', () =>{
    it('Return to be JSON', (done) =>{
        chai.request(app)
            .post('/api/v1/auth/signup')
            .end ((req, res) => {expect(res).to.be.json;})
            done()
    })
    it('Return to be Object', (done) =>{
        chai.request(app)
            .post('/api/v1/auth/signup')
            .end ((req, res) => {res.body.should.be.a('object');})
            done()
    })
})

describe('LOGIN USER', () =>{
    it('Return to be JSON', (done) =>{
        chai.request(app)
            .post('/api/v1/auth/signin')
            .end ((req, res) => {expect(res).to.be.json;})
            done()
    })
    it('Return to be Object', (done) =>{
        chai.request(app)
            .post('/api/v1/auth/signin')
            .end ((req, res) => {res.body.should.be.a('object');})
            done()
    })
})