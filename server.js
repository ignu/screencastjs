import express from 'express'
import Firebase from "firebase"
import path from 'path'
import dotenv from "dotenv"
import R from "ramda"
import bodyParser from "body-parser"
import StripeClient from "stripe"

let Stripe = StripeClient("pk_test_yFf84eQAfJv82ahlbB8BM3Hr")

let app = express();
dotenv.load();

let firebaseUrl = process.env.FIREBASE_URL
let db = new Firebase(firebaseUrl)

app.use(express.static("public"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.post('/api/login', (req, res) => {
  let user = {
    email    : req.body.email,
    password : req.body.password,
  }

  db.authWithPassword(user, (error, authData) => {
    if (error) {
      console.log("-- ERROR --> ", error)
      res.status(403).send({ error: error})
    } else {
      res.send(authData)
    }
  })
})

app.post('/api/users', (req, res) => {
  let user = {
    email    : req.body.email,
    password : req.body.password,
    receiveEmails: req.body.receiveEmails
  }

  let updateProfile = (user, customer) => {
    let profileDb = new Firebase(`${firebaseUrl}/profiles/${user.id}`);
    profileDb.set({
      email: user.email,
      stripeCustomer: customer,
      receiveEmails: user.receiveEmails,
    }, () => {res.send(user)})
  }


  db.createUser(user, (error, userData) => {
    if (error) {
      console.log("-- ERROR --> ", error)
      res.status(403).send({ error: error})
    } else {
      user.id = userData.uid

      Stripe.customers.create({
        description: `Customer for ${user.email}`,
        plan: "react-tv-monthly",
        source: "tok_7cAwM7W02qD5V1" // obtained with Stripe.js
      }, function(err, customer) {
        console.log("err", err)
        updateProfile(user, customer)
      });
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

app.get('/login', (req, res) => {
  let index = path.join(__dirname, "public/index.html")
  res.sendFile(index)
})

app.get('/account', (req, res) => {
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
