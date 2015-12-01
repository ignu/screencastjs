import expect from 'expect.js'
import request from 'supertest'
import app from '../server'

describe("GET /videos", () => {
  it("returns an array", (done) => {

    request(app)
      .get('/api/videos')
      .set('Accept', 'application/json')
      .expect(200, done)
      .expect('Content-Type', /json/)
  })
})
