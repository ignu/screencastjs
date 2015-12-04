import express from 'express'

import videos from './data/videos'
import mongoose from 'mongoose'
let app = express();

mongoose.connect('mongodb://localhost/myappdatabase');
import sassMiddleware from 'node-sass-middleware'

let app = express();


app.use(express.static("public"))

app.use(sassMiddleware({
  src: path.join(__dirname, "sass"),
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed',
  prefix:  '/css'
});

app.get('/api/videos', (req, res) => {
  res.send(videos)
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
