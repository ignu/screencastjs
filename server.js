import express from 'express'

import videos from './data/videos'

import sassMiddleware from 'node-sass-middleware'
import path from 'path'

let app = express();

app.use(express.static("public"))

app.use(sassMiddleware({
  src: path.join(__dirname, "public/css"),
  dest: path.join(__dirname, 'public'),
  debug: true,
  force: true,
  outputStyle: 'compressed',
  prefix:  '/css'
}))

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
