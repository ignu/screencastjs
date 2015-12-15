import expect from 'expect.js'
import request from 'supertest'
import app from '../server'
import Firebase from "firebase"

let firebase_url = process.env.FIREBASE_URL
let db = new Firebase(firebase_url)

let deleteUser = (user, callback) => {
  db.removeUser(user, () => {
   console.log(`${user.email} deleted`)
   callback()
  })
}

let user = {
  email: "jon@nightswatch.net",
  password: "nightswatch",
  receiveEmails: true
}

describe("POST /api/users", function() {
  after((done) => {
    deleteUser(user, done)
  })

  it("creates a user profile @slow", function(done) {
    this.timeout(5000);

    let checkFirebase = (userId) => {
      db.child(`profiles/${userId}`).on("value", (snapshot) => {
        let val = snapshot.val()
        expect(val.receiveEmails).to.be(true)
        done()
      })
    }

    request(app)
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.be(200)
        checkFirebase(res.body.id)
      })
  })
})

describe("GET /videos", () => {
  it("returns an array @slow", (done) => {
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
