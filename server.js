import express from 'express'

import videos from './data/videos'
let app = express();

app.use(express.static("public"))

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
