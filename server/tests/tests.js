import chai from 'chai';
import mocha from 'mocha';
import app from '../index';
import chai_http from 'chai-http';

chai.use(chai_http);
const expect = chai.expect;
chai.should()

describe ('TeamWork', () =>{

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
        it('Return status 400', (done) =>{
            chai.request(app)
                .post('/api/v1/auth/signup')
                .end ((req, res) => {res.should.have.status(400);})
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
        it('Return status 400', (done) =>{
            chai.request(app)
                .post('/api/v1/auth/signin')
                .end ((req, res) => {res.should.have.status(400);})
                done()
        })
    })

    describe('CREATE ARTICLE', () =>{
        it('Return to be JSON', (done) =>{
            chai.request(app)
                .post('/api/v1/articles')
                .end ((req, res) => {expect(res).to.be.json;})
                done()
        })
        it('Return to be Object', (done) =>{
            chai.request(app)
                .post('/api/v1/articles')
                .end ((req, res) => {res.body.should.be.a('object');})
                done()
        })
        it('Return status 400', (done) =>{
            chai.request(app)
                .post('/api/v1/articles')
                .end ((req, res) => {res.should.have.status(400);})
                done()
        })
    })

    describe('EDIT ARTICLE', () =>{
        it('Return to be JSON', (done) =>{
            chai.request(app)
                .patch('/api/v1/articles/:articleid')
                .end ((req, res) => {expect(res).to.be.json;})
                done()
        })
        it('Return to be Object', (done) =>{
            chai.request(app)
                .patch('/api/v1/articles/:articleid')
                .end ((req, res) => {res.body.should.be.a('object');})
                done()
        })
        it('Return status 400', (done) =>{
            chai.request(app)
                .patch('/api/v1/articles/:articleid')
                .end ((req, res) => {res.should.have.status(400);})
                done()
        })
    })

    describe('DELETE ARTICLE', () =>{
        it('Return to be JSON', (done) =>{
            chai.request(app)
                .delete('/api/v1/articles/:articleid')
                .end ((req, res) => {expect(res).to.be.json;})
                done()
        })
        it('Return to be Object', (done) =>{
            chai.request(app)
                .delete('/api/v1/articles/:articleid')
                .end ((req, res) => {res.body.should.be.a('object');})
                done()
        })
    })

    describe('COMMENT ON ARTICLE', () =>{
        it('Return to be JSON', (done) =>{
            chai.request(app)
                .post('/api/v1/articles/:articleid/comments')
                .end ((req, res) => {expect(res).to.be.json;})
                done()
        })
        it('Return to be Object', (done) =>{
            chai.request(app)
                .post('/api/v1/articles/:articleid/comments')
                .end ((req, res) => {res.body.should.be.a('object');})
                done()
        })
    })
})