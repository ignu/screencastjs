import express from 'express'

let app = express();

app.get('/api/videos', (req, res) => {
  res.send([])
})

export default app
