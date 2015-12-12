import express from 'express'

import Firebase from "firebase"
import sassMiddleware from 'node-sass-middleware'
import path from 'path'
import dotenv from "dotenv"
import R from "ramda"

let app = express();
dotenv.load();

let db = new Firebase(process.env.FIREBASE_URL)

app.use(express.static("public"))

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
  res.send({})
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
