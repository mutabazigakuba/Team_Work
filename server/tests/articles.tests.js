import chai from 'chai';
import mocha from 'mocha';
import app from '../index';
import chai_http from 'chai-http';

chai.use(chai_http);
const expect = chai.expect;
chai.should()

const dummies = {
    title: 'best article ever',
    article: 'My Article is short but has some littel sense in it'
}
describe('CREATE ARTICLE', () => {
    it('Have three inputs', (done) => {
        chai.request(app)
            .post('/api/v1/articles')
            .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJpYXQiOjE1NzAxMTQyNTAsImV4cCI6MTU3MDcxOTA1MH0.gpW0AcSsbTTh6aLpwzPUohiTTj0OfDDYH-oayXNE9UY' )
            .send(dummies)
            .end((err, res) => { 
                res.should.have.status(500)
             })
        done()
    })
    it('Return to be JSON', (done) => {
        chai.request(app)
            .post('/api/v1/articles')
            .end((req, res) => { expect(res).to.be.json; })
        done()
    })
    it('Return to be Object', (done) => {
        chai.request(app)
            .post('/api/v1/articles')
            .end((req, res) => { res.body.should.be.a('object'); })
        done()
    })
})

describe('EDIT ARTICLE', () => {
    it('Have two inputs', (done) => {
        chai.request(app)
            .post('/api/v1/articles')
            .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJpYXQiOjE1NzAxMTQyNTAsImV4cCI6MTU3MDcxOTA1MH0.gpW0AcSsbTTh6aLpwzPUohiTTj0OfDDYH-oayXNE9UY' )
            .send(dummies)
            .end((err, res) => { 
                res.should.have.status(500)
             })
        done()
    })
    it('Return to be JSON', (done) => {
        chai.request(app)
            .patch('/api/v1/articles/:articleid')
            .end((req, res) => { expect(res).to.be.json; })
        done()
    })
    it('Return to be Object', (done) => {
        chai.request(app)
            .patch('/api/v1/articles/:articleid')
            .end((req, res) => { res.body.should.be.a('object'); })
        done()
    })
})

describe('DELETE ARTICLE', () => {
    it('Return to be JSON', (done) => {
        chai.request(app)
            .delete('/api/v1/articles/:articleid')
            .end((req, res) => { expect(res).to.be.json; })
        done()
    })
    it('Return to be Object', (done) => {
        chai.request(app)
            .delete('/api/v1/articles/:articleid')
            .end((req, res) => { res.body.should.be.a('object'); })
        done()
    })
})

describe('COMMENT ON ARTICLE', () => {
    it('Have three inputs', (done) => {
        chai.request(app)
            .post('/api/v1/articles')
            .set('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJpYXQiOjE1NzAxMTQyNTAsImV4cCI6MTU3MDcxOTA1MH0.gpW0AcSsbTTh6aLpwzPUohiTTj0OfDDYH-oayXNE9UY' )
            .send({
                comment: 'hello comment',
                username: 'ronald',
                email: 'gakubar2@gmail.com'
            })
            .end((err, res) => { 
                res.should.have.status(500)
             })
        done()
    })
    it('Return to be JSON', (done) => {
        chai.request(app)
            .post('/api/v1/articles/:articleid/comments')
            .end((req, res) => { expect(res).to.be.json; })
        done()
    })
    it('Return to be Object', (done) => {
        chai.request(app)
            .post('/api/v1/articles/:articleid/comments')
            .end((req, res) => { res.body.should.be.a('object'); })
        done()
    })
    it('Return status 500', (done) =>{
        chai.request(app)
            .get('/api/v1/feeds')
            .end ((err, res) => {res.should.have.status(500);})
            done()
    })
})

describe('VIEW ALL ARTICLE', () => {
    it('Return to be JSON', (done) => {
        chai.request(app)
            .get('/api/v1/feeds')
            .end((req, res) => { expect(res).to.be.json; })
        done()
    })
    it('Return to be Object', (done) => {
        chai.request(app)
            .get('/api/v1/feeds')
            .end((req, res) => { res.body.should.be.a('object'); })
        done()
    })
    it('Return status 500', (done) =>{
        chai.request(app)
            .get('/api/v1/feeds')
            .end ((err, res) => {res.should.have.status(500);})
            done()
    })
})

describe('VIEW SINGLE ARTICLE', () => {
    it('Return to be JSON', (done) => {
        chai.request(app)
            .get('/api/v1/articles/:articleid')
            .end((req, res) => { expect(res).to.be.json; })
        done()
    })
    it('Return to be Object', (done) => {
        chai.request(app)
            .get('/api/v1/articles/:articleid')
            .end((req, res) => { res.body.should.be.a('object'); })
        done()
    })
    it('Return status 500', (done) =>{
        chai.request(app)
            .get('/api/v1/articles/:articleid')
            .end ((err, res) => {res.should.have.status(500);})
            done()
    })
})