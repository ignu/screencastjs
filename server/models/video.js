import mongoose, { Schema } from 'mongoose'

const videoSchema = new Schema({
  name: String,
  file: String
})


videoSchema.pre('save', function(next) {
  // get the current date
  this.created_at = new Date();
})

var db = mongoose.connection;

let Video;

db.once('open', function() {
  console.log("doing it")
  Video = mongoose.model("Video", videoSchema)

  // HACK SEED SOME VIDEO MODELS...

  Video.find({}, function(err, videos) {
    if (err) throw err;

    console.log("videos, videos.length", videos, videos.length)

    if (videos.length > 1) return;

    // create a new user
    let vids = [
      Video({
        name: 'Getting Started With Babel and ES6',
        file: 'episode-1',
      }),
      Video({
        name: 'Getting Started With Babel and ES6',
        file: 'episode-1',
      })]

    vids.forEach((v) => {
      console.log("v", v)
      v.save(function(err) {
        console.log("err", err)
        if (err) throw err;

        console.log('Video created!', v);
      });
    })
  })
});



export default Video
