import expect from 'expect.js'
import request from 'supertest'
import app from '../server'

describe("GET /videos", () => {
  it("returns an array", (done) => {
    request(app)
      .get('/api/videos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.length).to.eql(2)
        done()
      })
  })

  it("sends public files", (done) => {
    request(app)
      .get('/index.html')
      .expect(200, done)
  })
})
