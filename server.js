import express from 'express'

import Firebase from "firebase"
import sassMiddleware from 'node-sass-middleware'
import path from 'path'
import dotenv from "dotenv"
import R from "ramda"
import bodyParser from "body-parser"

let app = express();
dotenv.load();

let firebaseUrl = process.env.FIREBASE_URL
let db = new Firebase(firebaseUrl)

app.use(express.static("public"))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(sassMiddleware({
  src: path.join(__dirname, "public/css"),
  dest: path.join(__dirname, 'public'),
  debug: true,
  force: true,
  outputStyle: 'compressed',
  prefix:  '/css'
}))


let mapVideosFromFirebase = (videoObject) => {
  let keys = R.keys(videoObject)
  let makeVideoObject = (key) => R.merge(videoObject[key], { id: key })
  return R.map(makeVideoObject, keys)
}

app.get('/api/videos', (req, res) => {
  db.child("videos").on("value", (snapshot) => {
    // HACK: not sure why videos contains an empty element
    let videos = mapVideosFromFirebase(snapshot.val())
    res.send(videos)
  })
})

app.post('/api/users', (req, res) => {
  let user = {
    email    : req.body.email,
    password : req.body.password,
    receiveEmails: true
  }

  db.createUser(user, (error, userData) => {
    if (error) {
      console.log("-- ERROR --> ", error)
      res.status(403).send({ error: error})
    } else {
      user.id = userData.uid
      let profileDb = new Firebase(`${firebaseUrl}/profiles/${user.id}`);
      profileDb.set({email: user.email,
                     receiveEmails: user.receiveEmails}, () => {
                       res.send(user) })
    }
  })
})


// HACK: make react-router isomorphic
app.get('/videos', (req, res) => {
  let index = path.join(__dirname, "public/index.html")
  res.sendFile(index)
})

app.get('/register', (req, res) => {
  let index = path.join(__dirname, "public/index.html")
  res.sendFile(index)
})

// TODO: better test for if we're running tests...
if(process.env.npm_lifecycle_event != "test") {
  const server = app.listen(8000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
  });
}

export default app
