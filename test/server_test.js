import expect from 'expect.js'
import request from 'supertest'
import app from '../server'

describe("GET /videos", () => {
  it("returns an array", (done) => {
    // TODO: mock this.
    request(app)
      .get('/api/videos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.length > 2).to.eql(true)
        done()
      })
  })

  it("sends public files", (done) => {
    request(app)
      .get('/index.html')
      .expect(200, done)
  })
})
