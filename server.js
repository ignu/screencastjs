import express from 'express'

let app = express();

app.use(express.static("public"))

app.get('/api/videos', (req, res) => {
  res.send([])
})

export default app
