import express from 'express'

import videos from './data/videos'
let app = express();

app.use(express.static("public"))

app.get('/api/videos', (req, res) => {
  res.send(videos)
})

export default app
