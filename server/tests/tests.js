import chai from 'chai';
import mocha from 'mocha';
import app from '../index';
import chai_http from 'chai-http';

chai.use(chai_http);
const expect = chai.expect;
chai.should()

describe ('TeamWork', () =>{

    describe('POST REQUEST', () =>{
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
        it('Return status 400', (done) =>{
            chai.request(app)
                .post('/api/v1/auth/signup')
                .end ((req, res) => {res.should.have.status(400);})
                done()
        })
    })
})